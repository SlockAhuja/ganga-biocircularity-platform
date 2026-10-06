"""
BioRiver Automated Data Quality & Anomaly Detection Engine
Evaluates data integrity across telemetry, remote sensing, and field observations.
Computes a rigorous Data Quality Score (0-100%) and returns structured anomaly reports.
"""
from typing import Dict, Any, List
from datetime import datetime, timezone

class DataQualityEngine:
    """
    Automated QA/QC evaluator for all incoming observations and computational outputs.
    """

    PRAYAGRAJ_BOUNDS = {
        "min_lon": 81.70,
        "max_lon": 82.10,
        "min_lat": 25.30,
        "max_lat": 25.65
    }

    PHYSICAL_RANGES = {
        "pH": (0.0, 14.0),
        "DO": (0.0, 20.0),
        "BOD": (0.0, 500.0),
        "COD": (0.0, 2000.0),
        "temperature": (0.0, 50.0),
        "turbidity": (0.0, 1000.0),
        "TDS": (0.0, 5000.0),
        "conductivity": (0.0, 10000.0),
        "biomass_tonnes": (0.0, 100000.0),
        "area_ha": (0.0, 50000.0),
        "biogas_m3": (0.0, 1000000.0)
    }

    @classmethod
    def evaluate_telemetry_quality(cls, observations: List[Dict[str, Any]]) -> Dict[str, Any]:
        total_checks = 0
        passed_checks = 0
        anomalies: List[Dict[str, Any]] = []

        for obs in observations:
            # 1. Coordinate Validity
            lat = obs.get("latitude")
            lon = obs.get("longitude")
            if lat is not None and lon is not None:
                total_checks += 1
                if (cls.PRAYAGRAJ_BOUNDS["min_lat"] <= lat <= cls.PRAYAGRAJ_BOUNDS["max_lat"] and
                    cls.PRAYAGRAJ_BOUNDS["min_lon"] <= lon <= cls.PRAYAGRAJ_BOUNDS["max_lon"]):
                    passed_checks += 1
                else:
                    anomalies.append({
                        "type": "SPATIAL_OUT_OF_BOUNDS",
                        "station": obs.get("station_name", "Unknown"),
                        "details": f"Coordinates ({lat}, {lon}) outside Prayagraj AOI bounds."
                    })

            # 2. Value Range Validity
            param = obs.get("parameter")
            val = obs.get("value")
            if param in cls.PHYSICAL_RANGES and val is not None:
                total_checks += 1
                low, high = cls.PHYSICAL_RANGES[param]
                if low <= val <= high:
                    passed_checks += 1
                else:
                    anomalies.append({
                        "type": "IMPOSSIBLE_PHYSICAL_RANGE",
                        "parameter": param,
                        "value": val,
                        "details": f"{param} value {val} exceeds physical range [{low}, {high}]."
                    })

            # 3. Provenance Completeness
            total_checks += 1
            prov = obs.get("provenance")
            if prov and (prov.get("source") or prov.get("provider")) and prov.get("provenance"):
                passed_checks += 1
            else:
                anomalies.append({
                    "type": "MISSING_PROVENANCE",
                    "station": obs.get("station_name", "Unknown"),
                    "details": "Observation lacks full provenance provenance status or source citation."
                })

        score = round((passed_checks / total_checks * 100.0), 1) if total_checks > 0 else 100.0

        return {
            "data_quality_score": score,
            "status": "PASS" if score >= 90.0 else ("WARNING" if score >= 75.0 else "FAIL"),
            "total_checks_evaluated": total_checks,
            "passed_checks": passed_checks,
            "anomalies_detected": len(anomalies),
            "anomalies": anomalies,
            "evaluated_at": datetime.now(timezone.utc).isoformat()
        }
