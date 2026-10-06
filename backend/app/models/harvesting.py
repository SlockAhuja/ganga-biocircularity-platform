import datetime
from sqlalchemy import Column, String, Float, Integer, ForeignKey, DateTime, Text, JSON
from sqlalchemy.orm import relationship
from app.database import Base
from app.models.base import TimestampMixin

class HarvestingRecord(Base, TimestampMixin):
    __tablename__ = "harvesting_records"

    zone_id = Column(Integer, ForeignKey("hyacinth_zones.id"), nullable=False)
    harvest_date = Column(DateTime, default=datetime.datetime.utcnow, nullable=False)
    harvesting_method = Column(String(100), default="Amphibious Harvester + Weed Boom")
    biomass_collected_t = Column(Float, nullable=False)
    removal_efficiency_pct = Column(Float, default=88.0)
    labour_hours = Column(Float, default=48.0)
    fuel_consumed_liters = Column(Float, default=120.0)
    transport_distance_km = Column(Float, default=8.5)
    destination_facility = Column(String(255), default="Prayagraj Bio-CNG & Vermicomposting Demonstration Facility")
    status = Column(String(50), default="Completed")
    notes = Column(Text, nullable=True)

    hyacinth_zone = relationship("HyacinthZone", back_populates="harvesting_records")

class FieldObservation(Base, TimestampMixin):
    __tablename__ = "field_observations"

    station_name = Column(String(255), nullable=False)
    observation_date = Column(DateTime, default=datetime.datetime.utcnow, nullable=False)
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    hyacinth_density = Column(String(50), default="High")
    coverage_pct = Column(Float, default=75.0)
    water_appearance = Column(String(255), default="Turbid with dense floating mats")
    ph_field = Column(Float, nullable=True)
    do_field = Column(Float, nullable=True)
    observer_name = Column(String(255), default="Field Survey Team")
    ground_truth_class = Column(String(50), default="HYACINTH")  # HYACINTH, OTHER_AQUATIC_VEGETATION, OPEN_WATER, SEDIMENT, SHORELINE, FALSE_POSITIVE
    species_identified = Column(String(100), default="Eichhornia crassipes")
    confidence_score = Column(Float, default=1.0)
    validation_status = Column(String(50), default="VALIDATED")  # UNVERIFIED, VALIDATED, REJECTED
    photo_urls = Column(JSON, nullable=True)
    notes = Column(Text, nullable=True)
    is_demo_data = Column(Integer, default=1)

