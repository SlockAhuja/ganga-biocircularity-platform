from fastapi import APIRouter
from app.api.v1 import (
    auth,
    regions,
    stations,
    hyacinth,
    satellite,
    biomass,
    water_quality,
    harvesting,
    bioenergy,
    circularity,
    environment,
    economics,
    reports,
    assumptions,
)

api_router = APIRouter()

api_router.include_router(auth.router)
api_router.include_router(regions.router)
api_router.include_router(stations.router)
api_router.include_router(hyacinth.router)
api_router.include_router(satellite.router)
api_router.include_router(biomass.router)
api_router.include_router(water_quality.router)
api_router.include_router(harvesting.router)
api_router.include_router(bioenergy.router)
api_router.include_router(circularity.router)
api_router.include_router(environment.router)
api_router.include_router(economics.router)
api_router.include_router(reports.router)
api_router.include_router(assumptions.router)
