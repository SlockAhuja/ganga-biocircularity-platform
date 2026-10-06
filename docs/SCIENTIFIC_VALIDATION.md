# BioRiver Scientific Calculation Audit & Mathematical Validation Specification

**Document Identifier:** `BIORIVER-SCI-VAL-2026-V3`  
**Standard Compliance:** IPCC Guidelines (2019/2021 AR6), Indian Standard IS 16087, MoPNG SATAT Framework, CPCB River Water Quality Standards  
**Status:** IMPLEMENTED & VERIFIED  

---

## 1. Executive Summary

BioRiver provides a continuous, mass-balanced computational pipeline spanning:
1. **Remote Sensing & GIS Surface Area Modeling**
2. **Allometric Biomass Characterization (TS, VS, Recoverable)**
3. **Anaerobic Digestion & Bio-CNG Upgrading (IS 16087 / SATAT)**
4. **Vermicomposting & Vermiwash Nutrient Bioconversion (Eisenia fetida)**
5. **Environmental Life Cycle Assessment (LCA) & Net GHG Accounting (IPCC Tier-2)**
6. **Cascading Circular Economics & Levelized Cost / Payback Analysis**
7. **Multi-Pillar Circularity Index (5 Sub-indices)**

This document details the exact mathematical formulas, physical units, boundary assumptions, operational parameters, and peer-reviewed literature citations governing every calculation in the BioRiver platform.

---

## 2. Centralized Unit Normalization Architecture

All modules execute through `backend/app/core/units.py`. Every calculation requires explicit physical units to prevent dimension mismatch errors.

| Dimension | Standard Base Unit | Supported Engineering Units | Conversion Factor |
| :--- | :--- | :--- | :--- |
| **Area** | Square meters ($m^2$) | Hectares ($ha$), Square kilometers ($km^2$) | $1\text{ ha} = 10,000\text{ m}^2 = 0.01\text{ km}^2$ |
| **Mass** | Metric tonnes ($t$) | Kilograms ($kg$), Grams ($g$) | $1\text{ t} = 1,000\text{ kg} = 1,000,000\text{ g}$ |
| **Gas Volume** | Normal cubic meters ($Nm^3$) | Liters ($L$), Milliliters ($mL$) | $1\text{ m}^3 = 1,000\text{ L} = 1,000,000\text{ mL}$ |
| **BMP** | $mL\text{ CH}_4 / g\text{ VS}$ | $m^3\text{ CH}_4 / t\text{ VS}$ | $1\text{ mL/g VS} = 1\text{ m}^3 / t\text{ VS}$ (dimensionally equivalent) |
| **Energy** | Kilowatt-hours ($kWh$) | Megajoules ($MJ$), Gigajoules ($GJ$) | $1\text{ kWh} = 3.6\text{ MJ} = 0.0036\text{ GJ}$ |
| **Currency** | Indian Rupee ($\text{INR / \u20b9}$) | Lakhs ($\text{INR } 10^5$), Crores ($\text{INR } 10^7$) | $1\text{ Lakh} = \text{INR } 100,000$; $1\text{ Crore} = \text{INR } 10,000,000$ |

---

## 3. Module Audits & Formulas

### Module 1: Biomass Quantification & Consistency

#### Consistency Resolution
- **Fresh Total In-situ Biomass ($M_{\text{fresh, total}}$)**: The total wet standing crop in the river polygon.
- **Total Solids ($M_{\text{TS}}$)**: Dry matter remaining after moisture removal at $105^\circ\text{C}$.
- **Volatile Solids ($M_{\text{VS}}$)**: Organic fraction volatilized at $550^\circ\text{C}$ available for microbial conversion.
- **Recoverable Fresh Feedstock ($M_{\text{fresh, rec}}$)**: Fresh biomass physically harvestable after accounting for mechanical boom/skimmer capture efficiency ($85\%$).

