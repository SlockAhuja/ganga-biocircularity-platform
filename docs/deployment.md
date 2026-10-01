# Deployment & Operations Guide

## 1. Docker Compose (Recommended)
Run the complete multi-tier system (Frontend + FastAPI Backend + PostGIS):

```bash
docker compose up --build
```

- **Frontend**: `http://localhost:5173` (or `http://localhost` in production)
- **Backend API & Swagger Docs**: `http://localhost:8000/api/v1/docs`
- **PostGIS Database**: `localhost:5432`

## 2. Local Development

### Backend Setup
```bash
cd backend
python -m venv venv
# On Windows:
.\venv\Scripts\activate
# On Linux/macOS:
source venv/bin/activate

pip install -r requirements.txt
python scripts/seed_demo_data.py
uvicorn app.main:app --reload --port 8000
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## 3. Testing
```bash
cd backend
pytest tests/
```
