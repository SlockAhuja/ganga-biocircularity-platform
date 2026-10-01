import datetime
from sqlalchemy import Column, String, Text, JSON, DateTime, Integer, ForeignKey
from app.database import Base
from app.models.base import TimestampMixin

class GeneratedReport(Base, TimestampMixin):
    __tablename__ = "generated_reports"

    report_code = Column(String(50), unique=True, index=True, nullable=False)
    title = Column(String(255), nullable=False)
    study_region = Column(String(255), default="Prayagraj Confluence Region")
    generated_by = Column(String(100), default="Research Analyst")
    parameters_json = Column(JSON, nullable=False) # Selected zones, metrics, date range
    summary_metrics_json = Column(JSON, nullable=False)
    methodology_notes = Column(Text, nullable=True)
    limitations_notes = Column(Text, nullable=True)
    pdf_file_path = Column(String(500), nullable=True)
    status = Column(String(50), default="COMPLETED")
