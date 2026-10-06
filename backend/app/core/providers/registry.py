"""
Unified Provider Registry for BioRiver
Aggregates all external data providers, runs automated health checks, and returns provider telemetry.
"""
from typing import Dict, Any, List
from .earth_engine_provider import EarthEngineProvider
from .maptiler_provider import MapTilerProvider
from .cpcb_provider import CPCBProvider
from .hydrology_provider import IndiaWRISProvider
from .weather_provider import OpenMeteoWeatherProvider
from .osm_provider import OpenStreetMapProvider
from .storage_provider import StorageProvider

class ProviderRegistry:
    def __init__(self):
        self.earth_engine = EarthEngineProvider()
        self.maptiler = MapTilerProvider()
        self.cpcb = CPCBProvider()
        self.hydrology = IndiaWRISProvider()
        self.weather = OpenMeteoWeatherProvider()
        self.osm = OpenStreetMapProvider()
        self.storage = StorageProvider()

    def get_all_health(self) -> List[Dict[str, Any]]:
        providers = [
            self.earth_engine,
            self.maptiler,
            self.cpcb,
            self.hydrology,
            self.weather,
            self.osm,
            self.storage
        ]
        return [p.health_check() for p in providers]

# Singleton instance
provider_registry = ProviderRegistry()
