from fastapi import APIRouter
from app.schemas.economics import EconomicCalculationRequest, EconomicMetricResponse
from app.core.economic_engine import calculate_economic_viability

router = APIRouter(prefix="/economics", tags=["Economic Intelligence"])

@router.post("/calculate", response_model=EconomicMetricResponse)
def calculate_economic_model(req: EconomicCalculationRequest):
    result = calculate_economic_viability(
        fresh_biomass_t=req.fresh_biomass_t,
        bio_cng_kg=req.bio_cng_kg,
        vermicompost_t=req.vermicompost_t,
        vermiwash_liters=req.vermiwash_liters,
        harvesting_cost_per_ton=req.harvesting_cost_per_ton,
        transport_cost_per_ton=req.transport_cost_per_ton,
        processing_opex_per_ton=req.processing_opex_per_ton,
        bio_cng_price_per_kg=req.bio_cng_price_per_kg,
        vermicompost_price_per_kg=req.vermicompost_price_per_kg,
        vermiwash_price_per_liter=req.vermiwash_price_per_liter,
        carbon_credit_price_per_ton_co2e=req.carbon_credit_price_per_ton_co2e
    )
    result["is_demo_data"] = 1
    return result

@router.get("/baseline", response_model=EconomicMetricResponse)
def get_baseline_economic_model():
    result = calculate_economic_viability(
        fresh_biomass_t=1170.4,
        bio_cng_kg=16840.0,
        vermicompost_t=23.7,
        vermiwash_liters=14000.0
    )
    result["is_demo_data"] = 1
    return result
