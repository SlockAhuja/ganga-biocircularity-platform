# BioRiver — Google Earth Engine Sentinel-2 Integration Specification

**Document Identifier:** `BIORIVER-GEE-DOC-2026-V1`  
**Google Cloud Project:** `camera-503319`  
**Service Account:** `bioriver-earthengine`  
**Dataset:** `COPERNICUS/S2_SR_HARMONIZED` (Sentinel-2 MSI Level-2A BOA Surface Reflectance)  
**Status:** IMPLEMENTED & PRODUCTION READY (With Automated Demo Fallback)  

---

## 1. Architecture & Provider Abstraction

BioRiver utilizes a pluggable server-side satellite provider architecture (`backend/app/core/satellite/`):

```
                        ┌───────────────────────────────┐
                        │     BaseSatelliteProvider     │
                        └───────────────┬───────────────┘
                                        │
                 ┌──────────────────────┴──────────────────────┐
                 ▼                                             ▼
  ┌─────────────────────────────┐               ┌─────────────────────────────┐
  │    DemoSatelliteProvider    │               │ EarthEngineSatelliteProvider│
  │ (Offline/Synthetic Baseline)│               │  (Live Sentinel-2 SR API)   │
  └─────────────────────────────┘               └─────────────────────────────┘
```

The active provider is chosen automatically via environment variable:
- `SATELLITE_PROVIDER=earth_engine` or `EARTH_ENGINE_ENABLED=true` $\to$ `EarthEngineSatelliteProvider`
- `SATELLITE_PROVIDER=demo` (or if Earth Engine is unauthenticated) $\to$ `DemoSatelliteProvider` (Safe Fallback)

---

## 2. Server-Side Authentication & Configuration

### Environment Variables

| Variable | Description | Default / Example |
| :--- | :--- | :--- |
| `EARTH_ENGINE_ENABLED` | Enables Earth Engine provider | `true` |
| `EARTH_ENGINE_PROJECT_ID` | Google Cloud Project ID | `camera-503319` |
| `SATELLITE_PROVIDER` | Satellite provider selector | `earth_engine` or `demo` |
| `GOOGLE_APPLICATION_CREDENTIALS` | Path to Google Service Account JSON | `/path/to/service-account.json` |
| `EARTH_ENGINE_SERVICE_ACCOUNT_KEY_PATH` | Explicit service account key file | `/run/secrets/ee_service_account.json` |
| `EARTH_ENGINE_SERVICE_ACCOUNT_EMAIL` | Dedicated Earth Engine service account | `bioriver-earthengine@camera-503319.iam.gserviceaccount.com` |

### Local Development Authentication (Application Default Credentials)
For local development, authenticate using Google Cloud CLI:
```bash
gcloud auth application-default login
```
FastAPI automatically initializes Earth Engine using the logged-in developer ADC associated with project `camera-503319`.

### Production Server Authentication
In Docker / Kubernetes:
1. Mount the service account private key into container `/run/secrets/ee_key.json`.
2. Set `GOOGLE_APPLICATION_CREDENTIALS=/run/secrets/ee_key.json`.
3. Set `EARTH_ENGINE_PROJECT_ID=camera-503319`.

*Security Guarantee:* The platform never exposes credentials, tokens, or private key contents in API responses or log streams.

---

## 3. Earth Engine Processing Workflow

```
       SENTINEL-2 MSI LEVEL-2A (COPERNICUS/S2_SR_HARMONIZED)
                                │
                                ▼
         CLOUD & CLOUD-SHADOW MASKING (SCL + QA60)
                                │
                                ▼
             CLOUD-FREE MEDIAN COMPOSITE ACQUISITION
                                │
                                ▼
         SPECTRAL INDEX EXTRACTION (NDVI, NDWI, MNDWI)
                                │
                                ▼
        WATER MASKING & VEGETATION CANOPY INTERSECTION
                                │
                                ▼
        HYACINTH CANDIDATE CLASSIFICATION & DENSITY TIERS
                                │
                                ▼
          POLYGON VECTORIZATION (reduceToVectors WGS84)
                                │
                                ▼
          ALLOMETRIC BIOMASS ESTIMATION (Assumptions Registry)
                                │
                                ▼
        PROVENANCE LOGGING & POSTGIS PERSISTENCE (HyacinthZone)
```

