# BioRiver Installation & Local Setup Guide

This guide details step-by-step instructions for provisioning and running the complete **BioRiver** platform locally on development machines or dedicated staging servers.

---

## 1. Prerequisites

Ensure the following tools are installed:
- **Node.js**: v18+ or v20+ (`node -v`, `npm -v`)
- **Python**: v3.11+ or v3.12+ (`python --version` or `py --version`)
- **Docker & Docker Compose**: (Optional for containerized deployment)
- **PostgreSQL + PostGIS**: (Optional for production spatial DB, SQLite fallback included)

---

## 2. Quick Local Start (Development Mode)

### Step 2.1: Clone and Configure Environment

```bash
git clone https://github.com/SlockAhuja/ganga-biocircularity-platform.git bioriver
cd bioriver
cp .env.example .env
```

### Step 2.2: Backend Installation & Seed

```bash
cd backend
python -m venv venv
# On Windows:
.\venv\Scripts\activate
# On Linux/macOS:
# source venv/bin/activate

pip install -r requirements.txt

# Run demo database seeding (initializes Prayagraj reaches & stations)
python scripts/seed_demo_data.py

# Run test suite
pytest tests

# Launch FastAPI development server (port 8000)
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

### Step 2.3: Frontend Installation & Launch

Open a second terminal window:

```bash
cd frontend
npm install
npm run build
npm run dev
```

Visit **`http://localhost:5173`** to access the application.

---

## 3. Demo Credentials

The local seed provisions the following accounts:

| Role | Email | Password | Primary Permissions |
|---|---|---|---|
| **Admin** | `admin@bioriver.in` | `bioriver2026` | Full platform management, calibration factors, users |
| **Researcher** | `researcher@bioriver.in` | `bioriver2026` | GIS analysis, biomass/bioenergy simulations, PDF reports |
| **Field Operator** | `operator@bioriver.in` | `bioriver2026` | Mobile observation logging, water sampling, harvesting logs |
| **Policy Analyst** | `analyst@bioriver.in` | `bioriver2026` | LCA carbon accounting, economics, circularity scoring |

---

## 4. Docker Containerized Execution

To run the entire multi-container stack (FastAPI Backend, React Frontend, PostgreSQL/PostGIS, Redis Queue):

```bash
docker compose up --build
```

Health check endpoints:
- Frontend: `http://localhost:3000` or `http://localhost:5173`
- Backend API: `http://localhost:8000`
- Swagger OpenAPI Docs: `http://localhost:8000/api/v1/docs`
- Health Endpoint: `http://localhost:8000/health`