$$\begin{aligned}
M_{\text{fresh, total}} &= A_{\text{zone}} \times C_{\text{canopy}} \times \rho_{\text{yield}} \\
M_{\text{fresh, rec}} &= M_{\text{fresh, total}} \times \eta_{\text{harvest}} \\
M_{\text{TS}} &= M_{\text{fresh, rec}} \times f_{\text{TS}} \\
M_{\text{VS}} &= M_{\text{TS}} \times f_{\text{VS}}
\end{aligned}$$

#### Verification Example (Zone 1 Prayagraj):
- Area $A_{\text{zone}} = 14.5\text{ ha}$, Coverage $C_{\text{canopy}} = 75\%$, Yield Density $\rho_{\text{yield}} = 44.05\text{ t/ha}$
- $M_{\text{fresh, total}} = 14.5 \times 0.75 \times 44.05 = 479.1\text{ tonnes}$
- Harvesting recovery $\eta_{\text{harvest}} = 85\%$ $\implies M_{\text{fresh, rec}} = 479.1 \times 0.85 = 407.24\text{ tonnes}$
- Total Solids $f_{\text{TS}} = 9.0\%$ ($91\%$ moisture) $\implies M_{\text{TS}} = 407.24 \times 0.09 = 36.65\text{ tonnes}$
- Volatile Solids $f_{\text{VS}} = 80.0\%\text{ of TS}$ $\implies M_{\text{VS}} = 36.65 \times 0.80 = 29.32\text{ tonnes}$
- **Consistency Confirmation**: $M_{\text{fresh, total}} > M_{\text{fresh, rec}} > M_{\text{TS}} > M_{\text{VS}}$. Variables are physically distinct and mathematically consistent.

---

### Module 2: Anaerobic Digestion & Bioenergy Conversion

#### Formula Breakdown:
1. **Theoretical Biochemical Methane Potential Volume ($V_{\text{CH4, theoretical}}$)**:
   $$V_{\text{CH4, theoretical}} (Nm^3) = M_{\text{VS}} (t) \times \text{BMP} (m^3/\text{t VS})$$
2. **Biological Conversion in CSTR ($V_{\text{CH4, actual}}$)**:
   $$V_{\text{CH4, actual}} = V_{\text{CH4, theoretical}} \times \eta_{\text{digester}} \quad (\eta_{\text{digester}} = 85\%)$$
3. **Raw Biogas Yield ($V_{\text{biogas}}$)**:
   $$V_{\text{biogas}} (Nm^3) = \frac{V_{\text{CH4, actual}}}{f_{\text{CH4, raw}}} \quad (f_{\text{CH4, raw}} = 62\%)$$
4. **Upgraded Bio-CNG Mass ($M_{\text{Bio-CNG}}$)**:
   $$M_{\text{Bio-CNG}} (kg) = V_{\text{CH4, actual}} (m^3) \times \eta_{\text{upgrading}} \times \rho_{\text{CH4}} \times f_{\text{purity}}$$
   - $\rho_{\text{CH4}} = 0.717\text{ kg/Nm}^3$ (Methane density at NTP: $0^\circ\text{C}, 1.013\text{ bar}$)
   - $\eta_{\text{upgrading}} = 98\%$ membrane separation efficiency
   - $f_{\text{purity}} = 96\%$ per IS 16087 automotive standard
5. **Combined Heat & Power (CHP) Electricity Output ($E_{\text{elec}}$)**:
   $$E_{\text{elec}} (kWh) = \frac{V_{\text{CH4, actual}} (m^3) \times \text{LHV}_{\text{CH4}} (MJ/m^3) \times \eta_{\text{elec}}}{3.6\text{ MJ/kWh}}$$
   - $\text{LHV}_{\text{CH4}} = 35.8\text{ MJ/Nm}^3$, $\eta_{\text{elec}} = 35\%$ electrical conversion efficiency

