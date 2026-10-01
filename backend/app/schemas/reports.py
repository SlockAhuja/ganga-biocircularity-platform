from typing import List, Optional, Dict, Any
from pydantic import BaseModel
from datetime import datetime

class ReportGenerationRequest(BaseModel):
    title: str = "Ganga Biocircularity & Biomass Assessment Report"
    study_region: str = "Prayagraj Confluence Reach"
    zone_ids: List[int] = []
    include_sections: List[str] = [
        "Executive Summary",
        "GIS & Satellite Distribution",
        "Biomass Quantification",
        "Bioenergy & Bio-CNG Potential",
        "Circularity & Resource Recovery",
        "Environmental Impact Assessment",
        "Techno-Economic Valuation",
        "Limitations & Data Sources"
    ]
    custom_notes: Optional[str] = None

class GeneratedReportResponse(BaseModel):
    id: int
    report_code: str
    title: str
    study_region: str
    generated_by: str
    summary_metrics_json: Dict[str, Any]
    pdf_file_path: Optional[str] = None
    status: str
    created_at: datetime
    class Config:
        from_attributes = True
