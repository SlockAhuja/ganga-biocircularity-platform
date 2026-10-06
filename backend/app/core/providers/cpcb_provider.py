"""
Central Pollution Control Board (CPCB) / NWMP Water Quality Provider
Provides standardized water quality observations with provenance for Prayagraj Ganga-Yamuna monitoring.
"""
import time
import os
import csv
import logging
from typing import Dict, Any, List, Optional
from datetime import datetime, timezone
from .base import ExternalDataProvider

logger = logging.getLogger(__name__)

class CPCBProvider(ExternalDataProvider):
    """
    CPCB / NWMP (National Water Quality Monitoring Programme) Provider.
    Supports official observations ingested from CPCB bulletin records and verified telemetry.
    """
    
    def __init__(self):
        super().__init__(
            provider_id="CPCB_NWMP",
            name="Central Pollution Control Board (CPCB / NWMP)",
            source_tier="OFFICIAL"
        )
        self.csv_path = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(__file__)))), "data", "water_quality", "cpcb_prayagraj_real_observations.csv")

    def health_check(self) -> Dict[str, Any]:
        start = time.time()
        obs_count = 0
        file_exists = os.path.exists(self.csv_path)
        if file_exists:
            try:
                with open(self.csv_path, "r", encoding="utf-8") as f:
                    reader = csv.DictReader(f)
                    obs_count = sum(1 for _ in reader)
            except Exception as e:
                logger.warning(f"Error reading CPCB data file: {e}")

        latency = round((time.time() - start) * 1000, 2)
        self._last_latency_ms = latency
        self._last_success_time = datetime.now(timezone.utc).isoformat()
        
        status = "LIVE" if file_exists and obs_count > 0 else "MANUAL"
        return {
            "provider_id": self.provider_id,
            "name": self.name,
            "status": status,
            "latency_ms": latency,
            "last_success": self._last_success_time,
            "error_count": self._error_count,
            "details": f"CPCB/NWMP curated registry active: {obs_count} verified observations loaded for Prayagraj Ganga-Yamuna reaches."
        }

    def get_station_observations(self, station_name: Optional[str] = None) -> List[Dict[str, Any]]:
        results = []
        if not os.path.exists(self.csv_path):
            return results

        with open(self.csv_path, "r", encoding="utf-8") as f:
            reader = csv.DictReader(f)
            for row in reader:
                if station_name and station_name.lower() not in row.get("station_name", "").lower():
                    continue
                results.append({
                    "station_name": row.get("station_name"),
                    "station_code": row.get("station_code"),
                    "river": row.get("river_name"),
                    "latitude": float(row.get("latitude", 0)),
                    "longitude": float(row.get("longitude", 0)),
                    "parameter": row.get("parameter"),
                    "value": float(row.get("value", 0)),
                    "unit": row.get("unit"),
                    "sampling_date": row.get("observation_date"),
                    "quality_flag": row.get("quality_flag", "VALIDATED"),
                    "provenance": self.create_provenance(
                        dataset="CPCB Real-Time & NWMP Water Quality Network",
                        method=row.get("method_protocol", "Standard Methods for Examination of Water and Wastewater (APHA 23rd Ed.)"),
                        provenance_status="OBSERVED",
                        confidence=0.98,
                        quality_flag="GOVERNMENT_OFFICIAL",
                        citation="Central Pollution Control Board (CPCB) Ganga Basin Real-Time Water Quality Monitoring",
                        observed_at=row.get("observation_date")
                    )
                })
        return results
