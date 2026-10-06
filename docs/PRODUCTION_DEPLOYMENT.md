# BioRiver Production Deployment & Operations Guide

**Document Identifier:** `BIORIVER-PROD-OPS-2026-V3`  
**Host Architecture:** Linux Containerized Multi-Tier Cluster (Docker Compose / Kubernetes)  
**Primary Target Domains:**  
- Public Portal: `https://bioriver.in`  
- Intelligence Application: `https://app.bioriver.in`  
- REST / PostGIS API: `https://api.bioriver.in`  
**Status:** PRODUCTION READY  

---

## 1. Domain & DNS Routing Architecture

| Domain | Target Upstream | Description | SSL Certificate |
| :--- | :--- | :--- | :--- |
| `bioriver.in` | Frontend Web Container (Port 80/443) | Public Landing Page, Methodology, Technology, Team | Let's Encrypt / Certbot Auto-renew |
| `app.bioriver.in` | Frontend App SPA (Port 80/443) | Secured Analytical Platform, GIS Map, Simulation | Let's Encrypt / Certbot Auto-renew |
| `api.bioriver.in` | FastAPI Backend (Uvicorn Port 8000) | REST API, PostGIS, Auth, PDF Generation | Let's Encrypt / Certbot Auto-renew |

---

## 2. Environment Variables & Secrets Management

Store secrets in production `.env` (never committed to Git repository):

```bash
# Production Database
DATABASE_URL=postgresql://bioriver_admin:STRONG_DB_PASSWORD@postgres:5432/bioriver_db

# Security & Authentication
SECRET_KEY=PROD_HIGH_ENTROPY_HEX_SECRET_KEY_MIN_64_CHARS
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=480

# Map Services
VITE_MAPTILER_API_KEY=YOUR_MAPTILER_PRODUCTION_KEY

# Earth Observation Providers (Optional / As Credentials Become Available)
CDSE_CLIENT_ID=your_copernicus_client_id
CDSE_CLIENT_SECRET=your_copernicus_client_secret
GEE_SERVICE_ACCOUNT_JSON=/run/secrets/gee_credentials.json

# CORS Allowed Origins
CORS_ORIGINS=https://bioriver.in,https://app.bioriver.in
```

---

## 3. Reverse Proxy Configuration (Nginx)

```nginx
# /etc/nginx/sites-available/bioriver.conf

# 1. Public Portal & SPA
server {
    listen 80;
    server_name bioriver.in app.bioriver.in;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    server_name bioriver.in app.bioriver.in;

    ssl_certificate /etc/letsencrypt/live/bioriver.in/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/bioriver.in/privkey.pem;

    root /var/www/bioriver/frontend/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Security Headers
    add_header X-Frame-Options "DENY";
    add_header X-Content-Type-Options "nosniff";
    add_header Referrer-Policy "strict-origin-when-cross-origin";
}

# 2. REST API & PostGIS Backend
server {
    listen 443 ssl http2;
    server_name api.bioriver.in;

    ssl_certificate /etc/letsencrypt/live/api.bioriver.in/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/api.bioriver.in/privkey.pem;

    location / {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

---

## 4. Docker Compose Orchestration

```bash
# Launch Production Stack
docker compose -f docker-compose.yml up -d --build

# Run Database Migrations
docker compose exec backend python -c "from app.database import Base, engine; Base.metadata.create_all(bind=engine)"

# Verify Backend Logs
docker compose logs -f backend
```

---

## 5. Security & Pre-Launch Hardening Checklist

- [x] All default passwords changed in production environment variables.
- [x] CORS restricted to `https://bioriver.in` and `https://app.bioriver.in`.
- [x] JWT token expiration enforced with secure header extraction.
- [x] PostGIS spatial queries parameterized against SQL injection.
- [x] ReportLab PDF generation executes in isolated worker without executing arbitrary user markup.
- [x] MapTiler and Satellite credentials injected via environment variables only.
