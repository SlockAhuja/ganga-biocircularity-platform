from typing import List, Dict, Any
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.biomass import BiomassAssessment
from app.schemas.biomass import BiomassCalculationRequest, BiomassAssessmentResponse
from app.core.biomass_engine import calculate_biomass_quantification

router = APIRouter(prefix="/biomass", tags=["Biomass Intelligence"])

@router.get("/assessments", response_model=List[BiomassAssessmentResponse])
def get_biomass_assessments(db: Session = Depends(get_db)):
    assessments = db.query(BiomassAssessment).all()
    if not assessments:
        # Default baseline assessments across the 5 Prayagraj zones
        return [
            {
                "id": 1,
                "assessment_code": "BIO-HZ-01",
                "area_ha": 14.8,
                "coverage_pct": 92.5,
                "fresh_biomass_density_t_ha": 35.0,
                "fresh_biomass_total_t": 518.0,
                "moisture_content_pct": 91.0,
                "total_solids_pct": 9.0,
                "total_solids_t": 46.62,
                "volatile_solids_pct_of_ts": 80.0,
                "volatile_solids_t": 37.30,
                "carbon_to_nitrogen_ratio": 24.5,
                "recoverable_biomass_t": 440.3,
                "collection_efficiency_pct": 85.0,
                "methodology_version": "v1.2-Allometric-TS-VS",
                "is_demo_data": 1
            },
            {
                "id": 2,
                "assessment_code": "BIO-HZ-02",
                "area_ha": 9.4,
                "coverage_pct": 78.0,
                "fresh_biomass_density_t_ha": 32.0,
                "fresh_biomass_total_t": 282.0,
                "moisture_content_pct": 91.0,
                "total_solids_pct": 9.0,
                "total_solids_t": 25.38,
                "volatile_solids_pct_of_ts": 80.0,
                "volatile_solids_t": 20.30,
                "carbon_to_nitrogen_ratio": 24.5,
                "recoverable_biomass_t": 239.7,
                "collection_efficiency_pct": 85.0,
                "methodology_version": "v1.2-Allometric-TS-VS",
                "is_demo_data": 1
            },
            {
                "id": 3,
                "assessment_code": "BIO-HZ-03",
                "area_ha": 6.8,
                "coverage_pct": 58.5,
                "fresh_biomass_density_t_ha": 24.0,
                "fresh_biomass_total_t": 163.2,
                "moisture_content_pct": 91.0,
                "total_solids_pct": 9.0,
                "total_solids_t": 14.69,
                "volatile_solids_pct_of_ts": 80.0,
                "volatile_solids_t": 11.75,
                "carbon_to_nitrogen_ratio": 24.5,
                "recoverable_biomass_t": 138.72,
                "collection_efficiency_pct": 85.0,
                "methodology_version": "v1.2-Allometric-TS-VS",
                "is_demo_data": 1
            },
            {
                "id": 4,
                "assessment_code": "BIO-HZ-04",
                "area_ha": 5.2,
                "coverage_pct": 82.0,
                "fresh_biomass_density_t_ha": 32.0,
                "fresh_biomass_total_t": 166.4,
                "moisture_content_pct": 91.0,
                "total_solids_pct": 9.0,
                "total_solids_t": 14.98,
                "volatile_solids_pct_of_ts": 80.0,
                "volatile_solids_t": 11.98,
                "carbon_to_nitrogen_ratio": 24.5,
                "recoverable_biomass_t": 141.44,
                "collection_efficiency_pct": 85.0,
                "methodology_version": "v1.2-Allometric-TS-VS",
                "is_demo_data": 1
            },
            {
                "id": 5,
                "assessment_code": "BIO-HZ-05",
                "area_ha": 2.4,
                "coverage_pct": 34.0,
                "fresh_biomass_density_t_ha": 17.0,
                "fresh_biomass_total_t": 40.8,
                "moisture_content_pct": 91.0,
                "total_solids_pct": 9.0,
                "total_solids_t": 3.67,
                "volatile_solids_pct_of_ts": 80.0,
                "volatile_solids_t": 2.94,
                "carbon_to_nitrogen_ratio": 24.5,
                "recoverable_biomass_t": 34.68,
                "collection_efficiency_pct": 85.0,
                "methodology_version": "v1.2-Allometric-TS-VS",
                "is_demo_data": 1
            }
        ]
    return assessments

@router.post("/calculate", response_model=BiomassAssessmentResponse)
@router.post("/quantify", response_model=BiomassAssessmentResponse)
def calculate_custom_biomass(req: BiomassCalculationRequest):
    result = calculate_biomass_quantification(
        area_ha=req.area_ha,
        coverage_pct=req.coverage_pct,
        density_class=req.density_class,
        moisture_pct=req.moisture_content_pct,
        total_solids_pct=req.total_solids_pct,
        volatile_solids_pct=req.volatile_solids_pct,
        collection_efficiency_pct=req.collection_efficiency_pct
    )
    result["assessment_code"] = "BIO-CALC-CUSTOM"
    result["is_demo_data"] = 1
    return result
