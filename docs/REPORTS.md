# BioRiver Scientific Report Generation & PDF Compilation

This document details the automated report generation architecture in BioRiver.

---

## 1. Overview

BioRiver includes an automated report compiler implemented with Python's **ReportLab** library. It synthesizes GIS observations, biomass quantification, bioenergy modeling, environmental LCA, and economic metrics into formal research PDFs.

---

## 2. API Workflow

1. **Trigger Compilation**:
   ```http
   POST /api/v1/reports/generate
   Content-Type: application/json

   {
     "title": "Prayagraj Confluence River Assessment",
     "study_region": "Prayagraj Reach",
     "zone_ids": [1, 2, 3],
     "include_sections": ["All"]
   }
   ```

2. **Download PDF**:
   ```http
   GET /api/v1/reports/download-pdf/{report_code}
   ```

---

## 3. PDF Structure

- **Header**: BioRiver official branding, report code, generation timestamp (UTC), author credentials
- **Executive Summary**: Total hyacinth area, fresh biomass, Bio-CNG yield, and circularity score
- **Spatial Reach Breakdown**: Tabular zone-by-zone density, area (ha), and confidence ratings
- **Resource Recovery Potential**: Energy output (kWh), Bio-CNG (kg), vermicompost (t), NPK (kg)
- **Environmental LCA**: Net GHG avoidance (kg CO₂e), BOD load mitigation, grid offset
- **Economic Feasibility**: OPEX, cascading gross revenues, net benefit (₹)
- **Data Provenance & Scientific Methodology**: Literature citations and calculation versioning
