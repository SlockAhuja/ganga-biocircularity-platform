import os
from app.core.satellite.base import BaseSatelliteProvider
from app.core.satellite.demo_provider import DemoSatelliteProvider
from app.core.satellite.earth_engine_provider import EarthEngineSatelliteProvider

_PROVIDERS = {}

def get_satellite_provider(provider_name: str = None) -> BaseSatelliteProvider:
    """
    Returns the configured satellite provider instance (EarthEngineSatelliteProvider or DemoSatelliteProvider).
    """
    global _PROVIDERS
    
    if not provider_name:
        provider_name = os.environ.get("SATELLITE_PROVIDER", "demo").lower()
        if os.environ.get("EARTH_ENGINE_ENABLED", "false").lower() == "true":
            provider_name = "earth_engine"
            
    provider_key = provider_name.lower().strip()
    
    if provider_key in ["earth_engine", "earthengine", "ee"]:
        if "earth_engine" not in _PROVIDERS:
            _PROVIDERS["earth_engine"] = EarthEngineSatelliteProvider()
        return _PROVIDERS["earth_engine"]
    
    # Default to Demo provider
    if "demo" not in _PROVIDERS:
        _PROVIDERS["demo"] = DemoSatelliteProvider()
    return _PROVIDERS["demo"]
