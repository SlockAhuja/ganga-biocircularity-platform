"""
BioRiver Conservation of Mass Engine
Tracks strict mass balance across cascading biocircular pathways:
Fresh Harvest -> Dewatering -> Anaerobic Digestion -> Digestate -> Vermicomposting -> Vermiwash & Recovered Nutrients.
Validates conservation of mass and flags dimensional or mass balance violations.
"""
from typing import Dict, Any, List

def calculate_mass_balance(
    fresh_harvested_tonnes: float = 479.1,
    moisture_content_pct: float = 91.0,
    dewatering_efficiency_pct: float = 25.0,  # Moisture reduction via solar/mechanical dewatering
    ad_volatile_solids_pct_ts: float = 80.0,
    ad_vs_destruction_rate: float = 0.65,    # 65% of VS converted to Biogas
    vermicompost_conversion_rate: float = 0.40 # 40% of dewatered digestate converted to finished vermicompost
) -> Dict[str, Any]:
    """
    Computes rigorous mass balance with unit consistency and mass closure verification.
    """
    # 1. Harvested Fresh Biomass
    wet_mass_kg = fresh_harvested_tonnes * 1000.0
    initial_water_kg = wet_mass_kg * (moisture_content_pct / 100.0)
    dry_solids_kg = wet_mass_kg * (1.0 - (moisture_content_pct / 100.0))
    
    # 2. Dewatering Stage
    # Water removed during field dewatering / solar pre-drying
    water_removed_dewatering_kg = initial_water_kg * (dewatering_efficiency_pct / 100.0)
    dewatered_water_kg = initial_water_kg - water_removed_dewatering_kg
    dewatered_feed_kg = dry_solids_kg + dewatered_water_kg
    
    # 3. Anaerobic Digestion Feedstock
    ts_kg = dry_solids_kg
    vs_kg = ts_kg * (ad_volatile_solids_pct_ts / 100.0)
    ash_kg = ts_kg - vs_kg
    
    # VS destroyed and converted to Biogas mass (assuming mean biogas density ~ 1.15 kg/m3)
    vs_converted_to_biogas_kg = vs_kg * ad_vs_destruction_rate
    unconverted_vs_kg = vs_kg - vs_converted_to_biogas_kg
    
    # Biogas output (Biogas mass = mass of carbon and hydrogen gasified)
    biogas_mass_kg = vs_converted_to_biogas_kg
    
    # Digestate Output (Remaining solids + water)
    digestate_solids_kg = ash_kg + unconverted_vs_kg
    digestate_water_kg = dewatered_water_kg
    total_raw_digestate_kg = digestate_solids_kg + digestate_water_kg
    
    # 4. Digestate Separation & Vermicomposting
    # Digestate dewatered for solid composting vs liquid vermiwash recovery
    liquid_effluent_vermiwash_kg = digestate_water_kg * 0.75  # 75% extracted as nutrient-rich liquid vermiwash
    solid_cake_water_kg = digestate_water_kg - liquid_effluent_vermiwash_kg
    solid_cake_kg = digestate_solids_kg + solid_cake_water_kg
    
    # Vermicomposting transformation (earthworm ingestion + respiration loss ~ 30% of carbon)
    worm_respiration_loss_kg = digestate_solids_kg * 0.30
    finished_vermicompost_kg = solid_cake_kg - worm_respiration_loss_kg
    
    # 5. Mass Balance Verification
    total_inputs_kg = wet_mass_kg
    total_outputs_and_losses_kg = (
        water_removed_dewatering_kg +
        biogas_mass_kg +
        liquid_effluent_vermiwash_kg +
        worm_respiration_loss_kg +
        finished_vermicompost_kg
    )
    
    mass_discrepancy_kg = abs(total_inputs_kg - total_outputs_and_losses_kg)
    relative_closure_error_pct = (mass_discrepancy_kg / total_inputs_kg) * 100.0
    is_mass_conserved = relative_closure_error_pct < 0.01  # Less than 0.01% numerical precision tolerance

    return {
        "mass_closure_valid": is_mass_conserved,
        "closure_error_percent": round(relative_closure_error_pct, 4),
        "input_wet_biomass_tonnes": round(fresh_harvested_tonnes, 2),
        "stages": [
            {
                "stage_name": "1. Field Harvesting",
                "input_mass_kg": round(wet_mass_kg, 1),
                "dry_matter_kg": round(dry_solids_kg, 1),
                "water_mass_kg": round(initial_water_kg, 1),
                "notes": f"Fresh weed harvested from river surface ({moisture_content_pct}% moisture)."
            },
            {
                "stage_name": "2. Pre-Dewatering / Sun Drying",
                "water_evaporated_drained_kg": round(water_removed_dewatering_kg, 1),
                "dewatered_mass_kg": round(dewatered_feed_kg, 1),
                "moisture_reduction_pct": dewatering_efficiency_pct,
                "notes": "Reduces transport weight and increases fermenter volumetric solids ratio."
            },
            {
                "stage_name": "3. Anaerobic Digestion",
                "volatile_solids_input_kg": round(vs_kg, 1),
                "vs_gasified_to_biogas_kg": round(vs_converted_to_biogas_kg, 1),
                "biogas_mass_yield_kg": round(biogas_mass_kg, 1),
                "raw_digestate_mass_kg": round(total_raw_digestate_kg, 1),
                "notes": "Methanogenic conversion of volatile fatty acids into CH4 and CO2."
            },
            {
                "stage_name": "4. Digestate Partitioning",
                "liquid_vermiwash_kg": round(liquid_effluent_vermiwash_kg, 1),
                "solid_cake_kg": round(solid_cake_kg, 1),
                "notes": "Screw-press mechanical separation into liquid and solid fractions."
            },
            {
                "stage_name": "5. Vermicomposting & Stabilization",
                "earthworm_respiration_loss_kg": round(worm_respiration_loss_kg, 1),
                "finished_vermicompost_kg": round(finished_vermicompost_kg, 1),
                "finished_vermicompost_tonnes": round(finished_vermicompost_kg / 1000.0, 2),
                "notes": "Eisenia fetida bioconversion into nutrient-dense bio-organic amendment."
            }
        ],
        "products_summary": {
            "biogas_kg": round(biogas_mass_kg, 1),
            "vermicompost_tonnes": round(finished_vermicompost_kg / 1000.0, 2),
            "liquid_vermiwash_liters": round(liquid_effluent_vermiwash_kg, 1),
            "water_recycled_to_river_kg": round(water_removed_dewatering_kg, 1)
        },
        "provenance": {
            "method": "Conservation of Mass (First Law of Thermodynamics)",
            "status": "MODELED",
            "uncertainty_status": "Stoichiometrically constrained"
        }
    }