#### Verification of Reference Scenario (407.24 t Fresh Feedstock, 29.32 t VS, BMP 245 mL/g VS):
- $V_{\text{CH4, theoretical}} = 29.32 \times 245 = 7,183.4\text{ Nm}^3\text{ CH}_4$
- $V_{\text{CH4, actual}} = 7,183.4 \times 0.85 = 6,105.9\text{ Nm}^3\text{ CH}_4$
- $V_{\text{biogas}} = 6,105.9 / 0.62 = 9,848.2\text{ Nm}^3\text{ Biogas}$
- $M_{\text{Bio-CNG}} = 6,105.9 \times 0.98 \times 0.717 \times 0.96 = 4,124.0\text{ kg Bio-CNG}$
- $E_{\text{elec}} = (6,105.9 \times 35.8 \times 0.35) / 3.6 = 21,250\text{ kWh}$

---

### Module 3: Vermicomposting & Vermiwash Nutrient Bioconversion

#### Model Parameters & Formulas:
- **Digestate Slurry Input ($M_{\text{digestate}}$)**: Liquid + solid effluent after AD extraction $\approx 92\%$ of fresh feedstock weight.
- **Solid Separation Cake**: Dewatering to $30\%$ solids yields feed bed for *Eisenia fetida*.
- **Vermicompost Yield ($M_{\text{vermicompost}}$)**:
  $$M_{\text{vermicompost}} (t) = M_{\text{fresh, rec}} (t) \times 0.0237 \implies 407.24 \times 0.0237 = 9.65\text{ tonnes}$$
- **Liquid Vermiwash Extraction ($V_{\text{vermiwash}}$)**:
  $$V_{\text{vermiwash}} (L) = M_{\text{fresh, rec}} (t) \times 86.7\text{ L/t} \implies 407.24 \times 86.7 = 35,308\text{ Liters}$$
- **Nutrient Partitioning (Modeled / Literature-Based)**:
  - Total Nitrogen ($N$): $2.1\% \implies 9,650\text{ kg} \times 0.021 = 202.6\text{ kg N}$
  - Available Phosphorus ($P_2O_5$): $1.4\% \implies 9,650\text{ kg} \times 0.014 = 135.1\text{ kg P}$
  - Potassium ($K_2O$): $1.8\% \implies 9,650\text{ kg} \times 0.018 = 173.7\text{ kg K}$

*Note: All nutrient outputs are explicitly displayed in the UI as "MODELED / LITERATURE-BASED" until laboratory Kjeldahl / ICP-OES sample assays are uploaded.*

---

### Module 4: Environmental LCA & Net Carbon Accounting

#### IPCC Tier-2 Net Carbon Balance:
$$\text{Net GHG Benefit} (\text{kg CO}_2\text{e}) = \text{Gross Avoided Emissions} - \text{Project Lifecycle Emissions}$$

$$\begin{aligned}
\text{Gross Avoided} &= E_{\text{avoided, riverbed CH4}} + E_{\text{displaced, fossil fuel}} + E_{\text{displaced, grid elec}} + E_{\text{displaced, synthetic fertilizer}} \\
\text{Project Emissions} &= E_{\text{harvesting, diesel}} + E_{\text{transport, diesel}} + E_{\text{plant processing, parasitic}}
\end{aligned}$$

#### Emission Factors & Coefficients:
1. **Riverbed Methane Avoidance**:
   $$E_{\text{avoided, riverbed CH4}} = M_{\text{TS}} (kg) \times 0.082\text{ kg CH}_4/\text{kg TS} \times 28.0\text{ kg CO}_2\text{e}/\text{kg CH}_4$$
   - For $36.65\text{ t TS}$ ($36,650\text{ kg}$): $36,650 \times 0.082 \times 28 = 84,148\text{ kg CO}_2\text{e}$
2. **Fossil Fuel Displacement (Bio-CNG vs Diesel)**:
   $$E_{\text{displaced, fuel}} = M_{\text{Bio-CNG}} (kg) \times 2.75\text{ kg CO}_2\text{e/kg} = 4,124 \times 2.75 = 11,341\text{ kg CO}_2\text{e}$$
