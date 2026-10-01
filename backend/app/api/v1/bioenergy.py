from fastapi import APIRouter
from app.schemas.bioenergy import ResourceSimulatorRequest, BioenergyAssessmentResponse, ScenarioComparisonResponse
from app.core.bioenergy_engine import calculate_bioenergy_and_products

router = APIRouter(prefix="/bioenergy", tags=["Bioenergy & Resource Simulator"])

@router.post("/simulate", response_model=BioenergyAssessmentResponse)
def simulate_resource_conversion(req: ResourceSimulatorRequest):
    result = calculate_bioenergy_and_products(
        biomass_input_t=req.biomass_input_t,
        moisture_pct=req.moisture_content_pct,
        total_solids_pct=req.total_solids_pct,
        volatile_solids_pct=req.volatile_solids_pct,
        utilization_pct=req.utilization_pct,
        scenario_type=req.scenario_type,
        bmp_override=req.bmp_override
    )
    result["is_demo_data"] = 1
    return result

@router.post("/compare-scenarios", response_model=ScenarioComparisonResponse)
def compare_all_scenarios(req: ResourceSimulatorRequest):
    conservative = calculate_bioenergy_and_products(
        biomass_input_t=req.biomass_input_t,
        moisture_pct=req.moisture_content_pct,
        total_solids_pct=req.total_solids_pct,
        volatile_solids_pct=req.volatile_solids_pct,
        utilization_pct=req.utilization_pct,
        scenario_type="Conservative"
    )
    baseline = calculate_bioenergy_and_products(
        biomass_input_t=req.biomass_input_t,
        moisture_pct=req.moisture_content_pct,
        total_solids_pct=req.total_solids_pct,
        volatile_solids_pct=req.volatile_solids_pct,
        utilization_pct=req.utilization_pct,
        scenario_type="Baseline"
    )
    optimistic = calculate_bioenergy_and_products(
        biomass_input_t=req.biomass_input_t,
        moisture_pct=req.moisture_content_pct,
        total_solids_pct=req.total_solids_pct,
        volatile_solids_pct=req.volatile_solids_pct,
        utilization_pct=req.utilization_pct,
        scenario_type="Optimistic"
    )
    return {
        "conservative": conservative,
        "baseline": baseline,
        "optimistic": optimistic
    }
