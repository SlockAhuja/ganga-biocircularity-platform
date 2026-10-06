"""
BioRiver Allometric Biomass Quantification Engine
Computes fresh biomass, dry matter (Total Solids), Volatile Solids (VS), and recoverable feedstock.
Strictly follows dimensional consistency:
Fresh Biomass (t) = Area (ha) * Coverage Fraction * Fresh Biomass Density (t/ha)
where Coverage Fraction = Coverage Percent / 100.
"""
from typing import Dict, Any

DENSITY_MAP = {
    "Low": 17.0,      # tonnes/ha fresh
    "Moderate": 24.0, # tonnes/ha fresh
    "High": 32.0,     # tonnes/ha fresh
    "Very High": 35.0 # tonnes/ha fresh
}

def calculate_biomass_quantification(
    area_ha: float,
    coverage_pct: float = 80.0,
    density_class: str = "High",
    moisture_pct: float = 91.0,
    total_solids_pct: float = 9.0,
    volatile_solids_pct: float = 80.0,
    collection_efficiency_pct: float = 85.0
) -> Dict[str, Any]:
    """
    Dimensional consistency & Allometric weed quantification:
    - coverage_fraction = coverage_pct / 100.0 (dimensionless, 0.0 - 1.0)
    - effective_area_ha = area_ha * coverage_fraction (ha)
    - fresh_biomass_total_t = effective_area_ha * density_t_ha (tonnes)
    - total_solids_t = fresh_biomass_total_t * (total_solids_pct / 100.0) (tonnes TS)
    - volatile_solids_t = total_solids_t * (volatile_solids_pct / 100.0) (tonnes VS)
    - recoverable_biomass_t = fresh_biomass_total_t * (collection_efficiency_pct / 100.0) (tonnes)
    """
    density_t_ha = DENSITY_MAP.get(density_class, 32.0)
    coverage_fraction = coverage_pct / 100.0
    effective_area_ha = area_ha * coverage_fraction
    fresh_biomass_total_t = round(effective_area_ha * density_t_ha, 2)
    
    # Dry matter and organic volatile solids
    dry_solids_t = round(fresh_biomass_total_t * (total_solids_pct / 100.0), 2)
    volatile_solids_t = round(dry_solids_t * (volatile_solids_pct / 100.0), 2)
    recoverable_biomass_t = round(fresh_biomass_total_t * (collection_efficiency_pct / 100.0), 2)
    
    carbon_to_nitrogen = 24.5 # Optimal C:N stoichiometry for methanogenic digestion
    
    return {
        "area_ha": round(area_ha, 3),
        "coverage_pct": coverage_pct,
        "coverage_fraction": round(coverage_fraction, 4),
        "effective_water_coverage_ha": round(effective_area_ha, 3),
        "fresh_biomass_density_t_ha": density_t_ha,
        "fresh_biomass_total_t": fresh_biomass_total_t,
        "moisture_content_pct": moisture_pct,
        "total_solids_pct": total_solids_pct,
        "total_solids_t": dry_solids_t,
        "volatile_solids_pct_of_ts": volatile_solids_pct,
        "volatile_solids_t": volatile_solids_t,
        "carbon_to_nitrogen_ratio": carbon_to_nitrogen,
        "recoverable_biomass_t": recoverable_biomass_t,
        "collection_efficiency_pct": collection_efficiency_pct,
        "classification": "ESTIMATED",
        "provenance_status": "SCIENTIFICALLY TRACEABLE",
        "methodology_version": "v1.3-Allometric-TS-VS-Dimensional"
    }
