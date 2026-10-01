import json
import os
import sys

# Ensure backend root is on PYTHONPATH
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from app.database import engine, SessionLocal, Base
from app.models.users import User, UserRole
from app.models.gis import MonitoringRegion, MonitoringStation, RiverSegment, SatelliteObservation, HyacinthZone
from app.models.biomass import BiomassAssessment
from app.models.water_quality import WaterQualityObservation
from app.models.harvesting import HarvestingRecord, FieldObservation
from app.models.circularity import CircularityScore, EnvironmentalMetric, EconomicMetric
from app.core.security import get_password_hash

def seed():
    print("[*] Initializing database schema...")
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()

    # 1. Users
    if not db.query(User).first():
        print("[+] Seeding default users & roles...")
        users = [
            User(
                email="admin@ganga-bio.in",
                username="admin",
                full_name="System Administrator",
                hashed_password=get_password_hash("admin123"),
                role=UserRole.ADMIN,
                organization="National Mission for Clean Ganga"
            ),
            User(
                email="researcher@ganga-bio.in",
                username="researcher",
                full_name="Dr. Ananya Sharma",
                hashed_password=get_password_hash("research123"),
                role=UserRole.RESEARCHER,
                organization="Remote Sensing & Ecological Modeling Lab"
            ),
            User(
                email="field@ganga-bio.in",
                username="field_operator",
                full_name="Rajesh Kumar",
                hashed_password=get_password_hash("field123"),
                role=UserRole.FIELD_OPERATOR,
                organization="Prayagraj River Operations Wing"
            ),
            User(
                email="viewer@ganga-bio.in",
                username="viewer",
                full_name="Public Stakeholder",
                hashed_password=get_password_hash("viewer123"),
                role=UserRole.VIEWER,
                organization="Public Observation"
            )
        ]
        db.add_all(users)
        db.commit()

    # 2. Monitoring Region
    region = db.query(MonitoringRegion).first()
    if not region:
        print("[+] Seeding Prayagraj Monitoring Region...")
        region = MonitoringRegion(
            region_code="REG-PRY-01",
            name="Prayagraj (Allahabad) Ganga-Yamuna Confluence",
            state="Uttar Pradesh",
            country="India",
            center_lat=25.4260,
            center_lng=81.8845,
            bounding_box=[81.75, 25.35, 82.02, 25.58],
            total_area_sqkm=180.0,
            description="Sacred Triveni Sangam confluence and river reaches prone to water hyacinth blooms."
        )
        db.add(region)
        db.commit()
        db.refresh(region)

    # 3. River Segments
    if not db.query(RiverSegment).first():
        print("[+] Seeding River Segments...")
        geojson_path = os.path.join(os.path.dirname(__file__), "..", "..", "data", "geojson", "prayagraj_river_network.geojson")
        if os.path.exists(geojson_path):
            with open(geojson_path, "r", encoding="utf-8") as f:
                geo_data = json.load(f)
                for feat in geo_data.get("features", []):
                    props = feat.get("properties", {})
                    seg = RiverSegment(
                        segment_code=props.get("id", "SEG-01"),
                        name=props.get("name", "Ganga Reach"),
                        river=props.get("river", "Ganga"),
                        length_km=props.get("length_km", 10.0),
                        avg_width_m=props.get("avg_width_m", 500.0),
                        flow_type=props.get("flow_type", "Mainstream"),
                        monitoring_priority=props.get("monitoring_priority", "High"),
                        geometry_geojson=feat.get("geometry", {})
                    )
                    db.add(seg)
                db.commit()

    # 4. Monitoring Stations
    if not db.query(MonitoringStation).first():
        print("[+] Seeding Monitoring Stations...")
        stn_path = os.path.join(os.path.dirname(__file__), "..", "..", "data", "geojson", "monitoring_stations.geojson")
        if os.path.exists(stn_path):
            with open(stn_path, "r", encoding="utf-8") as f:
                stn_data = json.load(f)
                for feat in stn_data.get("features", []):
                    props = feat.get("properties", {})
                    coords = feat.get("geometry", {}).get("coordinates", [81.88, 25.42])
                    stn = MonitoringStation(
                        station_code=props.get("id", "STN-01"),
                        name=props.get("name", "Station"),
                        river=props.get("river", "Ganga"),
                        station_type=props.get("station_type", "Hydrological"),
                        status=props.get("status", "Active"),
                        latitude=coords[1],
                        longitude=coords[0],
                        elevation_m=props.get("elevation_m", 85.0),
                        region_id=region.id,
                        metadata_json=props
                    )
                    db.add(stn)
                db.commit()

    # 5. Hyacinth Zones
    if not db.query(HyacinthZone).first():
        print("[+] Seeding Hyacinth Zones & Biomass...")
        hy_path = os.path.join(os.path.dirname(__file__), "..", "..", "data", "geojson", "hyacinth_zones.geojson")
        if os.path.exists(hy_path):
            with open(hy_path, "r", encoding="utf-8") as f:
                hy_data = json.load(f)
                for feat in hy_data.get("features", []):
                    props = feat.get("properties", {})
                    coords = props.get("coordinates_centroid", [81.88, 25.42])
                    zone = HyacinthZone(
                        zone_code=props.get("zone_id", "HZ-01"),
                        name=props.get("name", "Zone"),
                        density_class=props.get("density_class", "High"),
                        coverage_pct=props.get("coverage_percentage", 80.0),
                        area_ha=props.get("area_ha", 10.0),
                        perimeter_m=props.get("perimeter_m", 1200.0),
                        centroid_lat=coords[1],
                        centroid_lng=coords[0],
                        geometry_geojson=feat.get("geometry", {}),
                        classification_confidence=props.get("confidence", 0.90),
                        spectral_indices={"ndvi_mean": 0.70, "mndwi_mean": -0.40},
                        model_version=props.get("processing_version", "v2.4-NDVI-MNDWI-FUSION"),
                        data_source=props.get("data_source", "Sentinel-2 MSI Level-2A"),
                        is_demo_data=1,
                        region_id=region.id
                    )
                    db.add(zone)
                    db.commit()
                    db.refresh(zone)

                    # Create corresponding Biomass Assessment
                    fresh_biomass_t = props.get("fresh_biomass_t", zone.area_ha * 32.0)
                    ts_t = props.get("dry_biomass_t", fresh_biomass_t * 0.09)
                    vs_t = props.get("volatile_solids_t", ts_t * 0.80)
                    
                    bio_ass = BiomassAssessment(
                        assessment_code=f"BIO-{zone.zone_code}",
                        zone_id=zone.id,
                        area_ha=zone.area_ha,
                        coverage_pct=zone.coverage_pct,
                        fresh_biomass_density_t_ha=props.get("fresh_biomass_t", 320.0) / zone.area_ha,
                        fresh_biomass_total_t=fresh_biomass_t,
                        moisture_content_pct=props.get("moisture_content_pct", 91.0),
                        total_solids_pct=9.0,
                        total_solids_t=ts_t,
                        volatile_solids_pct_of_ts=80.0,
                        volatile_solids_t=vs_t,
                        carbon_to_nitrogen_ratio=24.5,
                        recoverable_biomass_t=round(fresh_biomass_t * 0.85, 2),
                        collection_efficiency_pct=85.0,
                        methodology_version="v1.2-Allometric-TS-VS",
                        is_demo_data=1
                    )
                    db.add(bio_ass)
                db.commit()

    db.close()
    print("[SUCCESS] Database successfully seeded with scientific demonstration dataset!")

if __name__ == "__main__":
    seed()
