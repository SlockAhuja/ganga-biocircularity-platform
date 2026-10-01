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
    Scientific biomass quantification based on allometric area and proximate composition.
    Formula:
    Fresh Biomass (t) = Area (ha) * (Coverage % / 100) * Fresh Yield Density (t/ha)
    Dry Biomass / Total Solids (t) = Fresh Biomass * (Total Solids % / 100)
    Volatile Solids (t) = Total Solids (t) * (Volatile Solids % / 100)
    Recoverable Biomass (t) = Fresh Biomass (t) * (Collection Efficiency % / 100)
    """
    density_t_ha = DENSITY_MAP.get(density_class, 32.0)
    effective_area_ha = area_ha * (coverage_pct / 100.0)
    fresh_biomass_total_t = round(effective_area_ha * density_t_ha, 2)
    
    # Dry matter
    dry_solids_t = round(fresh_biomass_total_t * (total_solids_pct / 100.0), 2)
    volatile_solids_t = round(dry_solids_t * (volatile_solids_pct / 100.0), 2)
    recoverable_biomass_t = round(fresh_biomass_total_t * (collection_efficiency_pct / 100.0), 2)
    
    carbon_to_nitrogen = 24.5 # Ideal range for anaerobic digestion with water hyacinth
    
    return {
        "area_ha": round(area_ha, 3),
        "coverage_pct": coverage_pct,
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
        "methodology_version": "v1.2-Allometric-TS-VS"
    }
