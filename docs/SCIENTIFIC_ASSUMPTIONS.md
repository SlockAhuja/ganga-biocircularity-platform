# BioRiver — Comprehensive Scientific Assumptions & Parameter Registry

This document records every scientific conversion factor, stoichiometric assumption, limnological reference threshold, and economic unit price used in the BioRiver calculations.

---

## 1. Biomass Quantification & Proximate Composition

| Factor Name | Code / Identifier | Baseline Value | Standard Unit | Scientific Basis & Literature Source | Limitations & Application Conditions |
|---|---|---|---|---|---|
| **Moisture Fraction** | `MOISTURE_PCT` | `91.0` | `%` wet weight | Oven drying at 105°C (Gunnarsson & Petersen, 2007) | Fluctuates between 90.5% - 93.5% based on seasonal temperature and rainfall. |
| **Total Solids (TS)** | `TOTAL_SOLIDS_PCT` | `9.0` | `%` fresh biomass | Calculated as $100\% - \text{Moisture}$ | Represents dry matter fraction available for processing. |
| **Volatile Solids (VS)** | `VOLATILE_SOLIDS_PCT` | `80.0` | `%` of Total Solids | Loss on Ignition at 550°C in muffle furnace | Represents biodegradable organic fraction digestible by methanogens. |
| **Fresh Density (Low)** | `DENSITY_LOW` | `8.0` | $\text{tonnes / ha}$ | In-situ quadrat sampling of sparse fringe growth | Visual coverage $< 40\%$. |
| **Fresh Density (Medium)** | `DENSITY_MED` | `18.0` | $\text{tonnes / ha}$ | Moderate open channel mats | Visual coverage $40\% - 70\%$. |
| **Fresh Density (High)** | `DENSITY_HIGH` | `32.0` | $\text{tonnes / ha}$ | Thick multi-layered mats in stagnation embayments | Visual coverage $70\% - 90\%$. |
| **Fresh Density (Very High)** | `DENSITY_VHIGH` | `48.0` | $\text{tonnes / ha}$ | Dense compacted root mats near barrage channels | Visual coverage $> 90\%$. |
| **Mechanical Collection Efficiency** | `COLLECTION_EFF_PCT` | `85.0` | `%` | Amphibious aquatic harvester with trailing boom | Losses occur around shallow riverbanks and boulder structures. |

---

## 2. Anaerobic Digestion & Bio-CNG Upgrading

| Factor Name | Code / Identifier | Baseline Value | Standard Unit | Scientific Basis & Literature Source | Limitations & Application Conditions |
|---|---|---|---|---|---|
| **Biochemical Methane Potential** | `BMP_DEFAULT` | `245.0` | $\text{mL CH}_4 / \text{g VS}$ | Mesophilic batch biochemical methane potential assay ($37^\circ\text{C}$, 30 days) (Kumar & Ghosh, 2019) | Co-digestion with cow dung or press mud can increase yield to $280-310\text{ mL/g VS}$. |
| **Raw Biogas Methane Content** | `CH4_FRACTION_RAW` | `62.0` | `%` by volume | Gas chromatography TCD analysis | Remainder is predominantly $\text{CO}_2$ ($36\%$) and trace $\text{H}_2\text{S}$. |
| **Digestion Process Efficiency** | `DIGESTION_EFF_PCT` | `88.0` | `%` | Continuous Stirred Tank Reactor (CSTR) performance at 25-day HRT | Requires thermal jacket in North Indian winter months ($<15^\circ\text{C}$). |
| **Bio-CNG Methane Purity** | `BIOCNG_PURITY_PCT` | `96.0` | `%` $\text{CH}_4$ | Indian Standard **IS 16087** for commercial automotive compressed biomethane | Achieved via water scrubbing or PSA membrane upgrading. |
| **Bio-CNG Density** | `BIOCNG_DENSITY` | `0.717` | $\text{kg / m}^3$ | NTP physical property of purified biomethane | Used to convert gas volume ($\text{m}^3$) into cylinder mass ($\text{kg}$). |
| **Specific Calorific Value** | `LHV_METHANE` | `35.8` | $\text{MJ / m}^3$ | Lower heating value of pure methane | Energy calculations benchmark. |
| **Electrical Conversion Efficiency** | `GENSET_ELEC_EFF` | `35.0` | `%` | Standard industrial CHP gas generator electrical efficiency | Remaining $50\%$ recoverable as thermal heat. |

---

## 3. Vermicomposting & Nutrient Upcycling

