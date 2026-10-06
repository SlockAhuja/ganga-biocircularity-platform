import datetime
from sqlalchemy import Column, String, Float, Integer, ForeignKey, DateTime, Text, JSON
from sqlalchemy.orm import relationship
from app.database import Base
from app.models.base import TimestampMixin

class WaterQualityObservation(Base, TimestampMixin):
    __tablename__ = "water_quality_observations"

    station_id = Column(Integer, ForeignKey("monitoring_stations.id"), nullable=False)
    station_name = Column(String(255), nullable=True)
    observation_time = Column(DateTime, default=datetime.datetime.utcnow, nullable=False)
    
    # Coordinates & Geography
    latitude = Column(Float, nullable=True)
    longitude = Column(Float, nullable=True)
    river_reach = Column(String(150), default="Ganga - Prayagraj Reach")
    
    # Physico-chemical Core Parameters
    ph = Column(Float, nullable=False)
    do_mg_l = Column(Float, nullable=False)
    bod_mg_l = Column(Float, nullable=False)
    cod_mg_l = Column(Float, nullable=False)
    tss_mg_l = Column(Float, nullable=False)
    tds_mg_l = Column(Float, default=320.0, nullable=True)
    temperature_c = Column(Float, default=24.5, nullable=True)
    turbidity_ntu = Column(Float, default=14.2, nullable=True)
    conductivity_us_cm = Column(Float, default=420.0, nullable=True)
    nitrate_no3_mg_l = Column(Float, default=1.85, nullable=True)
    phosphate_po4_mg_l = Column(Float, default=0.38, nullable=True)
    
    # Trace & Heavy Metal Contaminants (ug/L in water or mg/kg dry weight)
    chromium_cr = Column(Float, default=8.4)
    lead_pb = Column(Float, default=6.2)
    cadmium_cd = Column(Float, default=0.4)
    nickel_ni = Column(Float, default=4.8)
    mercury_hg = Column(Float, default=0.02)
    arsenic_as = Column(Float, default=0.9)
    zinc_zn = Column(Float, default=65.0)
    copper_cu = Column(Float, default=18.2)
    is_heavy_metal_measured = Column(Integer, default=0) # 0 = Literature/Demo benchmark, 1 = Verified Lab Assay
    
    # Provenance, Methodology & Data Quality
    source = Column(String(150), default="CPCB / National Water Quality Monitoring Programme")
    source_url = Column(String(255), default="https://cpcb.nic.in/water-quality-data/")
    method = Column(String(200), default="Electrochemical Sensor & Standard Methods APHA 23rd Ed")
    quality_flag = Column(String(50), default="VALIDATED") # VALIDATED, PROVISIONAL, ESTIMATED, SUSPECT
    provenance_status = Column(String(50), default="OBSERVED") # OBSERVED, LITERATURE, ESTIMATED, MODELED, DEMO
    is_demo_data = Column(Integer, default=0) # 0 = Real/Observed, 1 = Demo/Synthetic
    metadata_json = Column(JSON, nullable=True)

    station = relationship("MonitoringStation", back_populates="water_observations")
