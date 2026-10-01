from typing import Dict, Any

SCENARIO_CONFIGS = {
    "Conservative": {
        "bmp": 0.22,           # m3 CH4 / kg VS
        "methane_fraction": 0.58,
        "efficiency": 0.75,
        "cng_purification": 0.90,
        "vermi_yield_solids": 0.35
    },
    "Baseline": {
        "bmp": 0.28,           # m3 CH4 / kg VS
        "methane_fraction": 0.62,
        "efficiency": 0.85,
        "cng_purification": 0.95,
        "vermi_yield_solids": 0.45
    },
    "Optimistic": {
        "bmp": 0.34,           # m3 CH4 / kg VS (with enzymatic / hydrothermal pre-treatment)
        "methane_fraction": 0.65,
        "efficiency": 0.92,
        "cng_purification": 0.97,
        "vermi_yield_solids": 0.55
    }
}

def calculate_bioenergy_and_products(
    biomass_input_t: float,
    moisture_pct: float = 91.0,
    total_solids_pct: float = 9.0,
    volatile_solids_pct: float = 80.0,
    utilization_pct: float = 85.0,
    scenario_type: str = "Baseline",
    bmp_override: float = None
) -> Dict[str, Any]:
    """
    Bioenergy and circular byproduct modeling:
    - TS = Biomass * (Total Solids % / 100) * (Utilization % / 100)
    - VS = TS * (Volatile Solids % / 100) * 1000 (kg VS)
    - Methane Volume (m3) = VS (kg) * BMP (m3/kg VS) * Efficiency
    - Biogas Volume (m3) = Methane Volume / Methane Fraction
    - Bio-CNG (kg) = Methane Volume * 0.72 kg/m3 * Purification %
    - Electrical Output (kWh) = Methane Volume * 35.8 MJ/m3 / 3.6 MJ/kWh * Electrical Eff (35%)
    - Digestate Output = Biomass * 0.85 (liquids + non-degraded solids)
    - Vermicompost = Digestate solids * Vermi yield factor
    """
    params = SCENARIO_CONFIGS.get(scenario_type, SCENARIO_CONFIGS["Baseline"])
    bmp = bmp_override if bmp_override is not None else params["bmp"]
    ch4_fraction = params["methane_fraction"]
    efficiency = params["efficiency"]
    cng_purity = params["cng_purification"]
    vermi_yield = params["vermi_yield_solids"]

    # Solids calculation
    effective_biomass_t = biomass_input_t * (utilization_pct / 100.0)
    total_solids_t = effective_biomass_t * (total_solids_pct / 100.0)
    volatile_solids_kg = total_solids_t * (volatile_solids_pct / 100.0) * 1000.0

    # Gas yields
    methane_volume_m3 = volatile_solids_kg * bmp * efficiency
    biogas_volume_m3 = methane_volume_m3 / ch4_fraction if ch4_fraction > 0 else 0.0

    # Bio-CNG (compressed methane ~0.72 kg/m3 standard)
    bio_cng_kg = methane_volume_m3 * 0.717 * cng_purity

    # Energy
    thermal_energy_mj = methane_volume_m3 * 35.8
    electrical_energy_kwh = (thermal_energy_mj / 3.6) * 0.35
    lpg_equivalent_kg = bio_cng_kg * 0.90

    # Digestate and vermicompost
    digestate_total_t = effective_biomass_t * 0.85
    digestate_solids_t = total_solids_t * 0.50 # remainder unconsumed solids
    vermicompost_potential_t = round(digestate_solids_t * vermi_yield, 2)
    liquid_vermiwash_liters = round(digestate_total_t * 120.0, 1)

    # Nutrients in fertilizer
    nitrogen_kg = round(vermicompost_potential_t * 1000.0 * 0.021, 2) # 2.1% N
    phosphorus_kg = round(vermicompost_potential_t * 1000.0 * 0.014, 2) # 1.4% P
    potassium_kg = round(vermicompost_potential_t * 1000.0 * 0.018, 2) # 1.8% K

    return {
        "assessment_code": f"BIO-SIM-{scenario_type.upper()}",
        "scenario_type": scenario_type,
        "biomass_input_t": round(biomass_input_t, 2),
        "biogas_volume_m3": round(biogas_volume_m3, 2),
        "methane_volume_m3": round(methane_volume_m3, 2),
        "bio_cng_potential_kg": round(bio_cng_kg, 2),
        "electrical_energy_kwh": round(electrical_energy_kwh, 2),
        "thermal_energy_mj": round(thermal_energy_mj, 2),
        "lpg_equivalent_kg": round(lpg_equivalent_kg, 2),
        "digestate_total_t": round(digestate_total_t, 2),
        "vermicompost_potential_t": vermicompost_potential_t,
        "liquid_vermiwash_liters": liquid_vermiwash_liters,
        "nitrogen_recovery_kg": nitrogen_kg,
        "phosphorus_recovery_kg": phosphorus_kg,
        "potassium_recovery_kg": potassium_kg,
        "methodology_version": "v1.4-AD-Biogas-CSTR"
    }
