import json
import os
from typing import List, Dict, Any
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.gis import MonitoringRegion, RiverSegment
from app.schemas.gis import RiverSegmentResponse

router = APIRouter(prefix="/regions", tags=["Regions & River Network"])

@router.get("/")
def get_monitoring_regions(db: Session = Depends(get_db)):
    regions = db.query(MonitoringRegion).all()
    if not regions:
        return [{
            "id": 1,
            "region_code": "REG-PRY-01",
            "name": "Prayagraj (Allahabad) Ganga-Yamuna Confluence",
            "state": "Uttar Pradesh",
            "country": "India",
            "center_lat": 25.4260,
            "center_lng": 81.8845,
            "total_area_sqkm": 180.0,
            "description": "Critical monitoring stretch covering Phaphamau, Curzon Bridge, Triveni Sangam, and Arail Ghat reaches."
        }]
    return regions

@router.get("/river-segments", response_model=List[RiverSegmentResponse])
def get_river_segments(db: Session = Depends(get_db)):
    segments = db.query(RiverSegment).all()
    if not segments:
        # Load from geojson file if database is freshly initialized
        geojson_path = os.path.join(os.path.dirname(__file__), "..", "..", "..", "data", "geojson", "prayagraj_river_network.geojson")
        if os.path.exists(geojson_path):
            with open(geojson_path, "r", encoding="utf-8") as f:
                data = json.load(f)
                return [
                    {
                        "id": idx + 1,
                        "segment_code": f.get("properties", {}).get("id", f"SEG-{idx+1}"),
                        "name": f.get("properties", {}).get("name", "Ganga Reach"),
                        "river": f.get("properties", {}).get("river", "Ganga"),
                        "length_km": f.get("properties", {}).get("length_km", 10.0),
                        "avg_width_m": f.get("properties", {}).get("avg_width_m", 500.0),
                        "flow_type": f.get("properties", {}).get("flow_type", "Mainstream"),
                        "monitoring_priority": f.get("properties", {}).get("monitoring_priority", "High"),
                        "geometry_geojson": f.get("geometry", {})
                    }
                    for idx, f in enumerate(data.get("features", []))
                ]
    return segments
