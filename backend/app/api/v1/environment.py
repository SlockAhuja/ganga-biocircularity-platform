from fastapi import APIRouter
from app.schemas.circularity import EnvironmentalImpactResponse
from app.core.environmental_engine import calculate_environmental_impact

router = APIRouter(prefix="/environment", tags=["Environmental Impact"])

@router.get("/impact", response_model=EnvironmentalImpactResponse)
def get_environmental_impact(
    fresh_biomass_t: float = 1170.4,
    area_cleared_ha: float = 38.6,
    bio_cng_kg: float = 16840.0,
    electricity_kwh: float = 56000.0,
    vermicompost_t: float = 23.7
):
    result = calculate_environmental_impact(
        fresh_biomass_t=fresh_biomass_t,
        area_cleared_ha=area_cleared_ha,
        bio_cng_kg=bio_cng_kg,
        electricity_kwh=electricity_kwh,
        vermicompost_t=vermicompost_t
    )
    result["is_demo_data"] = 1
    return result
