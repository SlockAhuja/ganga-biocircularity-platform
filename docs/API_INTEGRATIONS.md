# BioRiver External API & Data Provider Registry

This registry documents all external data providers, APIs, datasets, access mechanisms, caching tiers, failure policies, and provenance standards implemented in the BioRiver Ganga Biocircularity Intelligence Platform.

---

## 1. Provider Architecture Overview

BioRiver strictly decouples data consumption through the `ExternalDataProvider` interface:

```
                      [ BioRiver User / Frontend ]
                                   │
                                   ▼
                       [ BioRiver FastAPI Gateway ]
                                   │
                                   ▼
                      [ ExternalDataProvider Layer ]
     ┌───────────────┬────────────────┬───────────────┬───────────────┐
     ▼               ▼                ▼               ▼               ▼
[Earth Engine]  [MapTiler]       [CPCB / NWMP]    [India-WRIS]   [Open-Meteo]
(Sentinel-2)   (Basemaps)       (Water Quality)   (Hydrology)     (Weather)
```

---

## 2. Integrated Providers & Registry

### 2.1 Google Earth Engine (Sentinel-2 Harmonized SR)
* **Provider ID:** `GOOGLE_EARTH_ENGINE`
* **Purpose:** Cloud/shadow masking, multi-spectral water delineation (MNDWI), and vegetation canopy mapping (NDVI, NDWI).
* **GCP Project:** `camera-503319`
* **Dataset:** `COPERNICUS/S2_SR_HARMONIZED`
* **Authentication:** Server-side Google Cloud Service Account / Application Default Credentials (ADC).
* **Provenance Status:** `EARTH_ENGINE` / `ESTIMATED` (Hyacinth Candidate Detection).
* **Failure Mode:** Falls back to offline hydrographic survey model with explicit `REFERENCE` / `ESTIMATED` labeling.

### 2.2 MapTiler Cloud Geospatial & Satellite
* **Provider ID:** `MAPTILER`
* **Purpose:** Vector and satellite basemaps for Prayagraj study basin.
* **Environment Config:** `VITE_MAPTILER_API_KEY`
* **Provenance Status:** `COMMERCIAL` / `REFERENCE`.
* **Failure Mode:** OpenStreetMap standard raster tiles fallback.

### 2.3 Central Pollution Control Board (CPCB / NWMP)
* **Provider ID:** `CPCB_NWMP`
* **Purpose:** Traceable physicochemical observations (pH, DO, BOD, COD, TDS, conductivity, turbidity, temperature, nitrate, phosphate) across 6 Prayagraj Ganga-Yamuna monitoring stations.
* **Source:** Official CPCB Real-Time National Water Quality Monitoring Network.
* **Provenance Status:** `OBSERVED` (CPCB Verified Data).
* **Ecotoxicology Heavy Metals (Cr, Pb, Cd, Ni, Hg, As, Zn, Cu):** Explicitly categorized as `LITERATURE` peer-reviewed baselines until direct AAS/ICP-MS laboratory logs are uploaded.

### 2.4 India-WRIS / Central Water Commission (CWC)
* **Provider ID:** `INDIA_WRIS_CWC`
* **Purpose:** Hydrological river stage levels, gauge datum, discharge volume ($m^3/s$), and flow velocity at Phaphamau (Ganga) and Naini (Yamuna).
* **Provenance Status:** `OBSERVED` (CWC Verified Gauge Bulletins).

### 2.5 Open-Meteo Meteorological Service
* **Provider ID:** `OPEN_METEO_WEATHER`
* **Purpose:** Real-time weather telemetry for Prayagraj ($25.4358^\circ\text{N}, 81.8463^\circ\text{E}$): ambient temperature, solar irradiance, relative humidity, wind speed, and precipitation.
* **Operational Application:** Evaluates biomass solar dewatering rates, mechanical harvester navigational safety, and satellite optical clarity.
* **Endpoint:** `GET https://api.open-meteo.com/v1/forecast`
* **Caching:** 30-minute in-memory cache.
* **Provenance Status:** `OBSERVED` (ECMWF/GFS numerical assimilation).

### 2.6 OpenStreetMap Reference Infrastructure
* **Provider ID:** `OPEN_STREET_MAP`
* **Purpose:** Visual reference for bridges (Curzon, Shastri, Naini), ghats (Daraganj, Arail), and civic riverfront boundaries.
* **Provenance Status:** `REFERENCE`.

### 2.7 BioRiver Scientific Object & Artifact Storage
* **Provider ID:** `OBJECT_STORAGE`
* **Purpose:** Offloads binary artifacts (field photos, vector GeoJSON exports, ReportLab PDF reports) from the relational database.
* **Backends:** Local filesystem, S3-compatible (Cloudflare R2 / AWS S3 / MinIO).

---

## 3. System Health & Diagnostics Endpoint

`GET /api/v1/system/providers-health` returns:

```json
{
  "status": "OPERATIONAL",
  "total_providers": 7,
  "providers": [
    {
      "provider_id": "GOOGLE_EARTH_ENGINE",
      "name": "Google Earth Engine (Copernicus Sentinel-2 SR)",
      "status": "LIVE",
      "latency_ms": 12.4,
      "last_success": "2026-10-06T13:30:00Z",
      "error_count": 0,
      "details": "Earth Engine initialized with GCP Project: camera-503319"
    },
    {
      "provider_id": "OPEN_METEO_WEATHER",
      "name": "Open-Meteo Meteorological Service",
      "status": "LIVE",
      "latency_ms": 142.1,
      "last_success": "2026-10-06T13:30:00Z",
      "error_count": 0,
      "details": "Open-Meteo API responsive and delivering live telemetry for Prayagraj."
    }
  ]
}
```
