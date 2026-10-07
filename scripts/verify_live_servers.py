import urllib.request
import json
import sys

endpoints = [
    '/api/v1/health',
    '/docs',
    '/api/v1/regions/water-extent',
    '/api/v1/regions/centerlines',
    '/api/v1/stations',
    '/api/v1/hyacinth/zones',
    '/api/v1/water-quality/observations',
    '/api/v1/system/providers-health',
    '/api/v1/system/weather',
    '/api/v1/system/hydrology',
    '/api/v1/system/mass-balance',
    '/api/v1/system/uncertainty',
    '/api/v1/system/data-quality'
]

print("="*60)
print("  BIORIVER LIVE LOCAL SERVER INTEGRATION VERIFICATION")
print("="*60)

# Check Frontend
try:
    f_res = urllib.request.urlopen("http://localhost:5173", timeout=5)
    print(f"[FRONTEND] http://localhost:5173 -> HTTP {f_res.status} OK")
except Exception as e:
    print(f"[FRONTEND] FAILED: {e}")

# Check Backend endpoints
for ep in endpoints:
    url = f"http://localhost:8000{ep}"
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "BioRiver-Verifier"})
        res = urllib.request.urlopen(req, timeout=5)
        print(f"[BACKEND]  {ep:<35} -> HTTP {res.status} OK")
    except Exception as e:
        print(f"[BACKEND]  {ep:<35} -> FAILED: {e}")

print("="*60)
print("All Live Server Checks Completed.")
print("="*60)
