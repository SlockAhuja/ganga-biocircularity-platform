from typing import Optional, Dict, Any
from pydantic import BaseModel

class EconomicCalculationRequest(BaseModel):
    fresh_biomass_t: float
    bio_cng_kg: float
    vermicompost_t: float
    vermiwash_liters: float
    harvesting_cost_per_ton: float = 850.0
    transport_cost_per_ton: float = 450.0
    processing_opex_per_ton: float = 600.0
    bio_cng_price_per_kg: float = 75.0
    vermicompost_price_per_kg: float = 12.0
    vermiwash_price_per_liter: float = 35.0
    carbon_credit_price_per_ton_co2e: float = 1200.0

class EconomicMetricResponse(BaseModel):
    id: Optional[int] = None
    scenario_name: str
    currency: str
    harvesting_cost_total: float
    transport_cost_total: float
    processing_opex_total: float
    capex_annualized: float
    total_cost: float
    bio_cng_revenue: float
    vermicompost_revenue: float
    vermiwash_revenue: float
    carbon_credit_revenue: float
    value_added_extracts_revenue: float
    total_revenue: float
    net_benefit: float
    roi_percentage: float
    payback_period_years: float
    assumptions_json: Optional[Dict[str, Any]] = None
    is_demo_data: int = 1
    class Config:
        from_attributes = True
