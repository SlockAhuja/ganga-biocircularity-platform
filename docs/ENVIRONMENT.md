# BioRiver Environmental Life Cycle Assessment (LCA) Engine

This document details the emission factors, IPCC methodology, and environmental impact equations implemented in BioRiver.

---

## 1. System Boundary & Methodological Framework

BioRiver implements a **Gate-to-Gate + Avoided Burden** LCA methodology aligned with:
- **ISO 14040/14044**: Environmental management — Life cycle assessment
- **IPCC 2019 Refinement**: Tier-2 waste and wetlands decomposition accounting

---

## 2. Net Greenhouse Gas (GHG) Avoidance Equation

$$GHG_{net\\_avoided} = GHG_{decay\\_prevented} + GHG_{cng\\_offset} + GHG_{grid\\_offset} - GHG_{operations}$$

Where:

### 2.1 Prevented Riverbed Anaerobic Methane Venting:
When left in the river, decomposing hyacinth mats generate uncontrolled methane plumes:
- **Decay Emission Factor**: $0.082\text{ kg CH}_4 / \text{kg dry solids rotted in river}$
- **Global Warming Potential ($GWP_{100}$)**: $28.0\text{ kg CO}_2\text{e} / \text{kg CH}_4$ (IPCC AR6)

### 2.2 Fossil Fuel Displacement (Bio-CNG vs. Diesel/Fossil CNG):
- **Bio-CNG Emission Factor Offset**: $2.75\text{ kg CO}_2\text{e} / \text{kg Bio-CNG}$ substituted

### 2.3 Grid Electricity Displacement:
- **Indian National Grid Baseline Emission Factor (CEA 2023)**: $0.716\text{ kg CO}_2\text{e} / \text{kWh}$

---

## 3. Surface Water Quality & BOD Load Abatement

Clearing floating vegetative mats reduces the biochemical oxygen demand (BOD) load of the river:
- **BOD Reduction Factor**: $185\text{ kg BOD prevented per hectare of mat cleared}$
- **Phytoremediation Heavy Metal Sequestration**: Hyacinth root tissues bioaccumulate trace Cr, Pb, and Cd, removing toxic contaminants from the aquatic food chain upon harvesting.
