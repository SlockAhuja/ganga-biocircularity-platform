import datetime
from typing import List, Dict, Any, Optional
from app.core.satellite.base import BaseSatelliteProvider

class DemoSatelliteProvider(BaseSatelliteProvider):
    """
    High-fidelity prototype and demo Earth Observation provider for the Prayagraj Ganga-Yamuna confluence.
    Provides deterministic, reproducible spectral scenes and candidate classifications for evaluation.
    """

    @property
    def provider_id(self) -> str:
        return "DEMO"

    @property
    def is_configured(self) -> bool:
        return True

    def get_health(self) -> Dict[str, Any]:
        return {
            "provider": "demo",
            "provider_name": "Synthetic Multi-temporal Demo Provider",
            "project_id": "demo-prayagraj-reach",
            "authenticated": True,
            "status": "healthy",
            "dataset": "Sentinel-2 MSI Level-2A (Synthetically Calibrated)",
            "message": "Demo provider operational for offline modeling and rapid prototyping."
        }

    def search_scenes(
        self,
        aoi_bbox: List[float],
        start_date: str,
        end_date: str,
        max_cloud_cover_pct: float = 20.0
    ) -> List[Dict[str, Any]]:
        scenes = [
            {
                "scene_id": "S2B_MSIL2A_20261001T050709_N0511_R019_T44RKR",
                "satellite": "Sentinel-2B MSI",
                "sensor": "Multi-Spectral Instrument (13 Bands)",
                "acquisition_date": "2026-10-01T05:07:09Z",
                "cloud_coverage_pct": 2.4,
                "resolution_m": 10.0,
                "region": "Prayagraj (Allahabad) Confluence",
                "processing_level": "Level-2A Bottom-Of-Atmosphere (BOA)",
                "indices_computed": ["NDVI", "NDWI", "MNDWI", "EVI", "WRI"],
                "status": "PROCESSED",
                "data_source_mode": "DEMO"
            },
            {
                "scene_id": "S2B_MSIL2A_20260926T050709_N0511_R019_T44RKR",
                "satellite": "Sentinel-2B MSI",
                "sensor": "Multi-Spectral Instrument (13 Bands)",
                "acquisition_date": "2026-09-26T05:07:09Z",
                "cloud_coverage_pct": 3.8,
                "resolution_m": 10.0,
                "region": "Prayagraj (Allahabad) Confluence",
                "processing_level": "Level-2A Bottom-Of-Atmosphere (BOA)",
                "indices_computed": ["NDVI", "NDWI", "MNDWI", "EVI", "WRI"],
                "status": "PROCESSED",
                "data_source_mode": "DEMO"
            },
            {
                "scene_id": "S2A_MSIL2A_20260916T050711_N0511_R019_T44RKR",
                "satellite": "Sentinel-2A MSI",
                "sensor": "Multi-Spectral Instrument (13 Bands)",
                "acquisition_date": "2026-09-16T05:07:11Z",
                "cloud_coverage_pct": 8.4,
                "resolution_m": 10.0,
                "region": "Prayagraj (Allahabad) Confluence",
                "processing_level": "Level-2A Bottom-Of-Atmosphere (BOA)",
                "indices_computed": ["NDVI", "NDWI", "MNDWI", "EVI"],
                "status": "ARCHIVED",
                "data_source_mode": "DEMO"
            }
        ]
        if max_cloud_cover_pct is not None:
            return [s for s in scenes if s["cloud_coverage_pct"] <= max_cloud_cover_pct]
        return scenes

    def analyze_hyacinth_extent(
        self,
        aoi_bbox: List[float],
        start_date: str,
        end_date: str,
        max_cloud_cover_pct: float = 20.0,
        biomass_density_factor_t_ha: float = 44.05
    ) -> Dict[str, Any]:
        # Reference demo candidate zones for Prayagraj study reach
        candidate_zones = [
            {
                "zone_id": "HZ-DEMO-01",
                "name": "Phaphamau Upstream Meander",
                "density_class": "High",
                "area_ha": 14.5,
                "area_m2": 145000.0,
                "confidence": 0.92,
                "mean_ndvi": 0.72,
                "mean_mndwi": -0.42,
                "estimated_fresh_biomass_t": round(14.5 * biomass_density_factor_t_ha * 0.75, 2),
                "coordinates_centroid": [81.8612, 25.5015],
                "geometry": {
                    "type": "Polygon",
                    "coordinates": [[[81.855, 25.498], [81.868, 25.499], [81.867, 25.505], [81.854, 25.504], [81.855, 25.498]]]
                }
            },
            {
                "zone_id": "HZ-DEMO-02",
                "name": "Curzon Bridge Riparian Flank",
                "density_class": "Moderate",
                "area_ha": 8.2,
                "area_m2": 82000.0,
                "confidence": 0.88,
                "mean_ndvi": 0.61,
                "mean_mndwi": -0.35,
                "estimated_fresh_biomass_t": round(8.2 * biomass_density_factor_t_ha * 0.65, 2),
                "coordinates_centroid": [81.8755, 25.4830],
                "geometry": {
                    "type": "Polygon",
                    "coordinates": [[[81.870, 25.480], [81.881, 25.481], [81.880, 25.486], [81.869, 25.485], [81.870, 25.480]]]
                }
            },
            {
                "zone_id": "HZ-DEMO-03",
                "name": "Sangam / Triveni Confluence Backwater",
                "density_class": "Very High",
                "area_ha": 11.4,
                "area_m2": 114000.0,
                "confidence": 0.95,
                "mean_ndvi": 0.78,
                "mean_mndwi": -0.48,
                "estimated_fresh_biomass_t": round(11.4 * biomass_density_factor_t_ha * 0.85, 2),
                "coordinates_centroid": [81.8845, 25.4260],
                "geometry": {
                    "type": "Polygon",
                    "coordinates": [[[81.880, 25.422], [81.890, 25.423], [81.889, 25.430], [81.879, 25.429], [81.880, 25.422]]]
                }
            },
            {
                "zone_id": "HZ-DEMO-04",
                "name": "Shastri Bridge Downstream Stagnation",
                "density_class": "Moderate",
                "area_ha": 4.5,
                "area_m2": 45000.0,
                "confidence": 0.84,
                "mean_ndvi": 0.58,
                "mean_mndwi": -0.32,
                "estimated_fresh_biomass_t": round(4.5 * biomass_density_factor_t_ha * 0.60, 2),
                "coordinates_centroid": [81.8950, 25.4120],
                "geometry": {
                    "type": "Polygon",
                    "coordinates": [[[81.891, 25.409], [81.899, 25.410], [81.898, 25.415], [81.890, 25.414], [81.891, 25.409]]]
                }
            }
        ]

        total_ha = sum(z["area_ha"] for z in candidate_zones)
        total_biomass_t = sum(z["estimated_fresh_biomass_t"] for z in candidate_zones)
        mean_conf = round(sum(z["confidence"] for z in candidate_zones) / len(candidate_zones), 2)

        return {
            "status": "SUCCESS",
            "provider": "DEMO",
            "provider_name": "Synthetic Multi-temporal Demo Provider",
            "aoi_bbox": aoi_bbox,
            "date_range": {"start_date": start_date, "end_date": end_date},
            "scenes_analyzed_count": 2,
            "mean_cloud_cover_pct": 3.1,
            "total_estimated_hyacinth_area_ha": round(total_ha, 2),
            "total_estimated_hyacinth_area_m2": round(total_ha * 10000.0, 1),
            "total_estimated_fresh_biomass_t": round(total_biomass_t, 2),
            "biomass_factor_used": {
                "factor_value": biomass_density_factor_t_ha,
                "unit": "tonnes / ha",
                "source": "ScientificAssumption (YIELD_DENSITY_HIGH)",
                "status": "ESTIMATED"
            },
            "overall_confidence": mean_conf,
            "classification_status": "ESTIMATED",
            "candidate_zones_count": len(candidate_zones),
            "candidate_zones": candidate_zones,
            "spectral_summary": {
                "mean_ndvi": 0.69,
                "mean_ndwi": -0.28,
                "mean_mndwi": -0.41,
                "water_masking_method": "Automated Modified Otsu MNDWI Delineation"
            },
            "provenance": {
                "source": "DEMO",
                "provider": "Google Earth Engine / Synthetic Baseline",
                "dataset": "COPERNICUS/S2_SR_HARMONIZED (Prototype Fallback)",
                "algorithm_version": "GEE-S2-HYACINTH-DUAL-INDEX-V2.5-PROTOTYPE",
                "processing_timestamp": datetime.datetime.now(datetime.timezone.utc).isoformat(),
                "classification_label": "Estimated Hyacinth Candidate Zones (Prototype Mode)"
            }
        }

    def compare_periods(
        self,
        aoi_bbox: List[float],
        period_a_start: str,
        period_a_end: str,
        period_b_start: str,
        period_b_end: str,
        max_cloud_cover_pct: float = 20.0
    ) -> Dict[str, Any]:
        analysis_a = self.analyze_hyacinth_extent(aoi_bbox, period_a_start, period_a_end, max_cloud_cover_pct)
        analysis_b = self.analyze_hyacinth_extent(aoi_bbox, period_b_start, period_b_end, max_cloud_cover_pct)

        area_a = analysis_a["total_estimated_hyacinth_area_ha"]
        # In period B demo, simulate 18.5% reduction due to seasonal displacement / harvesting
        area_b = round(area_a * 0.815, 2)
        delta_ha = round(area_b - area_a, 2)
        pct_change = round((delta_ha / area_a) * 100.0, 2)

        return {
            "status": "SUCCESS",
            "provider": "DEMO",
            "aoi_bbox": aoi_bbox,
            "period_a": {
                "start": period_a_start,
                "end": period_a_end,
                "estimated_area_ha": area_a,
                "scenes_count": 2
            },
            "period_b": {
                "start": period_b_start,
                "end": period_b_end,
                "estimated_area_ha": area_b,
                "scenes_count": 2
            },
            "delta_area_ha": delta_ha,
            "percentage_change": pct_change,
            "interpretation": (
                "Net reduction in estimated surface canopy detected. "
                "Note: Satellite change detection reflects surface vegetative reflectance changes; "
                "corroboration with field harvesting logs is required to attribute causality."
            ),
            "classification_status": "ESTIMATED",
            "provenance": {
                "source": "DEMO",
                "method": "Multi-Temporal Sentinel-2 Earth Engine Bi-Temporal Difference v1.0",
                "processing_timestamp": datetime.datetime.now(datetime.timezone.utc).isoformat()
            }
        }