3. **Grid Electricity Displacement**:
   $$E_{\text{displaced, grid}} = E_{\text{elec}} (kWh) \times 0.82\text{ kg CO}_2\text{e/kWh (CEA India Grid Factor)} = 21,250 \times 0.82 = 17,425\text{ kg CO}_2\text{e}$$
4. **Fertilizer Offset**:
   $$E_{\text{displaced, fert}} = (M_N \times 3.0 + M_P \times 1.5 + M_K \times 1.0) = (202.6 \times 3.0 + 135.1 \times 1.5 + 173.7 \times 1.0) = 984\text{ kg CO}_2\text{e}$$
5. **Gross Avoidance**: $84,148 + 11,341 + 17,425 + 984 = 113,898\text{ kg CO}_2\text{e}$
6. **Project Emissions**:
   - Harvesting diesel: $407.24\text{ t} \times 3.2\text{ L/t} \times 2.68\text{ kg CO}_2\text{e/L} = 3,492\text{ kg CO}_2\text{e}$
   - Transport diesel: $407.24\text{ t} \times 15\text{ km} \times 0.045\text{ L/t-km} \times 2.68\text{ kg CO}_2\text{e/L} = 737\text{ kg CO}_2\text{e}$
   - Parasitic plant processing: $1,250\text{ kg CO}_2\text{e}$
   - Total Project Emissions: $5,479\text{ kg CO}_2\text{e}$
7. **Net GHG Benefit**: $113,898 - 5,479 = 108,419\text{ kg CO}_2\text{e}$ ($108.4\text{ t CO}_2\text{e}$)

---

### Module 5: River Organic Load & BOD Removal Model

#### Scientific Basis & Definition:
- Water hyacinth mats prevent sunlight penetration and, upon senescing, sink to the benthic layer where bacterial decomposition exerts high Biochemical Oxygen Demand (BOD).
- **Avoided Benthic BOD Load ($L_{\text{BOD, avoided}}$)**:
  $$L_{\text{BOD, avoided}} (kg) = M_{\text{VS, removed}} (kg) \times f_{\text{BOD/VS}}$$
  - Organic degradation coefficient $f_{\text{BOD/VS}} = 0.243\text{ kg BOD}_5 / \text{kg VS}$
  - For $29,320\text{ kg VS}$ removed: $29,320 \times 0.243 = 7,125\text{ kg BOD load reduction}$.
- **Scientific Caveat**: This metric represents **prevented organic decay load** at the watershed scale. It does not imply an instantaneous point-source drop in river-column BOD concentration without hydrodynamic routing.

---

### Module 6: Cascading Circular Economics

#### Financial Matrix:

| Revenue Stream | Unit Price | Yield Basis | Gross Revenue |
| :--- | :--- | :--- | :--- |
| **Bio-CNG Offtake** | \u20b9$72.0\text{ / kg}$ | $4,124\text{ kg}$ | \u20b9$296,928$ |
| **Vermicompost** | \u20b9$8.5\text{ / kg}$ | $9,650\text{ kg}$ | \u20b9$82,025$ |
| **Liquid Vermiwash** | \u20b9$35.0\text{ / L}$ | $35,308\text{ L}$ | \u20b9$1,235,780$ |
| **Carbon Credits** | \u20b9$1,200\text{ / t CO}_2\text{e}$ | $108.4\text{ t CO}_2\text{e}$ | \u20b9$130,080$ |
| **Gross Total Revenue** | | | **\u20b91,744,813 (\u20b917.45 Lakh)** |

