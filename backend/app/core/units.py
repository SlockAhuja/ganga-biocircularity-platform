"""
BioRiver Unit Normalization and Conversion Engine
Provides authoritative, single-source scientific unit conversions across GIS, biomass, bioenergy, nutrients, carbon, and finance.
"""

def m2_to_ha(m2: float) -> float:
    return m2 / 10000.0

def ha_to_m2(ha: float) -> float:
    return ha * 10000.0

def ha_to_km2(ha: float) -> float:
    return ha / 100.0

def km2_to_ha(km2: float) -> float:
    return km2 * 100.0

def kg_to_tonnes(kg: float) -> float:
    return kg / 1000.0

def tonnes_to_kg(tonnes: float) -> float:
    return tonnes * 1000.0

def m3_to_liters(m3: float) -> float:
    return m3 * 1000.0

def liters_to_m3(liters: float) -> float:
    return liters / 1000.0

def kwh_to_mj(kwh: float) -> float:
    return kwh * 3.6

def mj_to_kwh(mj: float) -> float:
    return mj / 3.6

def bmp_ml_g_to_m3_t(bmp_ml_g_vs: float) -> float:
    """
    1 mL CH4 / g VS = 1 L CH4 / kg VS = 1 m3 CH4 / tonne VS
    """
    return bmp_ml_g_vs

def biocng_volume_m3_to_mass_kg(volume_m3: float, density_kg_m3: float = 0.717, purity: float = 1.0) -> float:
    """
    Converts purified methane volume (m3 at standard NTP) to cylinder mass (kg).
    Default standard methane density = 0.717 kg/m3.
    """
    return volume_m3 * density_kg_m3 * purity

def lakhs_to_inr(lakhs: float) -> float:
    return lakhs * 100000.0

def inr_to_lakhs(inr: float) -> float:
    return inr / 100000.0

def crores_to_inr(crores: float) -> float:
    return crores * 10000000.0

def inr_to_crores(inr: float) -> float:
    return inr / 10000000.0

