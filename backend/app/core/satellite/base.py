from abc import ABC, abstractmethod
from typing import List, Dict, Any, Optional

class BaseSatelliteProvider(ABC):
    """
    Authoritative abstract interface for satellite Earth Observation and hyacinth analytics providers.
    """
    
    @property
    @abstractmethod
    def provider_id(self) -> str:
        """Returns the uppercase provider identifier, e.g. 'EARTH_ENGINE', 'DEMO', 'SENTINEL_COPERNICUS'."""
        pass

    @property
    @abstractmethod
    def is_configured(self) -> bool:
        """Returns True if the provider credentials/environment are fully set up."""
        pass

    @abstractmethod
    def get_health(self) -> Dict[str, Any]:
        """
        Returns the real-time operational health and authentication status.
        Must never expose secrets or tokens in output.
        """
        pass

    @abstractmethod
    def search_scenes(
        self,
        aoi_bbox: List[float],
        start_date: str,
        end_date: str,
        max_cloud_cover_pct: float = 20.0
    ) -> List[Dict[str, Any]]:
        """
        Queries satellite catalog for matching granules in the AOI and date range.
        """
        pass

    @abstractmethod
    def analyze_hyacinth_extent(
        self,
        aoi_bbox: List[float],
        start_date: str,
        end_date: str,
        max_cloud_cover_pct: float = 20.0,
        biomass_density_factor_t_ha: float = 44.05
    ) -> Dict[str, Any]:
        """
        Executes cloud masking, spectral index extraction (NDVI, NDWI, MNDWI),
        water mask intersection, and candidate zone classification.
        """
        pass

    @abstractmethod
    def compare_periods(
        self,
        aoi_bbox: List[float],
        period_a_start: str,
        period_a_end: str,
        period_b_start: str,
        period_b_end: str,
        max_cloud_cover_pct: float = 20.0
    ) -> Dict[str, Any]:
        """
        Calculates multi-temporal changes in estimated hyacinth extent and index distributions.
        """
        pass
