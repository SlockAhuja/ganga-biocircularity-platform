import datetime
from sqlalchemy import Column, String, Float, Integer, ForeignKey, Text, JSON, DateTime
from sqlalchemy.orm import relationship
from app.database import Base
from app.models.base import TimestampMixin

class MonitoringRegion(Base, TimestampMixin):
    __tablename__ = "monitoring_regions"

    region_code = Column(String(50), unique=True, index=True, nullable=False)
    name = Column(String(255), nullable=False)
    state = Column(String(100), default="Uttar Pradesh")
    country = Column(String(100), default="India")
    center_lat = Column(Float, nullable=False)
    center_lng = Column(Float, nullable=False)
    bounding_box = Column(JSON, nullable=True) # [min_lng, min_lat, max_lng, max_lat]
    total_area_sqkm = Column(Float, default=180.0)
    description = Column(Text, nullable=True)

    stations = relationship("MonitoringStation", back_populates="region")
    hyacinth_zones = relationship("HyacinthZone", back_populates="region")
    satellite_scenes = relationship("SatelliteObservation", back_populates="region")

class MonitoringStation(Base, TimestampMixin):
    __tablename__ = "monitoring_stations"

    station_code = Column(String(50), unique=True, index=True, nullable=False)
    name = Column(String(255), nullable=False)
    river = Column(String(100), default="Ganga")
    station_type = Column(String(100), default="Hydrological & Biological")
    status = Column(String(50), default="Active")
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    elevation_m = Column(Float, nullable=True)
    region_id = Column(Integer, ForeignKey("monitoring_regions.id"), nullable=True)
    metadata_json = Column(JSON, nullable=True)

    region = relationship("MonitoringRegion", back_populates="stations")
    water_observations = relationship("WaterQualityObservation", back_populates="station")

class RiverSegment(Base, TimestampMixin):
    __tablename__ = "river_segments"

    segment_code = Column(String(50), unique=True, index=True, nullable=False)
    name = Column(String(255), nullable=False)
    river = Column(String(100), default="Ganga")
    length_km = Column(Float, nullable=False)
    avg_width_m = Column(Float, nullable=False)
    flow_type = Column(String(100), default="Mainstream")
    monitoring_priority = Column(String(50), default="High")
    geometry_geojson = Column(JSON, nullable=False)

class SatelliteObservation(Base, TimestampMixin):
    __tablename__ = "satellite_observations"

    scene_id = Column(String(100), unique=True, index=True, nullable=False)
    satellite = Column(String(50), default="Sentinel-2 MSI")
    sensor = Column(String(50), default="MSI Level-2A")
    acquisition_date = Column(DateTime, default=datetime.datetime.utcnow, nullable=False)
    cloud_coverage_pct = Column(Float, default=4.2)
    resolution_m = Column(Float, default=10.0)
    region_id = Column(Integer, ForeignKey("monitoring_regions.id"), nullable=True)
    processing_level = Column(String(50), default="BOA Surface Reflectance")
    indices_computed = Column(JSON, default=lambda: ["NDVI", "NDWI", "MNDWI", "EVI"])
    is_demo_data = Column(Integer, default=1) # 1 = Prototype/Demo, 0 = Live Satellite Feed

    region = relationship("MonitoringRegion", back_populates="satellite_scenes")
    hyacinth_zones = relationship("HyacinthZone", back_populates="satellite_scene")

class HyacinthZone(Base, TimestampMixin):
    __tablename__ = "hyacinth_zones"

    zone_code = Column(String(50), unique=True, index=True, nullable=False)
    name = Column(String(255), nullable=False)
    density_class = Column(String(50), default="High") # Low, Moderate, High, Very High
    coverage_pct = Column(Float, nullable=False)
    area_ha = Column(Float, nullable=False)
    perimeter_m = Column(Float, nullable=False)
    centroid_lat = Column(Float, nullable=False)
    centroid_lng = Column(Float, nullable=False)
    geometry_geojson = Column(JSON, nullable=False)
    
    classification_confidence = Column(Float, default=0.90)
    spectral_indices = Column(JSON, nullable=True) # {"ndvi_mean": 0.72, "mndwi_mean": -0.45}
    model_version = Column(String(50), default="v2.4-NDVI-MNDWI-FUSION")
    data_source = Column(String(255), default="Sentinel-2 MSI (Prototype Classification)")
    is_demo_data = Column(Integer, default=1)
    
    region_id = Column(Integer, ForeignKey("monitoring_regions.id"), nullable=True)
    scene_id = Column(Integer, ForeignKey("satellite_observations.id"), nullable=True)

    region = relationship("MonitoringRegion", back_populates="hyacinth_zones")
    satellite_scene = relationship("SatelliteObservation", back_populates="hyacinth_zones")
    biomass_assessments = relationship("BiomassAssessment", back_populates="hyacinth_zone")
    harvesting_records = relationship("HarvestingRecord", back_populates="hyacinth_zone")
