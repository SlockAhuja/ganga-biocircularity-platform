# BioRiver Data Provenance & Scientific Traceability Specification

**Document Identifier:** `BIORIVER-DATA-PROV-2026-V3`  
**Standard Compliance:** FAIR Data Principles (Findable, Accessible, Interoperable, Reusable), CPCB Monitoring Protocol  
**Status:** IMPLEMENTED & VERIFIED  

---

## 1. Overview & Data Integrity Principle

Scientific credibility requires transparent data origin labeling. BioRiver enforces strict separation between empirically measured field observations, government telemetric telemetry, and peer-reviewed literature models.

No literature-derived constant or simulation default is ever presented to end users as an "observed", "measured", or "live" field parameter.

---

## 2. Standard Data Source Taxonomy (`source_type`)

Every water quality measurement, biomass sample, contaminant record, and economic constant in the platform is tagged with one of the following authoritative `source_type` enumerations:

| `source_type` Enumeration | Definition | Typical Verification Standard | UI Display Badge |
| :--- | :--- | :--- | :--- |
| `FIELD` | Primary empirical measurement collected on-site by field teams. | GPS geotag, operator ID, calibrated sonde/sensor log. | `[FIELD OBSERVED]` (Green) |
| `GOVERNMENT` | Ingested from statutory agency portals (e.g., CPCB, UPPCB, NMCG RTWQMS). | Station ID, statutory data portal sync timestamp. | `[CPCB / GOVT]` (Blue) |
| `REMOTE_SENSING` | Earth observation satellite pipeline output (Sentinel-2, Landsat-8/9). | Scene ID, cloud cover %, processor algorithm version. | `[SATELLITE DERIVED]` (Cyan) |
| `LITERATURE` | Extracted from published, peer-reviewed scientific journals or standards. | DOI / Citation (e.g., *Kumar & Ghosh 2019*). | `[LITERATURE BENCHMARK]` (Amber) |
| `MODELED` | Downstream computational simulation output (e.g., IPCC Tier-2 LCA, CSTR AD). | Calculation engine version, input parameter checksum. | `[MODELED OUTPUT]` (Purple) |
| `DEMO` | Synthetic demonstration dataset used for testing and UI evaluation. | Clear synthetic flag, baseline scenario tag. | `[DEMO / SYNTHETIC]` (Gray) |

---

## 3. Data Quality Indexing Matrix

BioRiver computes an automated **Data Quality Score** (`HIGH`, `MEDIUM`, `LOW`) for each dataset based on four orthogonal vectors:

1. **Source Rigor (40%)**: `FIELD` / `GOVERNMENT` (100 pts) > `REMOTE_SENSING` (80 pts) > `LITERATURE` (60 pts) > `DEMO` (30 pts).
2. **Measurement Completeness (25%)**: Percentage of non-null parameters across standard water quality suites (pH, DO, BOD, COD, TSS, Heavy Metals).
3. **Temporal Recency (20%)**: Age of data point ($< 30\text{ days} = 100\text{ pts}$; $< 180\text{ days} = 70\text{ pts}$; older $= 40\text{ pts}$).
4. **Validation Status (15%)**: Verified by field lab supervisor or statutory checksum (`VERIFIED` vs `UNVERIFIED`).

```
Score >= 80  --> HIGH DATA QUALITY (Publication & Regulatory Grade)
Score 50-79  --> MEDIUM DATA QUALITY (Planning & Operational Estimate)
Score < 50   --> LOW DATA QUALITY (Indicative / Prototype Only)
```

---

## 4. Heavy Metal & Contaminant Provenance Policy

### Critical Audit Rule:
In-situ heavy metal bioaccumulation concentrations (Lead $Pb$, Cadmium $Cd$, Chromium $Cr$, Arsenic $As$) within the demo dataset originate from published river basin literature (*Saha et al., 2017; Rai, 2008*).

- **UI Guarantee**: All heavy metal views in `DataExplorerView` and `ProductsView` explicitly render the warning:  
  `"LITERATURE-BASED DEMO DATA — NOT EMPIRICALLY MEASURED IN-SITU"`.
- **Compost Safety Thresholds**: Displayed against Fertilizer Control Order (FCO 1985 / 2009 amendment) statutory limits with explicit laboratory disclaimer.

---

## 5. Ground Truth Architecture (`GroundTruthObservation`)

To validate satellite classification accuracy, the database supports dedicated ground truth sampling records:

```json
{
  "observation_id": "GTO-2026-09-001",
  "location": {"lat": 25.4312, "lng": 81.8791},
  "timestamp": "2026-09-15T09:30:00Z",
  "observer_id": "FIELD_TEAM_PRAYAGRAJ_01",
  "species": "Eichhornia crassipes (Water Hyacinth)",
  "coverage_pct": 82.5,
  "wet_density_kg_m2": 4.4,
  "canopy_height_cm": 45.0,
  "photo_uri": "s3://bioriver-groundtruth/photos/20260915_prayagraj_01.jpg",
  "validation_status": "VERIFIED"
}
```

---

## 6. CSV Real Data Ingestion Pipeline

The platform provides a CSV ingestion engine for field operators at `/api/v1/water-quality/import-csv` and `/api/v1/harvesting/import-csv` with strict validation rules:
- Mandatory WGS84 decimal latitude/longitude within the Ganga Basin bounding box ($[21.0, 77.0] \times [31.5, 89.0]$).
- ISO 8601 UTC timestamps.
- Required numerical bounds check ($0 \le \text{pH} \le 14$, $\text{DO} \ge 0\text{ mg/L}$, $\text{BOD} \ge 0\text{ mg/L}$).
- Pre-commit preview table returned to operator before database persistence.
