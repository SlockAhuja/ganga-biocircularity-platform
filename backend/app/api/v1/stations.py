import json
import os
from typing import List, Dict, Any
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.gis import MonitoringStation

router = APIRouter(prefix="/stations", tags=["Monitoring Stations"])

@router.get("/")
def get_monitoring_stations(db: Session = Depends(get_db)):
    stations = db.query(MonitoringStation).all()
    if not stations:
        geojson_path = os.path.join(os.path.dirname(__file__), "..", "..", "..", "data", "geojson", "monitoring_stations.geojson")
        if os.path.exists(geojson_path):
            with open(geojson_path, "r", encoding="utf-8") as f:
                data = json.load(f)
                return [
                    {
                        "id": idx + 1,
                        "station_code": f.get("properties", {}).get("id", f"STN-{idx+1}"),
                        "name": f.get("properties", {}).get("name", "Monitoring Station"),
                        "river": f.get("properties", {}).get("river", "Ganga"),
                        "station_type": f.get("properties", {}).get("station_type", "Hydrological"),
                        "status": f.get("properties", {}).get("status", "Active"),
                        "latitude": f.get("geometry", {}).get("coordinates", [81.88, 25.42])[1],
                        "longitude": f.get("geometry", {}).get("coordinates", [81.88, 25.42])[0],
                        "elevation_m": f.get("properties", {}).get("elevation_m", 85.0),
                        "metadata_json": f.get("properties", {})
                    }
                    for idx, f in enumerate(data.get("features", []))
                ]
    return stations

@router.get("/geojson")
def get_monitoring_stations_geojson(db: Session = Depends(get_db)):
    geojson_path = os.path.join(os.path.dirname(__file__), "..", "..", "..", "data", "geojson", "monitoring_stations.geojson")
    if os.path.exists(geojson_path):
        with open(geojson_path, "r", encoding="utf-8") as f:
            return json.load(f)
    return {"type": "FeatureCollection", "features": []}
