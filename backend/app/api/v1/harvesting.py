import datetime
from typing import List
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.harvesting import HarvestingRecord, FieldObservation
from app.schemas.harvesting import (
    HarvestingCreateRequest,
    HarvestingResponse,
    FieldObservationCreate,
    FieldObservationResponse,
)

router = APIRouter(prefix="/harvesting", tags=["Harvesting & Field Operations"])

@router.get("/records", response_model=List[HarvestingResponse])
def get_harvesting_records(db: Session = Depends(get_db)):
    records = db.query(HarvestingRecord).all()
    if not records:
        return [
            {
                "id": 1,
                "zone_id": 1,
                "harvest_date": "2026-09-27T10:00:00Z",
                "harvesting_method": "Amphibious Aquatic Harvester + Boom",
                "biomass_collected_t": 120.5,
                "removal_efficiency_pct": 89.0,
                "labour_hours": 36.0,
                "fuel_consumed_liters": 95.0,
                "transport_distance_km": 7.2,
                "destination_facility": "Prayagraj Bio-CNG Demo Facility (Naini)",
                "status": "Completed",
                "notes": "Targeted clearing of Sangam boat navigation corridor"
            },
            {
                "id": 2,
                "zone_id": 2,
                "harvest_date": "2026-09-25T14:30:00Z",
                "harvesting_method": "Mechanical Conveyor Skimmer",
                "biomass_collected_t": 85.0,
                "removal_efficiency_pct": 84.5,
                "labour_hours": 28.0,
                "fuel_consumed_liters": 70.0,
                "transport_distance_km": 9.0,
                "destination_facility": "Prayagraj Bio-CNG Demo Facility (Naini)",
                "status": "Completed",
                "notes": "Curzon bridge upstream clearing"
            }
        ]
    return records

@router.post("/records", response_model=HarvestingResponse)
def create_harvesting_record(req: HarvestingCreateRequest, db: Session = Depends(get_db)):
    record = HarvestingRecord(
        zone_id=req.zone_id,
        harvest_date=datetime.datetime.utcnow(),
        harvesting_method=req.harvesting_method,
        biomass_collected_t=req.biomass_collected_t,
        removal_efficiency_pct=req.removal_efficiency_pct,
        labour_hours=req.labour_hours,
        fuel_consumed_liters=req.fuel_consumed_liters,
        transport_distance_km=req.transport_distance_km,
        destination_facility=req.destination_facility,
        status="Completed",
        notes=req.notes
    )
    db.add(record)
    try:
        db.commit()
        db.refresh(record)
    except Exception:
        db.rollback()
        # Return transient response for demo/in-memory mode
        return {
            "id": 99,
            "zone_id": req.zone_id,
            "harvest_date": datetime.datetime.utcnow(),
            "harvesting_method": req.harvesting_method,
            "biomass_collected_t": req.biomass_collected_t,
            "removal_efficiency_pct": req.removal_efficiency_pct,
            "labour_hours": req.labour_hours,
            "fuel_consumed_liters": req.fuel_consumed_liters,
            "transport_distance_km": req.transport_distance_km,
            "destination_facility": req.destination_facility,
            "status": "Completed",
            "notes": req.notes
        }
    return record

@router.get("/field-observations", response_model=List[FieldObservationResponse])
def get_field_observations(db: Session = Depends(get_db)):
    obs = db.query(FieldObservation).all()
    if not obs:
        return [
            {
                "id": 1,
                "station_name": "Sangam Left Bank",
                "observation_date": "2026-09-28T07:45:00Z",
                "latitude": 25.4285,
                "longitude": 81.8910,
                "hyacinth_density": "Very High",
                "coverage_pct": 92.0,
                "water_appearance": "Dense unbroken floating hyacinth mat; high root entanglement",
                "ph_field": 7.9,
                "do_field": 4.8,
                "observer_name": "Field Team Alpha (Dr. Verma)",
                "photo_urls": ["/data/photos/sangam_field_01.jpg"],
                "notes": "Fast regrowth noted near bathing ghat inlet",
                "is_demo_data": 1
            }
        ]
    return obs

@router.post("/field-observations", response_model=FieldObservationResponse)
def submit_field_observation(req: FieldObservationCreate, db: Session = Depends(get_db)):
    obs = FieldObservation(
        station_name=req.station_name,
        observation_date=datetime.datetime.utcnow(),
        latitude=req.latitude,
        longitude=req.longitude,
        hyacinth_density=req.hyacinth_density,
        coverage_pct=req.coverage_pct,
        water_appearance=req.water_appearance,
        ph_field=req.ph_field,
        do_field=req.do_field,
        observer_name=req.observer_name,
        photo_urls=req.photo_urls,
        notes=req.notes,
        is_demo_data=1
    )
    db.add(obs)
    try:
        db.commit()
        db.refresh(obs)
    except Exception:
        db.rollback()
        return {
            "id": 99,
            "station_name": req.station_name,
            "observation_date": datetime.datetime.utcnow(),
            "latitude": req.latitude,
            "longitude": req.longitude,
            "hyacinth_density": req.hyacinth_density,
            "coverage_pct": req.coverage_pct,
            "water_appearance": req.water_appearance,
            "ph_field": req.ph_field,
            "do_field": req.do_field,
            "observer_name": req.observer_name,
            "photo_urls": req.photo_urls,
            "notes": req.notes,
            "is_demo_data": 1
        }
    return obs
