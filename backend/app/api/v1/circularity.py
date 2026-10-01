from fastapi import APIRouter
from app.schemas.circularity import CircularityScoreResponse
from app.core.circularity_engine import calculate_circularity_score

router = APIRouter(prefix="/circularity", tags=["Circularity Intelligence"])

@router.get("/score", response_model=CircularityScoreResponse)
def get_circularity_score_overview(
    biomass_harvested_t: float = 950.0,
    biomass_available_t: float = 1170.4,
    bio_cng_produced_kg: float = 16840.0,
    vermicompost_produced_t: float = 23.7,
    digestate_reutilized_t: float = 780.0,
    total_digestate_t: float = 850.0
):
    result = calculate_circularity_score(
        biomass_harvested_t=biomass_harvested_t,
        biomass_available_t=biomass_available_t,
        bio_cng_produced_kg=bio_cng_produced_kg,
        vermicompost_produced_t=vermicompost_produced_t,
        digestate_reutilized_t=digestate_reutilized_t,
        total_digestate_t=total_digestate_t
    )
    result["is_demo_data"] = 1
    return result
