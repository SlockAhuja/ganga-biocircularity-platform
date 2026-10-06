from typing import List, Optional
from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.assumptions import ScientificAssumption
from pydantic import BaseModel

class AssumptionResponse(BaseModel):
    id: int
    key_code: str
    name: str
    value: float
    unit: str
    category: str
    source: str
    reference: Optional[str] = None
    version: str
    scenario: str
    is_demo: bool

    class Config:
        from_attributes = True

router = APIRouter(prefix="/assumptions", tags=["Scientific Assumptions Registry"])

DEFAULT_ASSUMPTIONS = [
    {
        "id": 1,
        "key_code": "MOISTURE_PCT",
        "name": "Water Hyacinth Moisture Ratio",
        "value": 91.0,
        "unit": "%",
        "category": "BIOMASS",
        "source": "Laboratory oven drying (105°C)",
        "reference": "Gunnarsson & Petersen (2007)",
        "version": "v1.2",
        "scenario": "Baseline",
        "is_demo": True
    },
    {
        "id": 2,
        "key_code": "TOTAL_SOLIDS_PCT",
        "name": "Total Solids (TS) Fraction",
        "value": 9.0,
        "unit": "%",
        "category": "BIOMASS",
        "source": "Proximate analysis",
        "reference": "Gunnarsson & Petersen (2007)",
        "version": "v1.2",
        "scenario": "Baseline",
        "is_demo": True
    },
    {
        "id": 3,
        "key_code": "VOLATILE_SOLIDS_PCT",
        "name": "Volatile Solids (VS) in Total Solids",
        "value": 80.0,
        "unit": "% of TS",
        "category": "BIOMASS",
        "source": "Loss on Ignition (550°C)",
        "reference": "Kumar & Ghosh (2019)",
        "version": "v1.2",
        "scenario": "Baseline",
        "is_demo": True
    },
    {
        "id": 4,
        "key_code": "BMP_BASELINE",
        "name": "Biochemical Methane Potential (BMP)",
        "value": 245.0,
        "unit": "mL CH4 / g VS",
        "category": "BIOENERGY",
        "source": "Mesophilic anaerobic digestion (37°C)",
        "reference": "Kumar & Ghosh (2019)",
        "version": "v1.4",
        "scenario": "Baseline",
        "is_demo": True
    },
    {
        "id": 5,
        "key_code": "CH4_FRACTION_RAW",
        "name": "Raw Biogas Methane Content",
        "value": 62.0,
        "unit": "%",
        "category": "BIOENERGY",
        "source": "Gas chromatography TCD",
        "reference": "IS 16087",
        "version": "v1.4",
        "scenario": "Baseline",
        "is_demo": True
    },
    {
        "id": 6,
        "key_code": "BIOCNG_PURITY_PCT",
        "name": "Upgraded Bio-CNG Methane Purity",
        "value": 96.0,
        "unit": "% CH4",
        "category": "BIOENERGY",
        "source": "SATAT automotive standards",
        "reference": "MoPNG (2024)",
        "version": "v1.0",
        "scenario": "Baseline",
        "is_demo": True
    },
    {
        "id": 7,
        "key_code": "COMPOST_YIELD_FACTOR",
        "name": "Digestate Vermicompost Yield",
        "value": 23.7,
        "unit": "tonnes / 1000 t fresh",
        "category": "VERMICOMPOST",
        "source": "Eisenia fetida worm conversion",
        "reference": "Gupta & Garg (2008)",
        "version": "v1.1",
        "scenario": "Baseline",
        "is_demo": True
    },
    {
        "id": 8,
        "key_code": "EMISSION_DECAY_CH4",
        "name": "Riverbed Decay Methane Factor",
        "value": 0.082,
        "unit": "kg CH4 / kg dry solids",
        "category": "ENVIRONMENT",
        "source": "IPCC Wetlands Refinement",
        "reference": "IPCC (2019)",
        "version": "v1.1",
        "scenario": "Baseline",
        "is_demo": True
    },
    {
        "id": 9,
        "key_code": "GWP_METHANE_100",
        "name": "Methane Global Warming Potential (100-yr)",
        "value": 28.0,
        "unit": "kg CO2e / kg CH4",
        "category": "ENVIRONMENT",
        "source": "IPCC 6th Assessment Report",
        "reference": "IPCC AR6 (2021)",
        "version": "v1.1",
        "scenario": "Baseline",
        "is_demo": True
    },
    {
        "id": 10,
        "key_code": "PRICE_BIOCNG_KG",
        "name": "Bio-CNG Retail Benchmark Price",
        "value": 72.0,
        "unit": "INR / kg",
        "category": "ECONOMICS",
        "source": "SATAT OMC Offtake Scheme",
        "reference": "MoPNG (2024)",
        "version": "v1.0",
        "scenario": "Baseline",
        "is_demo": True
    }
]

@router.get("/", response_model=List[AssumptionResponse])
def get_scientific_assumptions(
    category: Optional[str] = Query(None, description="Filter by category (BIOMASS, BIOENERGY, etc.)"),
    scenario: Optional[str] = Query(None, description="Filter by scenario (Baseline, Conservative, Optimistic)"),
    db: Session = Depends(get_db)
):
    query = db.query(ScientificAssumption)
    if category:
        query = query.filter(ScientificAssumption.category == category.upper())
    if scenario:
        query = query.filter(ScientificAssumption.scenario == scenario)
    results = query.all()
    if not results:
        filtered = DEFAULT_ASSUMPTIONS
        if category:
            filtered = [a for a in filtered if a["category"] == category.upper()]
        if scenario:
            filtered = [a for a in filtered if a["scenario"] == scenario]
        return filtered
    return results
