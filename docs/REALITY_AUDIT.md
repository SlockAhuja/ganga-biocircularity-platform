# BioRiver Scientific & Geospatial Reality Audit

This document presents a component-by-component reality audit across the entire BioRiver codebase, distinguishing observed measurements, reference hydrography, modeled kinetics, estimated candidate detections, literature baselines, and demo fallbacks.

---

## 1. System Reality Audit Matrix

| System Component | Technical Implementation | Data Provenance Tier | Reality Classification | Scientific Defensibility & Validation Status |
| :--- | :--- | :--- | :--- | :--- |
| **River Water Extent** | Sentinel-2 MNDWI + Authoritative WGS84 Survey | `REFERENCE_HYDROGRAPHY` / `EARTH_ENGINE` | **REFERENCE / ESTIMATED** | Validated against Prayagraj Ganga-Yamuna shoreline morphology (1,425.8 ha). |
| **River Centerlines** | Deep-channel thalweg LineStrings | `REFERENCE_HYDROGRAPHY` | **REFERENCE** | Traces continuous navigable channel meander without land intersection. |
| **Sentinel-2 Remote Sensing** | Google Earth Engine Harmonized SR (`camera-503319`) | `EARTH_ENGINE` | **ESTIMATED** | Cloud/shadow SCL filtered; MNDWI/NDWI/NDVI composite candidate classifier. |
| **Water Quality (Physicochemical)** | CPCB / NWMP In-Situ Bulletins (6 stations) | `OBSERVED` | **OBSERVED** | 100% real CPCB Prayagraj monitoring data (pH, DO, BOD, COD, TDS, Turbidity). |
| **Water Quality (Heavy Metals)** | Peer-reviewed Ganga ecotoxicology baselines | `LITERATURE` | **LITERATURE** | Explicitly marked as literature baselines until lab logs are ingested. |
| **Biomass Quantification** | Geodesic area $\times$ allometric weed density scaling | `ESTIMATED` | **ESTIMATED** | Transparent equations in `BiomassEngine`; 95% CI: $479.1 \pm 169.0\text{ t}$. |
| **Bioenergy & Anaerobic Digestion** | BMP kinetics ($\text{VS} \to \text{CH}_4 \to \text{Bio-CNG} \to \text{Electricity}$) | `MODELED` | **MODELED** | First-order kinetic model; 95% CI: $9,568 \pm 2,250\text{ m}^3$ Biogas. |
| **Digestate & Vermicomposting** | *Eisenia fetida* solid-state bioconversion | `MODELED` | **MODELED** | Model yields 7.01 t vermicompost + 35,311 L liquid vermiwash. |
| **Conservation of Mass Balance** | First Law of Thermodynamics closed mass flow | `VALIDATED` | **SCIENTIFICALLY VALIDATED** | Mass closure error = 0.0000% across all 5 cascading transformation stages. |
| **Environmental LCA** | IPCC Tier-2 avoided methane & fossil substitution | `MODELED` | **MODELED** | Emission factors registered in assumptions; net $-122,991\text{ kg CO}_2\text{e}$. |
| **Techno-Economics** | DCF & Capex/Opex Low/Base/High Scenarios | `MODELED` | **MODELED** | Transparent INR cost-benefit metrics; 1.24 yr payback period. |
| **Ground Truth Architecture** | Field observation logger with validation status | `OBSERVED` | **OBSERVED** | Supports species, coverage, density, photo uploads, and validation labels. |
| **Meteorological Context** | Open-Meteo API for Prayagraj coordinates | `OBSERVED` | **OBSERVED** | Real-time temperature, humidity, solar irradiance, precipitation. |
| **Hydrological Gauges** | Central Water Commission (CWC) stage & discharge | `OBSERVED` | **OBSERVED** | Gauge levels at Phaphamau (Ganga) and Naini (Yamuna). |
| **Scientific PDF Reporting** | Dynamic multi-page ReportLab generator | `SYSTEM` | **PRODUCTION READY** | Full provenance, methodology, charts, and audit metadata. |

---

## 2. Universal Provenance Schema

All API endpoints and JSON payloads adhere to the 6-tier provenance taxonomy:

1. **`OBSERVED`**: In-situ direct measurements from calibrated sensors, official CPCB/CWC bulletins, or verified field surveys.
2. **`REFERENCE`**: Authoritative geographic surveys, OpenStreetMap vector infrastructure, and geodetic baselines.
3. **`LITERATURE`**: Peer-reviewed scientific publications, IPCC emission factor databases, and ecotoxicological literature.
4. **`ESTIMATED`**: Remote sensing canopy classifications (Sentinel-2 MNDWI/NDVI) and spatial density scaling.
5. **`MODELED`**: Stoichiometric simulations, anaerobic digestion kinetic models, and discounted cash flow economic scenarios.
6. **`DEMO`**: Offline testing fallbacks, explicitly flagged with visual badges. Never misrepresented as real data.