### 1. Cloud & Shadow Masking
Uses the Sentinel-2 L2A Scene Classification Layer (`SCL`) to remove non-surface pixels:
- Masked classes: `3` (Cloud shadows), `8` (Cloud medium probability), `9` (Cloud high probability), `10` (Cirrus), `11` (Snow/Ice).
- Quality band `QA60`: Bit 10 (Opaque clouds) and Bit 11 (Cirrus) masking.

### 2. Spectral Indices
- **NDVI (Normalized Difference Vegetation Index):** $\text{NDVI} = (\text{B8} - \text{B4}) / (\text{B8} + \text{B4})$
- **NDWI (McFeeters Water Index):** $\text{NDWI} = (\text{B3} - \text{B8}) / (\text{B3} + \text{B8})$
- **MNDWI (Modified NDWI):** $\text{MNDWI} = (\text{B3} - \text{B11}) / (\text{B3} + \text{B11})$

### 3. Candidate Hyacinth Delineation
- Water corridor mask: $\text{MNDWI} > 0.0 \lor \text{NDWI} > 0.0$
- Floating vegetation candidate: $\text{NDVI} > 0.35$ within river corridor.
- Density classification:
  - **Very High:** $\text{NDVI} \ge 0.70$
  - **High:** $0.55 \le \text{NDVI} < 0.70$
  - **Moderate:** $0.38 \le \text{NDVI} < 0.55$
  - **Low:** $0.20 \le \text{NDVI} < 0.38$

---

## 4. Multi-Temporal Before/After Analysis

The `POST /api/v1/satellite/compare` endpoint compares two observation windows (Period A vs Period B) over the same Area of Interest (AOI):
- Computes $\Delta \text{Area (ha)}$ and $\% \text{Change}$.
- Distinguishes physical canopy reduction from seasonal transport.
- *Scientific Disclaimer:* Satellite difference analysis measures spectral canopy variation; causality attribution (e.g. harvesting efficiency) requires validation with ground-truth field harvesting logs.

---

## 5. Biomass Linking via Assumptions Registry

Satellite-derived surface area ($ha$) is converted to estimated wet standing biomass ($tonnes$) using the calibrated factor from `ScientificAssumption`:
$$\text{Estimated Fresh Biomass } (t) = \text{Area } (ha) \times \text{Yield Density } (44.05\text{ t/ha}) \times \text{Canopy Coverage } (\%)$$
All biomass outputs from satellite analysis are explicitly labeled as **`ESTIMATED`** with the factor source exposed in API responses.

---

## 6. Scientific Provenance & Status Taxonomy

Every Earth Engine analysis record returns structured provenance metadata:
```json
{
  "source": "EARTH_ENGINE",
  "provider": "Google Earth Engine",
  "project_id": "camera-503319",
  "dataset": "COPERNICUS/S2_SR_HARMONIZED",
  "algorithm_version": "GEE-S2-SR-DUAL-MASK-V2.5",
  "classification_status": "ESTIMATED",
  "processing_timestamp": "2026-10-06T12:00:00Z"
}
```

---

## 7. API Endpoints Summary

- `GET /api/v1/satellite/health` — Provider health and authentication check
- `GET /api/v1/satellite/providers/status` — All providers status overview
- `GET /api/v1/satellite/scenes` — Sentinel-2 scene search for AOI
- `POST /api/v1/satellite/analyze` — Full spectral analysis & candidate zone extraction
- `GET /api/v1/satellite/results/{id}` — Retrieve cached analysis result
- `POST /api/v1/satellite/compare` — Before/after multi-temporal comparison
- `POST /api/v1/hyacinth/detect` — Candidate detection with optional database persistence
- `GET /api/v1/hyacinth/zones` — Query all detected/registered hyacinth zones
