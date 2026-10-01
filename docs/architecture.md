# System Architecture

## Overview
The **Ganga Biocircularity Intelligence Platform** is a research-grade full-stack environmental and geospatial decision support system. It monitors invasive aquatic weed blooms (*Eichhornia crassipes*) along the Ganga and Yamuna rivers around Prayagraj (Allahabad), quantifies spatial biomass, models anaerobic bioconversion into Bio-CNG, and maps valorization pathways into organic vermicomposts, liquid vermiwash, and humic extracts.

```
                    GANGA RIVER (Prayagraj Confluence)
                                  │
                                  ▼
                 SATELLITE REMOTE SENSING (Sentinel-2 MSI)
                                  │
                                  ▼
                WATER HYACINTH CANOPY DETECTION (NDVI + MNDWI)
                                  │
                                  ▼
                    GEODESIC AREA MEASUREMENT (WGS84)
                                  │
                                  ▼
             ALLOMETRIC BIOMASS ESTIMATION (Fresh & Dry Solids)
                                  │
                                  ▼
                    SELECTIVE HARVESTING & FIELD OPS
                                  │
              ┌───────────────────┴───────────────────┐
              ▼                                       ▼
     ANAEROBIC DIGESTION (CSTR)               DIGESTATE FRACTIONATION
              │                                       │
              ▼                                       ▼
     BIOGAS / BIO-CNG (SATAT)                 VERMICOMPOSTING (Eisenia foetida)
                                                      │
                                                      ▼
                                           ORGANIC BIO-FERTILIZER
                                                      │
                                                      ▼
                                           VALUE-ADDED EXTRACTS (Vermiwash, Humic)
                                                      │
                    ┌─────────────────────────────────┴─────────────────────────────────┐
                    ▼                                                                   ▼
             ENVIRONMENTAL LCA                                                TECHNO-ECONOMIC
     (GHG Avoidance, River BOD Offset)                                    (Revenues, ROI, Payback)
```

## Layer Decomposition

### 1. Frontend (Client Tier)
- **Framework**: React 18 / Vite with TypeScript
- **Styling**: Tailwind CSS with custom eco-river palette (Bio Green, River Blue, Slate)
- **GIS Cartography**: Leaflet / React-Leaflet with ESRI Satellite World Imagery, OpenStreetMap, and Topographic tiles
- **Analytics & Data Visuals**: Recharts (diurnal trends, compositional pies, multi-scenario comparisons)
- **State & Service Layer**: Decoupled HTTP API client with instant offline demo fallback

### 2. Backend (Application Tier)
- **Framework**: Python 3.11+ / FastAPI
- **Validation**: Pydantic v2 schemas
- **ORM & Database**: SQLAlchemy 2.0 with PostGIS spatial query support & SQLite local mode
- **GIS Engine**: Shapely, Geodesic spherical trigonometry, Haversine line metrics
- **Remote Sensing Processing**: Multi-spectral index evaluation (NDVI, NDWI, MNDWI, EVI)
- **Report Generation**: ReportLab PDF document compilation

### 3. Database Schema
- `users`: Role-based access control (`ADMIN`, `RESEARCHER`, `FIELD_OPERATOR`, `VIEWER`)
- `monitoring_regions`: Bounding boxes and regional geography
- `river_segments`: GeoJSON vector line paths
- `monitoring_stations`: Points with real-time hydrological parameters
- `hyacinth_zones`: Classified weed polygons with confidence scores and density grades
- `biomass_assessments`: Proximate breakdown (fresh weight, total solids, volatile solids)
- `bioenergy_assessments`: CSTR methane yields, Bio-CNG, electrical output, digestate
- `water_quality_observations`: Physicochemical and ICP-MS heavy metal assays
- `harvesting_records`: Logged amphibious skimmer operations
- `field_observations`: Crowd-sourced and field officer ground-truth logs
- `generated_reports`: Archived PDF exports
