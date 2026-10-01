from typing import Dict, Any

def calculate_environmental_impact(
    fresh_biomass_t: float,
    area_cleared_ha: float,
    bio_cng_kg: float,
    electricity_kwh: float,
    vermicompost_t: float
) -> Dict[str, Any]:
    """
    Environmental Life Cycle Assessment (LCA) Tier-2 style calculations:
    - GHG Avoidance:
      1. Avoided anaerobic riverbed decomposition methane emissions (64.2 kg CO2e / t fresh)
      2. Fossil fuel CNG displacement (2.75 kg CO2e / kg Bio-CNG)
      3. Grid electricity displacement (0.82 kg CO2e / kWh)
    - BOD & COD pollution load reduction in river:
      ~185 kg BOD prevented per hectare cleared
    - Nutrient circular recycling (NPK):
      Derived from organic vermicompost output
    """
    ghg_avoided_decay = fresh_biomass_t * 64.2
    ghg_avoided_cng = bio_cng_kg * 2.75
    ghg_avoided_grid = electricity_kwh * 0.82
    total_ghg_co2e = ghg_avoided_decay + ghg_avoided_cng + ghg_avoided_grid
    
    bod_reduction_kg = area_cleared_ha * 185.0
    
    nitrogen_kg = vermicompost_t * 1000.0 * 0.021
    phosphorus_kg = vermicompost_t * 1000.0 * 0.014
    potassium_kg = vermicompost_t * 1000.0 * 0.018
    
    return {
        "assessment_name": "LCA Environmental Impact Model",
        "ghg_avoidance_kg_co2e": round(total_ghg_co2e, 1),
        "waste_diverted_t": round(fresh_biomass_t, 2),
        "water_bod_reduction_kg": round(bod_reduction_kg, 1),
        "fossil_fuel_offset_kg_cng": round(bio_cng_kg, 2),
        "grid_power_offset_kwh": round(electricity_kwh, 1),
        "nitrogen_recycled_kg": round(nitrogen_kg, 1),
        "phosphorus_recycled_kg": round(phosphorus_kg, 1),
        "potassium_recycled_kg": round(potassium_kg, 1),
        "river_surface_cleared_ha": round(area_cleared_ha, 2),
        "methodology_version": "v1.1-LCA-Tier2-IPCC"
    }