#### OPEX & CAPEX Structure:
- **Harvesting & Skimmer Operation**: \u20b9$1,200\text{ / tonne} \times 407.24\text{ t} = \text{\u20b9}488,688$
- **Transport & Logistics**: \u20b9$450\text{ / tonne} \times 407.24\text{ t} = \text{\u20b9}183,258$
- **Anaerobic Digester & Vermicompost OPEX**: \u20b9$380,000$
- **Total Annual OPEX**: **\u20b91,051,946 (\u20b910.52 Lakh)**
- **Net Operating Margin**: $\text{\u20b9}17.45 - \text{\u20b9}10.52 = \text{\u20b9}6.93\text{ Lakh}$
- **Allocated Modular CAPEX**: \u20b9$9,500,000$ (Shared across 10 annual cycles $\implies \text{\u20b9}950,000\text{ / cycle}$)
- **Simple Payback Period**: $\text{CAPEX} / \text{Annual Net Margin} = 1.37\text{ years}$.

---

### Module 7: Multi-Pillar Circularity Index (5 Pillars)

$$\text{Circularity Score} = \sum_{i=1}^5 w_i \cdot S_i \in [0, 100]$$

| Pillar | Sub-Index ($S_i$) | Weight ($w_i$) | Formula & Boundary |
| :--- | :--- | :--- | :--- |
| **Biomass Valorization** | $S_1$ | $25\%$ | $\min(100, (\text{Valorized VS} / \text{Harvested VS}) \times 100)$ |
| **Energy Self-Sufficiency** | $S_2$ | $20\%$ | $\min(100, (\text{Generated Energy} / \text{Parasitic Demand}) \times 50)$ |
| **Nutrient Cycling** | $S_3$ | $20\%$ | $\min(100, (\text{Recovered NPK} / \text{Theoretical In-Situ NPK}) \times 100)$ |
| **Water Quality & Ecosystem** | $S_4$ | $20\%$ | Scaled BOD & DO restoration score $(0 - 100)$ |
| **Economic Self-Reliance** | $S_5$ | $15\%$ | $\min(100, (\text{Annual Revenue} / \text{Annual OPEX}) \times 50)$ |

---

## 4. Edge Case & Failure Mode Specifications

1. **Zero Biomass Input ($M_{\text{fresh}} = 0$)**:
   - Yields $0\text{ TS}$, $0\text{ VS}$, $0\text{ Biogas}$, $0\text{ Revenue}$, $0\text{ Emissions}$.
   - Pipeline returns valid JSON with zero values, preventing division-by-zero (`ZeroDivisionError`) or NaN/Infinity outputs.
2. **100% Moisture ($f_{\text{TS}} = 0$)**:
   - Yields $0\text{ TS}$, triggers descriptive biological warning: `Feedstock Total Solids below methanogenic threshold (min 2%)`.
3. **Zero Volatile Solids ($f_{\text{VS}} = 0$)**:
   - Zero biogas generation, 100% inert mineral matter routed to soil conditioning.
4. **Cloud Cover > Threshold ($> 40\%$) in Satellite Assessment**:
   - Optical scene flagged as `DEGRADED / CLOUD_OBSCURED`. System reverts to multi-temporal synthetic baseline or SAR microwave prompt.

---

## 5. Peer-Reviewed Citations & Reference Standards

1. **Gunnarsson, C. C., & Petersen, C. M. (2007).** Water hyacinths as a resource in agriculture and energy production: A literature review. *Waste Management*, 27(1), 117-129.
2. **Kumar, S., & Ghosh, P. C. (2019).** Biomethane potential of water hyacinth: Influence of feed-to-inoculum ratio and pretreatment. *Bioresource Technology*, 293, 122045.
3. **Gupta, R., & Garg, V. K. (2008).** Stabilization of primary water treatment plant sludge using Eisenia fetida. *Bioresource Technology*, 99(6), 1678-1683.
4. **IPCC (2019).** 2019 Refinement to the 2006 IPCC Guidelines for National Greenhouse Gas Inventories: Wetlands.
5. **Ministry of Petroleum and Natural Gas (MoPNG) (2024).** Sustainable Alternative Towards Affordable Transportation (SATAT) Policy Guidelines & Commercial Offtake Matrix.
6. **Bureau of Indian Standards (BIS).** IS 16087: Biogas (Biomethane) — Specification for Automotive and Piped Network Applications.
