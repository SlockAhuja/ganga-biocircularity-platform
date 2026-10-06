# BioRiver Security Architecture & Role-Based Access Control (RBAC)

This document describes the security controls, authentication mechanisms, and authorization policies implemented in the BioRiver platform.

---

## 1. Authentication & Token Management

- **Password Hashing**: Passwords are encrypted using **bcrypt** with standard salting. Plaintext passwords are never stored.
- **JWT (JSON Web Tokens)**: Stateless authentication using HMAC-SHA256 signature algorithm (`HS256`).
- **Token Expiration**: Configurable `ACCESS_TOKEN_EXPIRE_MINUTES` with automatic signature verification on protected routes.

---

## 2. Role-Based Access Control (RBAC)

BioRiver enforces four distinct operational roles:

| Role | Description | Scope of Authority |
|---|---|---|
| `ADMIN` | System Architect / Lead Administrator | Full control over user accounts, project registry, calibration constants, and server configuration. |
| `RESEARCHER` | Scientific Limnologist / Energy Engineer | Access to GIS Explorer, satellite processing, biomass simulation, assessment creation, and report generation. |
| `FIELD_OPERATOR` | River Operations / Boat Lead | Access to mobile field logging, ground-truth observations, and harvesting records. |
| `VIEWER` | Public / Academic Observer | Read-only access to published reaches, overview metrics, and public dashboards. |

---

## 3. Network & Data Security

- **CORS Policy**: Configurable `BACKEND_CORS_ORIGINS` restricting API access to authorized domains (`bioriver.in`, `app.bioriver.in`).
- **SQL Injection Prevention**: All database interactions use SQLAlchemy ORM with parameterized queries.
- **Input Validation**: All API request bodies and query parameters are strictly validated via Pydantic schemas.
- **Secrets Management**: Sensitive credentials, database connection strings, and secret keys are loaded strictly from environment variables (`.env`).
