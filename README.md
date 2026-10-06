# 🌿 BioRiver — Ganga Biocircularity Intelligence Platform

> **Satellite Remote Sensing + GIS Cartography + Biomass Quantification + Anaerobic Bioenergy + Circular Bioeconomy + Environmental LCA + Economic Intelligence**  
> *Targeted Baseline Study Region: Prayagraj (Allahabad) Ganga-Yamuna Confluence Stretch, Uttar Pradesh, India*

[![License: MIT](https://img.shields.io/badge/License-MIT-teal.svg)](https://opensource.org/licenses/MIT)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.110+-009688.svg?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com)
[![React](https://img.shields.io/badge/React-18.2+-61DAFB.svg?logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3+-3178C6.svg?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![PostGIS](https://img.shields.io/badge/PostGIS-Enabled-336791.svg?logo=postgresql&logoColor=white)](https://postgis.net)

---

## 1. Production Architecture & Primary Domains

| Domain / URL | Role & Purpose | Deployment Status |
|---|---|---|
| **`https://slockahuja.github.io/ganga-biocircularity-platform/`** | GitHub Pages Live Frontend Distribution | **ACTIVE (Automated CI/CD Workflow)** |
| **`https://bioriver.in`** | Public Portal & Research Landing Site | **DNS ACTION REQUIRED** (Registrar config pending) |
| **`https://app.bioriver.in`** | Scientific Intelligence Workbench & GIS Studio | **DNS ACTION REQUIRED** (Cloud deployment target) |
| **`https://api.bioriver.in`** | FastAPI REST & PostGIS Engine (`/api/v1`, `/docs`) | **DNS ACTION REQUIRED** (Cloud Run / VPS target) |

---

## 2. The Seven Fundamental River Questions

BioRiver answers seven core questions across the riverine bioeconomy value chain:
1. **WHERE** is water hyacinth located? $\rightarrow$ Sentinel-2 Remote Sensing & Geodesic GIS Mapping
2. **WHAT** is happening in the river? $\rightarrow$ Limnological multi-parameter CPCB telemetry & heavy metal literature benchmarks
3. **HOW MUCH** biomass exists? $\rightarrow$ Allometric fresh and dry solids quantification engine
4. **HOW MUCH** can realistically be harvested? $\rightarrow$ Field operations, mobile logs & mechanical harvesting logistics
5. **WHAT** resources can be recovered? $\rightarrow$ Anaerobic biomethane (SATAT Bio-CNG), enriched vermicompost, and liquid vermiwash
6. **WHAT** is the environmental & economic impact? $\rightarrow$ IPCC Tier-2 LCA carbon accounting & multi-stream economic cost-benefit analysis
7. **HOW** can researchers document results? $\rightarrow$ Automated PDF report compilation and GeoJSON/CSV exports

---

## 3. Scientific Provenance Architecture

BioRiver enforces a strict data provenance hierarchy across all modules:

- **`OBSERVED`**: Real physical in-situ sensor telemetry or official laboratory assays (e.g., CPCB NWMP water quality).
- **`LITERATURE`**: Peer-reviewed scientific baselines (e.g., historical heavy metal bioaccumulation factors, AAS benchmarks).
- **`ESTIMATED`**: Satellite-derived allometric extrapolations (e.g., Sentinel-2 MSI NDVI/MNDWI hyacinth canopy tonnage).
- **`MODELED`**: Theoretical reaction balances & simulations (e.g., AD methane yield, IPCC Tier-2 LCA emission offsets).
- **`DEMO`**: Offline sandbox synthetic data used strictly during local disconnected development.

> **Note on Trace / Heavy Metals:** Dissolved metals (Cr, Pb, Cd, Ni, Hg, As, Zn, Cu) remain strictly labeled as `LITERATURE BENCHMARK` unless verified by laboratory AAS/ICP-MS certification.

---

## 4. End-to-End System Workflow

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
      BIOGAS / BIO-CNG (SATAT)                 VERMICOMPOSTING (Eisenia fetida)
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

---

## 5. Technology Stack

### Frontend (`frontend/`)
- **Framework**: React 18 + Vite with TypeScript
- **Styling**: Tailwind CSS with custom eco-river scientific color tokens (`#F6FAF7` bg, `#2E7D5B` primary green, `#4B8DB8` blue)
- **GIS Cartography**: Leaflet & React-Leaflet with interactive geodesic polygon measurement tools and layer switcher
- **Visual Analytics**: Recharts (mass balance breakdowns, diurnal trends, economic scenarios)
- **Icons**: Lucide React

### Backend (`backend/`)
- **Framework**: Python 3.11+ / FastAPI
- **Validation**: Pydantic v2
- **Data Persistence**: SQLAlchemy 2.0 with PostGIS / SQLite support
- **Geospatial Processing**: Shapely, WGS84 geodesic spherical excess polygon calculations
- **Satellite Provider**: Google Earth Engine (Project: `camera-503319`, Dataset: `COPERNICUS/S2_SR_HARMONIZED`)
- **Reporting Engine**: ReportLab PDF generator

---

## 6. Quick Start & Local Execution

### Option A: Local Development

```bash
# 1. Clone repository
git clone https://github.com/SlockAhuja/ganga-biocircularity-platform.git bioriver
cd bioriver
cp .env.example .env

# 2. Setup and run Backend
cd backend
python -m venv venv
# Windows: .\venv\Scripts\activate | Linux: source venv/bin/activate
pip install -r requirements.txt
python scripts/seed_demo_data.py
python -m pytest tests -v
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload

# 3. In a second terminal, run Frontend
cd ../frontend
npm install
npm run build
npm run dev
```

### Option B: Docker Compose Stack

```bash
docker compose up --build
```

---

## 7. Development & Demo Accounts *(DEVELOPMENT / DEMO ONLY)*

| Role | Email | Password | Access Capabilities |
|---|---|---|---|
| **Lead Administrator** | `admin@bioriver.in` | `bioriver2026` | Full platform management, calibration factors, users |
| **Researcher** | `researcher@bioriver.in` | `bioriver2026` | GIS exploration, satellite scenes, biomass/bioenergy modeling, PDF reports |
| **Field Operator** | `operator@bioriver.in` | `bioriver2026` | Mobile field logging, sampling stations, harvesting records |
| **Policy Analyst** | `analyst@bioriver.in` | `bioriver2026` | LCA carbon accounting, economics, circularity scoring |

---

## 8. Documentation Index

Comprehensive technical and scientific documentation is maintained in the `docs/` folder:
- [Scientific Validation & Calculation Audit](docs/SCIENTIFIC_VALIDATION.md)
- [Scientific Assumptions & Registry Specification](docs/SCIENTIFIC_ASSUMPTIONS.md)
- [Data Provenance & Quality Indexing](docs/DATA_PROVENANCE.md)
- [Satellite Integration & Provider Architecture](docs/SATELLITE_INTEGRATION.md)
- [Production Deployment & Infrastructure Guide](docs/PRODUCTION_DEPLOYMENT.md)
- [Reality Audit & System Verification](docs/REALITY_AUDIT.md)
- [Final Acceptance Audit Matrix](docs/FINAL_ACCEPTANCE_AUDIT.md)
- [Architecture & Modular Multi-River Design](docs/architecture.md)
- [Installation Guide](docs/INSTALLATION.md)
- [REST API Reference](docs/api.md)
- [Spatial Database & PostGIS Schema](docs/DATABASE.md)
- [GIS Geodesic Cartography](docs/gis.md)
- [Satellite Remote Sensing Pipeline](docs/satellite.md)
- [Allometric Biomass Quantification](docs/biomass.md)
- [Anaerobic Bioenergy & Bio-CNG Engine](docs/bioenergy.md)
- [Vermicomposting & Products](docs/VERMICOMPOST.md)
- [Environmental LCA & Carbon Accounting](docs/ENVIRONMENT.md)
- [Economic Analysis & Scenarios](docs/ECONOMICS.md)
- [Five-Pillar Circularity Index](docs/circularity.md)
- [Automated Report Generation & PDF](docs/REPORTS.md)
- [Security & RBAC Policies](docs/SECURITY.md)
- [Scientific Research Methodology](docs/RESEARCH_METHODOLOGY.md)

---

## 9. License

Open-source under the [MIT License](LICENSE).
