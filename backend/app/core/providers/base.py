"""
BioRiver External Data Provider Base Interface
Defines the standard contract, caching, provenance, and health checks for external APIs.
"""
from abc import ABC, abstractmethod
from typing import Dict, Any, Optional
from datetime import datetime, timezone
import hashlib
import json
import logging

logger = logging.getLogger(__name__)

class ExternalDataProvider(ABC):
    """
    Abstract Base Class for all external scientific, geographic, and operational data providers.
    Ensures consistent provenance, error handling, caching, and health diagnostics.
    """
    
    def __init__(self, provider_id: str, name: str, source_tier: str = "OFFICIAL"):
        self.provider_id = provider_id
        self.name = name
        self.source_tier = source_tier  # OFFICIAL, SCIENTIFIC, REFERENCE, OPEN, COMMERCIAL, MANUAL
        self._cache: Dict[str, Dict[str, Any]] = {}
        self._error_count: int = 0
        self._last_request_time: Optional[str] = None
        self._last_success_time: Optional[str] = None
        self._last_latency_ms: float = 0.0

    @abstractmethod
    def health_check(self) -> Dict[str, Any]:
        """
        Verify credentials, reachability, and return provider health status.
        Returns: {
            "provider_id": str,
            "status": "LIVE" | "CONFIGURED" | "MANUAL" | "CACHED" | "OPTIONAL" | "UNAVAILABLE",
            "latency_ms": float,
            "last_success": str | None,
            "error_count": int,
            "details": str
        }
        """
        pass

    def _get_cache_key(self, endpoint: str, params: Dict[str, Any]) -> str:
        """Compute SHA256 deterministic cache key."""
        raw = f"{endpoint}:{json.dumps(params, sort_keys=True, default=str)}"
        return hashlib.sha256(raw.encode("utf-8")).hexdigest()

    def _get_cached(self, key: str, max_age_seconds: int = 3600) -> Optional[Any]:
        if key in self._cache:
            entry = self._cache[key]
            age = (datetime.now(timezone.utc) - entry["timestamp"]).total_seconds()
            if age <= max_age_seconds:
                return entry["data"]
            del self._cache[key]
        return None

    def _set_cache(self, key: str, data: Any) -> None:
        self._cache[key] = {
            "timestamp": datetime.now(timezone.utc),
            "data": data
        }

    def create_provenance(
        self,
        dataset: str,
        method: str,
        provenance_status: str = "OBSERVED",
        confidence: float = 1.0,
        quality_flag: str = "VALIDATED",
        citation: Optional[str] = None,
        observed_at: Optional[str] = None
    ) -> Dict[str, Any]:
        """Universal scientific provenance record."""
        return {
            "provider": self.name,
            "provider_id": self.provider_id,
            "dataset": dataset,
            "method": method,
            "provenance": provenance_status,  # OBSERVED, REFERENCE, LITERATURE, ESTIMATED, MODELED, DEMO
            "confidence": confidence,
            "quality_flag": quality_flag,
            "citation": citation,
            "observed_at": observed_at or datetime.now(timezone.utc).isoformat(),
            "retrieved_at": datetime.now(timezone.utc).isoformat()
        }
