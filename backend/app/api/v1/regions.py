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
        for candidate_path in [
            os.path.join(os.path.dirname(__file__), "..", "..", "..", "data", "geojson", "prayagraj_river_network.geojson"),
            os.path.join(os.path.dirname(__file__), "..", "..", "..", "..", "data", "geojson", "prayagraj_river_network.geojson"),
            os.path.join(os.getcwd(), "data", "geojson", "prayagraj_river_network.geojson")
        ]:
            if os.path.exists(candidate_path):
                with open(candidate_path, "r", encoding="utf-8") as f:
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
        # Return standard Ganga & Yamuna segments
        return [
            {
                "id": 1,
                "segment_code": "segment-ganga-upstream",
                "name": "Ganga River - Upstream Phaphamau Reach",
                "river": "Ganga",
                "length_km": 14.8,
                "avg_width_m": 480.0,
                "flow_type": "Mainstream Perennial",
                "monitoring_priority": "High",
                "geometry_geojson": {
                    "type": "LineString",
                    "coordinates": [[81.7610, 25.5680], [81.7820, 25.5450], [81.8100, 25.5230], [81.8410, 25.5020], [81.8650, 25.4850], [81.8820, 25.4610]]
                }
            },
            {
                "id": 2,
                "segment_code": "segment-ganga-sangam",
                "name": "Ganga River - Sangam Confluence Reach",
                "river": "Ganga",
                "length_km": 8.5,
                "avg_width_m": 720.0,
                "flow_type": "Sacred Confluence & Sedimentation Zone",
                "monitoring_priority": "Critical",
                "geometry_geojson": {
                    "type": "LineString",
                    "coordinates": [[81.8820, 25.4610], [81.8885, 25.4380], [81.8845, 25.4260], [81.8970, 25.4190], [81.9150, 25.4150]]
                }
            }
        ]
    return segments
