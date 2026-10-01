import datetime
from sqlalchemy import Column, String, Float, Integer, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from app.database import Base
from app.models.base import TimestampMixin

class WaterQualityObservation(Base, TimestampMixin):
    __tablename__ = "water_quality_observations"

    station_id = Column(Integer, ForeignKey("monitoring_stations.id"), nullable=False)
    observation_time = Column(DateTime, default=datetime.datetime.utcnow, nullable=False)
    
    # Physico-chemical
    ph = Column(Float, nullable=False)
    do_mg_l = Column(Float, nullable=False)
    bod_mg_l = Column(Float, nullable=False)
    cod_mg_l = Column(Float, nullable=False)
    tss_mg_l = Column(Float, nullable=False)
    temperature_c = Column(Float, default=25.0)
    turbidity_ntu = Column(Float, default=15.0)
    conductivity_us_cm = Column(Float, default=450.0)
    
    # Heavy Metal Contaminants (mg/kg dry weight in hyacinth or mg/L in water)
    chromium_cr = Column(Float, default=12.4)
    lead_pb = Column(Float, default=8.6)
    cadmium_cd = Column(Float, default=0.8)
    nickel_ni = Column(Float, default=6.2)
    mercury_hg = Column(Float, default=0.04)
    arsenic_as = Column(Float, default=1.1)
    zinc_zn = Column(Float, default=85.0)
    copper_cu = Column(Float, default=24.5)
    
    source = Column(String(100), default="CPCB / Research Partner Field Probe")
    quality_flag = Column(String(50), default="VALIDATED") # RAW, ESTIMATED, VALIDATED
    is_demo_data = Column(Integer, default=1)

    station = relationship("MonitoringStation", back_populates="water_observations")
