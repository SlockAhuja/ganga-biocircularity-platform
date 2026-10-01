from sqlalchemy import Column, String, Float, Integer, JSON
from app.database import Base
from app.models.base import TimestampMixin

class CircularityScore(Base, TimestampMixin):
    __tablename__ = "circularity_scores"

    assessment_name = Column(String(255), nullable=False)
    overall_circularity_score = Column(Float, nullable=False) # 0 to 100
    biomass_recovery_subscore = Column(Float, nullable=False)
    resource_conversion_subscore = Column(Float, nullable=False)
    nutrient_recovery_subscore = Column(Float, nullable=False)
    waste_diversion_subscore = Column(Float, nullable=False)
    energy_recovery_subscore = Column(Float, nullable=False)
    
    methodology_version = Column(String(50), default="v1.0-Circularity-Index-Prayagraj")
    components_breakdown = Column(JSON, nullable=True)
    is_demo_data = Column(Integer, default=1)

class EnvironmentalMetric(Base, TimestampMixin):
    __tablename__ = "environmental_metrics"

    assessment_name = Column(String(255), nullable=False)
    ghg_avoidance_kg_co2e = Column(Float, nullable=False)
    waste_diverted_t = Column(Float, nullable=False)
    water_bod_reduction_kg = Column(Float, nullable=False)
    fossil_fuel_offset_kg_cng = Column(Float, nullable=False)
    grid_power_offset_kwh = Column(Float, nullable=False)
    nitrogen_recycled_kg = Column(Float, nullable=False)
    phosphorus_recycled_kg = Column(Float, nullable=False)
    potassium_recycled_kg = Column(Float, nullable=False)
    river_surface_cleared_ha = Column(Float, nullable=False)
    methodology_version = Column(String(50), default="v1.1-LCA-Tier2-IPCC")
    is_demo_data = Column(Integer, default=1)

class EconomicMetric(Base, TimestampMixin):
    __tablename__ = "economic_metrics"

    scenario_name = Column(String(255), nullable=False)
    currency = Column(String(10), default="INR")
    
    # Costs
    harvesting_cost_total = Column(Float, nullable=False)
    transport_cost_total = Column(Float, nullable=False)
    processing_opex_total = Column(Float, nullable=False)
    capex_annualized = Column(Float, default=150000.0)
    total_cost = Column(Float, nullable=False)
    
    # Revenues
    bio_cng_revenue = Column(Float, nullable=False)
    vermicompost_revenue = Column(Float, nullable=False)
    vermiwash_revenue = Column(Float, nullable=False)
    carbon_credit_revenue = Column(Float, default=0.0)
    value_added_extracts_revenue = Column(Float, default=0.0)
    total_revenue = Column(Float, nullable=False)
    
    # ROI & Net
    net_benefit = Column(Float, nullable=False)
    roi_percentage = Column(Float, nullable=False)
    payback_period_years = Column(Float, nullable=False)
    
    assumptions_json = Column(JSON, nullable=True)
    is_demo_data = Column(Integer, default=1)
