# BioRiver Satellite Integration & Earth Observation Specification

**Document Identifier:** `BIORIVER-SAT-INT-2026-V3`  
**Provider Protocols:** ESA Copernicus Data Space Ecosystem (CDSE), Google Earth Engine (GEE), Sentinel-1 SAR  
**Status:** IMPLEMENTED & VERIFIED (Modular Provider Router)  

---

## 1. Multi-Provider Satellite Architecture

BioRiver implements a pluggable Earth Observation provider interface (`backend/app/api/v1/satellite.py`):

```
                       ┌────────────────────────────────┐
                       │  Satellite Provider Interface  │
                       └───────────────┬────────────────┘
                                       │
        ┌──────────────────────────────┼──────────────────────────────┐
        ▼                              ▼                              ▼
┌───────────────┐              ┌───────────────┐              ┌───────────────┐
│ DEMO Provider │              │  Copernicus   │              │ Google Earth  │
│ (Synthetic /  │              │  Sentinel-2   │              │ Engine (GEE)  │
│ Static Scenes)│              │  (CDSE OData) │              │  (EE Python)  │
└───────────────┘              └───────────────┘              └───────────────┘
```

---

## 2. Provider Status & Health Endpoint

The system reports real-time provider configuration at `GET /api/v1/satellite/providers/status`:

```json
{
  "active_provider": "DEMO",
  "providers": [
    {
      "provider_id": "DEMO",
      "name": "Synthetic Multi-temporal Demo Provider",
      "configured": true,
      "available": true,
      "status": "OPERATIONAL",
      "last_test": "2026-10-06T11:45:00Z"
    },
    {
      "provider_id": "SENTINEL_COPERNICUS",
      "name": "ESA Copernicus Data Space Ecosystem (Sentinel-2 L2A)",
      "configured": false,
      "available": false,
      "status": "EXTERNAL CONFIGURATION REQUIRED",
      "auth_type": "OAuth2 Client Credentials (CDSE_CLIENT_ID / CDSE_CLIENT_SECRET)"
    },
    {
      "provider_id": "EARTH_ENGINE",
      "name": "Google Earth Engine (Sentinel-2 Harmonized MSI)",
      "configured": false,
      "available": false,
      "status": "EXTERNAL CONFIGURATION REQUIRED",
      "auth_type": "Google Cloud Service Account JSON Key"
    },
    {
      "provider_id": "SENTINEL_1_SAR",
      "name": "Copernicus Sentinel-1 C-Band SAR (Cloud-Penetrating)",
      "configured": false,
      "available": false,
      "status": "PLANNED",
      "notes": "SAR dual-pol VV/VH backscatter fusion scheduled for Phase 4"
    }
  ]
}
```

---

## 3. Earth Observation Spectral Indices

BioRiver calculates canonical spectral indices across Sentinel-2 10m/20m multispectral bands (B2: Blue, B3: Green, B4: Red, B8: NIR, B11: SWIR-1):

1. **Normalized Difference Vegetation Index (NDVI)**:
   $$\text{NDVI} = \frac{\text{B8 (NIR)} - \text{B4 (Red)}}{\text{B8 (NIR)} + \text{B4 (Red)}}$$
   - Dense hyacinth mats exhibit strong chlorophyll reflectance: $\text{NDVI} \in [0.45, 0.85]$.
2. **Modified Normalized Difference Water Index (MNDWI)**:
   $$\text{MNDWI} = \frac{\text{B3 (Green)} - \text{B11 (SWIR1)}}{\text{B3 (Green)} + \text{B11 (SWIR1)}}$$
   - Open river water delineation: $\text{MNDWI} > 0.0$.
3. **Floating Algae & Weed Index (FAVI)**:
   $$\text{FAVI} = \frac{\text{B8} - \text{B4}}{\text{B8} + \text{B4} + \text{B2}}$$

---

## 4. Optical Cloud Masking & Scene Quality Policy

- **Threshold**: Scenes with $> 40\%$ scene cloud cover or $> 20\%$ AOI cloud cover are automatically flagged as `DEGRADED / CLOUD_OBSCURED`.
- **Classification Status**: All current spectral classifications without synchronous ground-truth drone validation are tagged as `PROTOTYPE / UNVERIFIED`.

---

## 5. Provenance Metadata Per Satellite Assessment

Every satellite assessment persists the following immutable audit schema:

| Field | Description | Example |
| :--- | :--- | :--- |
| `scene_id` | ESA / GEE granule identifier | `S2A_MSIL2A_20260915T052651_N0510_R062_T44RKR` |
| `provider` | Provider used | `SENTINEL_COPERNICUS` |
| `acquisition_date` | Timestamp of satellite overpass | `2026-09-15T05:26:51Z` |
| `processing_date` | Pipeline execution timestamp | `2026-09-15T06:12:00Z` |
| `cloud_cover_pct` | Granule cloud percentage | `4.2%` |
| `classification_method` | Decision tree / threshold algorithm | `NDVI_MNDWI_DUAL_THRESHOLD_V1.2` |
| `classification_version`| Algorithm semantic version | `v1.2.0-PROTOTYPE` |
| `confidence` | Statistical spatial confidence | `0.88` |
