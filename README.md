# 🌿 Ganga Biocircularity Intelligence Platform

> **Satellite + GIS + Biomass Quantification + Anaerobic Bioenergy + Circular Bioeconomy + Environmental LCA + Techno-Economic Intelligence**  
> *Targeted Study Region: Prayagraj (Allahabad) Ganga-Yamuna Confluence Stretch, Uttar Pradesh, India*

[![License: MIT](https://img.shields.io/badge/License-MIT-teal.svg)](https://opensource.org/licenses/MIT)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.110+-009688.svg?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com)
[![React](https://img.shields.io/badge/React-18.2+-61DAFB.svg?logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3+-3178C6.svg?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![PostGIS](https://img.shields.io/badge/PostGIS-Enabled-336791.svg?logo=postgresql&logoColor=white)](https://postgis.net)

---

## 1. Executive Summary & Overview

The **Ganga Biocircularity Intelligence Platform** is a research-grade full-stack geospatial and environmental decision support system. It monitors invasive aquatic water hyacinth blooms (*Eichhornia crassipes*) across the Ganga River basin, computes geodesic polygon areas from Sentinel-2 MSI satellite imagery, quantifies fresh and dry solids biomass, models continuous anaerobic digestion kinetics into compressed **Bio-CNG**, and simulates circular valorization into **organic vermicompost**, **liquid vermiwash**, and **humic biostimulants**.

---

## 2. End-to-End System Workflow

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

---

## 3. Technology Stack

### Frontend
- **Framework**: React 18 + Vite with TypeScript
- **Styling**: Tailwind CSS with custom scientific eco-river design system (Bio Green, River Blue, Confluence Teal, Slate)
- **GIS Cartography**: Leaflet & React-Leaflet (ESRI World Imagery, OpenStreetMap, Topographic basemaps, interactive geodesic polygon drawing and distance measurement tool)
- **Visual Analytics**: Recharts (diurnal trends, proximate composition pies, multi-scenario comparisons)
- **Icons**: Lucide React

### Backend
- **Framework**: Python 3.11+ / FastAPI
- **Validation**: Pydantic v2
- **Data Persistence**: SQLAlchemy 2.0 with PostGIS / SQLite support
- **Geospatial & Remote Sensing**: Shapely, Geodesic WGS84 excess computation, Sentinel-2 spectral indices
- **Reporting Engine**: ReportLab PDF generator

---

## 4. Repository Structure

```
ganga-biocircularity-platform/
├── .env.example
├── docker-compose.yml
├── README.md
├── frontend/
│   ├── package.json
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   ├── index.html
│   └── src/
│       ├── types/            # TypeScript schemas
│       ├── services/         # API clients with fallback datasets
│       ├── components/
│       │   ├── common/       # Navbar, Sidebar, MetricCard, MethodologyModal, ProvenanceModal
│       │   ├── gis/          # RiverMap, MeasurementTool, ZoneDetailsPanel
│       │   ├── biomass/      # BiomassOverview, SpatialCharts
│       │   ├── bioenergy/    # ResourceSimulator, ScenarioComparison
│       │   ├── circularity/  # CircularFlowDiagram, CircularityScorecard, ValueAddedProducts
│       │   ├── waterQuality/ # WaterQualityDashboard, HeavyMetalTable
│       │   ├── operations/   # HarvestingTracker, FieldObservationForm
│       │   ├── environment/  # GHGImpactCard, NutrientRecoveryStats
│       │   ├── economics/    # EconomicBreakdown, CostBenefitCalculator
│       │   └── reports/      # ReportGenerator
│       ├── views/            # Module Views
│       ├── App.tsx
│       └── main.tsx
├── backend/
│   ├── Dockerfile
│   ├── requirements.txt
│   ├── app/
│   │   ├── config.py
│   │   ├── database.py
│   │   ├── models/           # SQLAlchemy Data Models
│   │   ├── schemas/          # Pydantic API Schemas
│   │   ├── core/             # GIS, Biomass, Bioenergy, LCA, PDF Engines
│   │   ├── api/v1/           # Modular REST Endpoints
│   │   └── main.py
│   ├── scripts/
│   │   └── seed_demo_data.py
│   └── tests/
│       └── test_biomass.py
├── data/
│   ├── geojson/              # Vector GIS layers (Prayagraj River, Zones, Stations)
│   └── reference_factors.json
└── docs/                     # Technical specifications
```

---

## 5. Quick Start & Execution

### Option A: Docker Compose (All Services)
```bash
docker compose up --build
```
- Web Application: `http://localhost:5173`
- REST API Documentation: `http://localhost:8000/api/v1/docs`

### Option B: Local Setup

#### 1. Backend Setup
```bash
cd backend
py -m pip install -r requirements.txt
py scripts/seed_demo_data.py
py -m uvicorn app.main:app --reload --port 8000
```

#### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

---

## 6. End-to-End Test Demonstration Scenario

1. **Step 1: Open Application**
   - Access `http://localhost:5173` to view the Executive Dashboard.
2. **Step 2: Navigate to River Intelligence**
   - Click `River GIS Intelligence` in the sidebar.
3. **Step 3: Select Focus Zone**
   - Click `HZ-PRY-01: Sangam Left Bank Embayment Patch`.
   - Inspect Area ($14.8\text{ ha}$), Coverage ($92.5\%$), Confidence ($94\%$), and Fresh Biomass ($518.0\text{ t}$).
4. **Step 4: Use Measurement Tool**
   - Click `Draw Area (ha)` on the map HUD, place custom vertices over the riverbed, and observe dynamic geodesic area and biomass calculation.
5. **Step 5: Run Bioenergy Simulation**
   - Click `Simulate Bio-CNG & Recovery` to transmit zone biomass into the interactive CSTR simulator.
   - Adjust moisture, utilization, and scenario tabs (Conservative, Baseline, Optimistic).
6. **Step 6: Evaluate Circularity & Environmental Impact**
   - Inspect the 10-stage interactive circular pipeline and 5-pillar Circularity Index ($81.4 / 100$).
   - Review GHG emissions avoided ($121,400\text{ kg CO}_2\text{e}$) and heavy metals screening against CPCB thresholds.
7. **Step 7: Techno-Economic Valuation**
   - View OPEX vs SATAT Bio-CNG revenues, vermicompost revenues, net margin ($₹4.85\text{ Lakh}$), and $1.48\text{ year}$ payback.
8. **Step 8: Generate Scientific Report**
   - Go to `Scientific Reports`, configure sections, and click `Compile & Generate Report`.
   - Download the real scientific PDF document.

---

## 7. Scientific Transparency & Data Provenance

All metrics in the platform explicitly declare their provenance state:
- `OBSERVED`: Satellite acquisition dates, CPCB real-time water quality probes.
- `ESTIMATED`: Allometric fresh and dry solids biomass calculations.
- `MODELED`: CSTR anaerobic digestion kinetics, biomethane conversion, and LCA carbon offsets.
- `DEMO`: Prototype economic tariff scenarios and field survey simulations.

---

## 8. License
This research project is licensed under the MIT License.
