from typing import List, Dict, Any
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.water_quality import WaterQualityObservation
from app.schemas.water_quality import WaterQualityResponse

router = APIRouter(prefix="/water-quality", tags=["Water Quality & Contaminants"])

@router.get("/observations", response_model=List[WaterQualityResponse])
def get_water_quality_observations(db: Session = Depends(get_db)):
    obs = db.query(WaterQualityObservation).all()
    if not obs:
        return [
            {
                "id": 1,
                "station_id": 1,
                "station_name": "Phaphamau Bridge Station",
                "observation_time": "2026-09-28T08:30:00Z",
                "ph": 7.8,
                "do_mg_l": 6.4,
                "bod_mg_l": 3.8,
                "cod_mg_l": 18.2,
                "tss_mg_l": 42.0,
                "temperature_c": 24.5,
                "turbidity_ntu": 14.2,
                "conductivity_us_cm": 380.0,
                "chromium_cr": 8.4,
                "lead_pb": 6.2,
                "cadmium_cd": 0.4,
                "nickel_ni": 4.8,
                "mercury_hg": 0.02,
                "arsenic_as": 0.9,
                "zinc_zn": 65.0,
                "copper_cu": 18.2,
                "source": "CPCB / Real-Time Telemetry Node",
                "quality_flag": "VALIDATED",
                "is_demo_data": 1,
                "compliance_status": {
                    "pH": "Within configured reference threshold (6.5-8.5)",
                    "DO": "Acceptable (>5.0 mg/L)",
                    "BOD": "Slightly Elevated (>3.0 mg/L)",
                    "Heavy_Metals": "Within configured reference threshold"
                }
            },
            {
                "id": 2,
                "station_id": 2,
                "station_name": "Curzon Bridge Reach",
                "observation_time": "2026-09-28T09:00:00Z",
                "ph": 7.6,
                "do_mg_l": 5.8,
                "bod_mg_l": 4.5,
                "cod_mg_l": 22.0,
                "tss_mg_l": 58.0,
                "temperature_c": 25.1,
                "turbidity_ntu": 18.5,
                "conductivity_us_cm": 415.0,
                "chromium_cr": 11.2,
                "lead_pb": 7.8,
                "cadmium_cd": 0.6,
                "nickel_ni": 5.4,
                "mercury_hg": 0.03,
                "arsenic_as": 1.1,
                "zinc_zn": 78.0,
                "copper_cu": 22.0,
                "source": "Research Partner Field Probe",
                "quality_flag": "VALIDATED",
                "is_demo_data": 1,
                "compliance_status": {
                    "pH": "Within configured reference threshold (6.5-8.5)",
                    "DO": "Acceptable (>5.0 mg/L)",
                    "BOD": "Elevated (>3.0 mg/L)",
                    "Heavy_Metals": "Within configured reference threshold"
                }
            },
            {
                "id": 3,
                "station_id": 3,
                "station_name": "Sangam / Triveni Confluence Station",
                "observation_time": "2026-09-28T09:30:00Z",
                "ph": 7.9,
                "do_mg_l": 4.9,
                "bod_mg_l": 6.2,
                "cod_mg_l": 28.5,
                "tss_mg_l": 72.0,
                "temperature_c": 25.8,
                "turbidity_ntu": 24.0,
                "conductivity_us_cm": 490.0,
                "chromium_cr": 14.5,
                "lead_pb": 9.2,
                "cadmium_cd": 0.9,
                "nickel_ni": 7.1,
                "mercury_hg": 0.05,
                "arsenic_as": 1.4,
                "zinc_zn": 92.0,
                "copper_cu": 28.0,
                "source": "State Pollution Control Board Probe",
                "quality_flag": "VALIDATED",
                "is_demo_data": 1,
                "compliance_status": {
                    "pH": "Within configured reference threshold (6.5-8.5)",
                    "DO": "Below Critical Threshold (<5.0 mg/L)",
                    "BOD": "High Organic Load (>5.0 mg/L)",
                    "Heavy_Metals": "Within configured reference threshold"
                }
            }
        ]
    return obs