| Factor Name | Code / Identifier | Baseline Value | Standard Unit | Scientific Basis & Literature Source | Limitations & Application Conditions |
|---|---|---|---|---|---|
| **Digestate Slurry Yield** | `DIGESTATE_YIELD_PCT` | `85.0` | `%` of fresh input | Mass balance post-biogas degassing | High liquid fraction requires screw-press dewatering. |
| **Vermicompost Yield Factor** | `COMPOST_YIELD_FACTOR` | `23.7` | $\text{tonnes / 1000 t fresh}$ | Solid cake conversion with *Eisenia fetida* earthworms (Gupta & Garg, 2008) | Moisture content stabilized at $25-30\%$. |
| **Nitrogen Content (N)** | `NPK_NITROGEN_PCT` | `2.1` | `%` dry weight | Kjeldahl total nitrogen analysis | Fully compliant with FCO 1985 ($>1.0\%$). |
| **Phosphorus Content ($\text{P}_2\text{O}_5$)** | `NPK_PHOSPHORUS_PCT` | `1.4` | `%` dry weight | Colorimetric spectrophotometry | Fully compliant with FCO 1985 ($>0.5\%$). |
| **Potassium Content ($\text{K}_2\text{O}$)** | `NPK_POTASSIUM_PCT` | `1.8` | `%` dry weight | Flame photometry | High potassium bioaccumulated by hyacinth petioles. |
| **Liquid Vermiwash Extraction** | `VERMIWASH_YIELD` | `14,000` | $\text{Liters / 1000 t fresh}$ | Earthworm bed drainage leachate collection | Requires 1:10 dilution before foliar crop spray. |

---

## 4. Environmental LCA Emission Factors

| Factor Name | Code / Identifier | Baseline Value | Standard Unit | Scientific Basis & Literature Source | Limitations & Application Conditions |
|---|---|---|---|---|---|
| **Wetland Decay Methane Factor** | `EMISSION_DECAY_CH4` | `0.082` | $\text{kg CH}_4 / \text{kg dry solids}$ | IPCC (2019) Refinement: Waste & Wetlands Decomposition | Applies to weed dying and decaying in anaerobic riverbed sediment. |
| **Methane Global Warming Potential** | `GWP_METHANE_100` | `28.0` | $\text{kg CO}_2\text{e} / \text{kg CH}_4$ | IPCC 6th Assessment Report (AR6) 100-year timescale | 20-year GWP is $84.0$, making near-term benefits even larger. |
| **Fossil Fuel Displacement Factor** | `EMISSION_OFFSET_CNG` | `2.75` | $\text{kg CO}_2\text{e} / \text{kg Bio-CNG}$ | Commercial diesel / fossil CNG lifecycle replacement benchmark | Avoids crude extraction, transport, and combustion emissions. |
| **Indian Grid Power Emission Factor** | `EMISSION_OFFSET_GRID` | `0.716` | $\text{kg CO}_2\text{e} / \text{kWh}$ | Central Electricity Authority (CEA) National Grid Baseline 2023 | Weighted average of national coal-dominant generation mix. |
| **BOD Load Abatement Factor** | `BOD_OFFSET_PER_HA` | `185.0` | $\text{kg BOD / ha cleared}$ | CPCB surface water oxygenation model | Mitigates local fish asphyxiation risk in stagnation reaches. |

---

## 5. Economic & Financial Market Benchmarks

| Factor Name | Code / Identifier | Baseline Value | Standard Unit | Commercial Basis & Market Source | Limitations & Applicability |
|---|---|---|---|---|---|
| **Bio-CNG Retail Benchmark** | `PRICE_BIOCNG_KG` | `72.00` | $\text{INR / kg}$ | SATAT Sustainable Alternative Towards Affordable Transportation price | Wholesale commercial offtake by Oil Marketing Companies (OMCs). |
| **Enriched Vermicompost Price** | `PRICE_COMPOST_TONNE` | `8,500` | $\text{INR / tonne}$ | Uttar Pradesh State Organic Agriculture Board bulk rate | Sold in 50 kg branded packaging for horticulture & organic farming. |
| **Liquid Vermiwash Price** | `PRICE_VERMIWASH_LITER` | `25.00` | $\text{INR / Liter}$ | Organic bio-stimulant retail market in North India | High margin product sold in 1L / 5L bottles. |
| **Mineralized Centrate Fertigation** | `PRICE_DIGESTATE_LITER` | `0.50` | $\text{INR / Liter}$ | Local agricultural bulk tanker delivery | Sold to nearby peri-urban guava and mustard farmers. |
| **Harvesting Logistics Cost** | `OPEX_HARVEST_TONNE` | `420.00` | $\text{INR / tonne fresh}$ | Mechanical harvester fuel, boat operator labor & maintenance | Distance to bank $< 500\text{ m}$. |
| **Barge Transport Cost** | `OPEX_TRANSPORT_TONNE`| `180.00` | $\text{INR / tonne fresh}$ | Transport from riverbank transfer station to Naini bioreactor | Radius $\le 12\text{ km}$. |
