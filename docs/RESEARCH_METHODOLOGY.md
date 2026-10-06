# BioRiver Research Methodology & Scientific Standards

This document establishes the scientific principles, literature baselines, and quality criteria governing the BioRiver platform.

---

## 1. Scientific Integrity & Data Provenance Rules

Every metric generated or displayed in the BioRiver platform must carry a strict provenance classification:

- **`OBSERVED`**: In-situ ground truth observations recorded by field researchers (e.g., multi-probe water quality readings, physically weighed harvesting truckloads).
- **`ESTIMATED`**: Direct algorithmic derivations from sensor or satellite observations (e.g., MNDWI/NDVI water hyacinth surface area, allometric fresh biomass).
- **`MODELED`**: Complex multi-stage simulations based on empirical conversion kinetics (e.g., anaerobic digestion BMP, vermicompost yield, IPCC LCA carbon balance).
- **`DEMO`**: Simulated baseline records used for development, staging, or educational demonstration when real-time sensor connections are not configured.

---

## 2. Remote Sensing & Classification Rules

1. **Vegetation Index Rule**: NDVI alone does **NOT** definitively identify water hyacinth. The platform combines MNDWI water boundary masking with NDVI thresholding ($\text{NDVI} > 0.42$) and spatial clustering.
2. **Honesty Rule**: Unless an active Google Earth Engine or Copernicus API key is authenticated, satellite scenes are classified as **Prototype / Estimated Distribution**.

---

## 3. Key Peer-Reviewed References

1. **Allometric Biomass Quantification**:
   - Gunnarsson, C.C., & Petersen, C.M. (2007). Water hyacinths as a resource in agriculture and energy production: a review. *Waste Management*, 27(1), 117-129.
2. **Anaerobic Biomethane Potential**:
   - Kumar, S., & Ghosh, P.C. (2019). Anaerobic digestion of water hyacinth: Bioenergy potential and nutrient recovery in India. *Renewable Energy*, 138, 412-421.
3. **Digestate Vermicomposting**:
   - Gupta, R., & Garg, V.K. (2008). Stabilization of water hyacinth by vermicomposting. *Bioresource Technology*, 99(18), 8605-8612.
4. **Wetland LCA Carbon Dynamics**:
   - IPCC (2019). *2019 Refinement to the 2006 IPCC Guidelines for National Greenhouse Gas Inventories*. IPCC, Switzerland.
