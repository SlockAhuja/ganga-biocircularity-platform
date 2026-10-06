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

BioRiver is structured into three clear endpoints:

- **`https://bioriver.in`**: Public-facing website (Overview, Problem, Science, Bioeconomy, Impact, Partners, Contact)
- **`https://app.bioriver.in`**: Authenticated scientific intelligence workbench (GIS Studio, Satellite Monitoring, Biomass/Bioenergy Simulators, Field Operations, Reports)
- **`https://api.bioriver.in`**: REST API & Geospatial Data Service (`/api/v1/`, OpenAPI Swagger Docs at `/docs`)

---

## 2. The Seven Fundamental River Questions

BioRiver answers seven questions across the riverine bioeconomy value chain:
1. **WHERE** is water hyacinth located? $\rightarrow$ Sentinel-2 Remote Sensing & Geodesic GIS Mapping
2. **WHAT** is happening in the river? $\rightarrow$ Limnological multi-parameter & heavy metals water quality tracking
3. **HOW MUCH** biomass exists? $\rightarrow$ Allometric fresh and dry solids quantification engine
4. **HOW MUCH** can realistically be harvested? $\rightarrow$ Field operations, mobile logs & mechanical harvesting logistics
5. **WHAT** resources can be recovered? $\rightarrow$ Anaerobic biomethane (Bio-CNG), enriched vermicompost, and liquid vermiwash
6. **WHAT** is the environmental & economic impact? $\rightarrow$ IPCC Tier-2 LCA carbon accounting & multi-stream economic cost-benefit analysis
7. **HOW** can researchers document and report results? $\rightarrow$ Automated PDF report compilation and GeoJSON/CSV exports

---

## 3. End-to-End System Workflow

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

## 4. Technology Stack

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
- **Reporting Engine**: ReportLab PDF generator

---

## 5. Quick Start & Local Execution

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
python -m pytest tests
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

## 6. Demo Accounts & Credentials

| Role | Email | Password | Access Capabilities |
|---|---|---|---|
| **Lead Administrator** | `admin@bioriver.in` | `bioriver2026` | Full platform management, calibration factors, users |
| **Researcher** | `researcher@bioriver.in` | `bioriver2026` | GIS exploration, satellite scenes, biomass/bioenergy modeling, PDF reports |
| **Field Operator** | `operator@bioriver.in` | `bioriver2026` | Mobile field logging, sampling stations, harvesting records |
| **Policy Analyst** | `analyst@bioriver.in` | `bioriver2026` | LCA carbon accounting, economics, circularity scoring |

---

## 7. Documentation Index

Comprehensive technical documentation is maintained in the `docs/` folder:
- [Architecture & Modular Multi-River Design](docs/architecture.md)
- [Installation Guide](docs/INSTALLATION.md)
- [Production Deployment & Domain Setup](docs/deployment.md)
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

## 8. License

Open-source under the [MIT License](LICENSE).
