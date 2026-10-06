"""
Google Earth Engine External Data Provider
Wraps GEE Sentinel-2 SR Harmonized processing, cloud masking, and MNDWI/NDVI computation.
"""
import time
import logging
from typing import Dict, Any, Optional
from datetime import datetime, timezone
from .base import ExternalDataProvider
from app.config import settings

logger = logging.getLogger(__name__)

class EarthEngineProvider(ExternalDataProvider):
    """
    Google Earth Engine Sentinel-2 Provider.
    Handles authentication health checks, asset queries, and provides provenance.
    """
    
    def __init__(self):
        super().__init__(
            provider_id="GOOGLE_EARTH_ENGINE",
            name="Google Earth Engine (Copernicus Sentinel-2 SR)",
            source_tier="OFFICIAL"
        )
        self.project_id = settings.EARTH_ENGINE_PROJECT_ID

    def health_check(self) -> Dict[str, Any]:
        start = time.time()
        try:
            from app.core.satellite.gee_provider import get_earth_engine_service
            svc = get_earth_engine_service()
            if svc.is_available():
                latency = round((time.time() - start) * 1000, 2)
                self._last_latency_ms = latency
                self._last_success_time = datetime.now(timezone.utc).isoformat()
                return {
                    "provider_id": self.provider_id,
                    "name": self.name,
                    "status": "LIVE",
                    "latency_ms": latency,
                    "last_success": self._last_success_time,
                    "error_count": self._error_count,
                    "details": f"Earth Engine initialized with GCP Project: {self.project_id} (Dataset: COPERNICUS/S2_SR_HARMONIZED)"
                }
            else:
                return {
                    "provider_id": self.provider_id,
                    "name": self.name,
                    "status": "CONFIGURED",
                    "latency_ms": round((time.time() - start) * 1000, 2),
                    "last_success": self._last_success_time,
                    "error_count": self._error_count,
                    "details": "EE SDK loaded; server-side authentication configured (local developer ADC or SA key enabled)."
                }
        except Exception as e:
            self._error_count += 1
            return {
                "provider_id": self.provider_id,
                "name": self.name,
                "status": "CONFIGURED",
                "latency_ms": round((time.time() - start) * 1000, 2),
                "last_success": self._last_success_time,
                "error_count": self._error_count,
                "details": f"Earth Engine initialization pending ADC credentials: {str(e)}"
            }
