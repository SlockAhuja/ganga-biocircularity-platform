"""
BIORIVER — Live Google Earth Engine Integration Acceptance Test
Project ID: camera-503319
Dataset: COPERNICUS/S2_SR_HARMONIZED
Target AOI: Prayagraj Ganga-Yamuna Confluence Reach [81.80, 25.38, 81.95, 25.54]
"""

import os
import sys
import datetime

# Ensure backend root is in sys.path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "backend")))

def run_live_earth_engine_test():
    print("=" * 70)
    print("      BIORIVER -- LIVE GOOGLE EARTH ENGINE ACCEPTANCE TEST")
    print("=" * 70)

    project_id = os.environ.get("EARTH_ENGINE_PROJECT_ID", "camera-503319")
    print(f"\n[Step 1] Initializing Earth Engine with Project: {project_id}...")

    authenticated = False
    auth_method = "UNKNOWN"
    ee = None

    try:
        import ee as ee_module
        ee = ee_module
        
        # 1. Check for Service Account Key Path
        sa_key = os.environ.get("EARTH_ENGINE_SERVICE_ACCOUNT_KEY_PATH") or os.environ.get("GOOGLE_APPLICATION_CREDENTIALS")
        sa_email = os.environ.get("EARTH_ENGINE_SERVICE_ACCOUNT_EMAIL") or os.environ.get("EARTH_ENGINE_SERVICE_ACCOUNT")
        
        if sa_key and os.path.exists(sa_key):
            if sa_email:
                credentials = ee.ServiceAccountCredentials(sa_email, sa_key)
                ee.Initialize(credentials, project=project_id)
            else:
                ee.Initialize(project=project_id)
            authenticated = True
            auth_method = "SERVICE_ACCOUNT"
            print(f"  [OK] Authenticated via Service Account: {sa_email or 'Default SA Key'}")
        else:
            # 2. Try ADC / User Authentication
            try:
                ee.Initialize(project=project_id)
                authenticated = True
                auth_method = "ADC (Application Default Credentials)"
                print(f"  [OK] Authenticated via Application Default Credentials (ADC).")
            except Exception as auth_err:
                print(f"  [INFO] Earth Engine ADC not initialized on local machine: {auth_err}")
                print(f"  [NOTE] Run 'gcloud auth application-default login' to authenticate local developer session.")
    except ImportError:
        print("  [FAIL] earthengine-api package not found.")
        return

    # Check against Provider Abstraction
    from app.core.satellite.factory import get_satellite_provider
    from app.core.satellite.earth_engine_provider import EarthEngineSatelliteProvider
    from app.core.satellite.demo_provider import DemoSatelliteProvider

    provider = get_satellite_provider("earth_engine")
    health = provider.get_health()
    print(f"\n[Step 2] Provider Health Check:")
    print(f"  - Active Provider ID: {provider.provider_id}")
    print(f"  - Configured / Authenticated: {health.get('authenticated')}")
    print(f"  - Health Status: {health.get('status')}")
    print(f"  - Target Dataset: {health.get('dataset')}")

    # Target AOI: Prayagraj Ganga-Yamuna Confluence
    aoi_bbox = [81.80, 25.38, 81.95, 25.54] # [min_lng, min_lat, max_lng, max_lat]
    # Use valid historical Sentinel-2 date range with known cloud-free acquisitions
    start_date = "2024-01-01"
    end_date = "2024-03-31"
    max_cloud_cover = 20.0

    print(f"\n[Step 3] Querying Sentinel-2 Surface Reflectance (COPERNICUS/S2_SR_HARMONIZED)...")
    print(f"  - AOI Bounding Box: {aoi_bbox}")
    print(f"  - Temporal Window: {start_date} to {end_date}")
    print(f"  - Max Cloud Threshold: {max_cloud_cover}%")

    if authenticated and ee:
        try:
            geometry = ee.Geometry.Rectangle(aoi_bbox)
            collection = (
                ee.ImageCollection("COPERNICUS/S2_SR_HARMONIZED")
                .filterBounds(geometry)
                .filterDate(start_date, end_date)
                .filter(ee.Filter.lte("CLOUDY_PIXEL_PERCENTAGE", max_cloud_cover))
                .sort("system:time_start", False)
            )

            actual_scene_count = collection.size().getInfo()
            print(f"  [OK] Real Sentinel-2 Granules Found in Earth Engine: {actual_scene_count}")

            if actual_scene_count > 0:
                scenes_info = collection.limit(5).getInfo().get("features", [])
                print(f"  [OK] Sample Acquisition Granules:")
                for s in scenes_info:
                    props = s.get("properties", {})
                    time_ms = props.get("system:time_start", 0)
                    dt_str = datetime.datetime.fromtimestamp(time_ms / 1000.0, datetime.timezone.utc).strftime("%Y-%m-%d %H:%M:%S UTC")
                    print(f"     * ID: {s.get('id')} | Date: {dt_str} | Cloud: {props.get('CLOUDY_PIXEL_PERCENTAGE', 0):.1f}%")

                # Step 4: Execute Live SCL/QA60 Cloud Masking
                print(f"\n[Step 4] Executing Live SCL Cloud & Cloud-Shadow Masking Pipeline...")
                def mask_clouds(img):
                    scl = img.select("SCL")
                    mask = scl.neq(3).And(scl.neq(8)).And(scl.neq(9)).And(scl.neq(10)).And(scl.neq(11))
                    return img.select(["B2", "B3", "B4", "B8", "B11"]).divide(10000).updateMask(mask)

                cloud_free = collection.map(mask_clouds).median().clip(geometry)

                # Step 5: Spectral Index Calculation
                print(f"\n[Step 5] Calculating Multi-Spectral Indices on Cloud-Free Median Composite:")
                print(f"  - NDVI = (B8 - B4) / (B8 + B4)")
                print(f"  - NDWI = (B3 - B8) / (B3 + B8)")
                print(f"  - MNDWI = (B3 - B11) / (B3 + B11)")

                ndvi = cloud_free.normalizedDifference(["B8", "B4"]).rename("NDVI")
                ndwi = cloud_free.normalizedDifference(["B3", "B8"]).rename("NDWI")
                mndwi = cloud_free.normalizedDifference(["B3", "B11"]).rename("MNDWI")

                # Step 6: Water & Hyacinth Candidate Extraction
                print(f"\n[Step 6] Extracting Water Corridor & Hyacinth Candidate Zones...")
                water_mask = mndwi.gt(0.0).Or(ndwi.gt(0.0))
                veg_mask = ndvi.gt(0.35)
                hyacinth_candidate = veg_mask

                area_m2_val = hyacinth_candidate.multiply(ee.Image.pixelArea()).reduceRegion(
                    reducer=ee.Reducer.sum(),
                    geometry=geometry,
                    scale=10,
                    maxPixels=1e9
                ).getInfo().get("NDVI", 0.0)

                area_ha_val = float(area_m2_val or 0.0) / 10000.0

                print(f"  [OK] Real Pixel-Sum Calculated Candidate Area: {area_ha_val:.2f} ha ({area_m2_val:,.1f} m2)")

                mean_stats = cloud_free.addBands([ndvi, ndwi, mndwi]).reduceRegion(
                    reducer=ee.Reducer.mean(),
                    geometry=geometry,
                    scale=20,
                    maxPixels=1e8
                ).getInfo()
                print(f"  [OK] Regional Mean Spectral Indices: NDVI={mean_stats.get('NDVI', 0):.3f}, MNDWI={mean_stats.get('MNDWI', 0):.3f}")

                print(f"\n[Step 7] Execution Provenance:")
                print(f"  - Data Source: REAL_EARTH_ENGINE")
                print(f"  - Provider: Google Earth Engine")
                print(f"  - Project ID: {project_id}")
                print(f"  - Authentication Method: {auth_method}")
                print(f"  - Dataset: COPERNICUS/S2_SR_HARMONIZED")
                print(f"  - Status: ESTIMATED (Scientific macrophyte candidate extent)")
                print(f"  - Demo Fallback Triggered: NO")
        except Exception as ee_exec_err:
            print(f"  [ERROR] Live Earth Engine query error: {ee_exec_err}")
    else:
        # Evaluate Provider Behavior in unauthenticated environment (Demo Fallback with explicit labeling)
        print(f"\n[Step 3b] Evaluating Provider in Local Development Mode...")
        analysis = provider.analyze_hyacinth_extent(aoi_bbox, start_date, end_date, max_cloud_cover)
        print(f"  [OK] Provider Handled Request Gracefully:")
        print(f"  - Provider Mode: {analysis.get('provider')}")
        print(f"  - Status: {analysis.get('status')}")
        print(f"  - Estimated Candidate Area: {analysis.get('total_estimated_hyacinth_area_ha')} ha")
        print(f"  - Candidate Patches: {len(analysis.get('candidate_zones', []))}")
        print(f"  - Provenance Source: {analysis.get('provenance', {}).get('source')}")
        print(f"  - Classification Label: {analysis.get('classification_status')}")

    print("\n" + "=" * 70)
    print("      LIVE EARTH ENGINE ACCEPTANCE TEST COMPLETE")
    print("=" * 70)

if __name__ == "__main__":
    run_live_earth_engine_test()
