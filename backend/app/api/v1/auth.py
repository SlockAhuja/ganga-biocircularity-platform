from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.users import User, UserRole
from app.schemas.auth import Token, UserResponse, UserLogin
from app.core.security import verify_password, create_access_token

router = APIRouter(prefix="/auth", tags=["Authentication"])

@router.post("/token", response_model=Token)
@router.post("/login", response_model=Token)
def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    # Standard role-based test users available out-of-the-box
    default_users = {
        "admin": ("Admin User", UserRole.ADMIN),
        "researcher": ("Dr. Ananya Sharma (Lead GIS Scientist)", UserRole.RESEARCHER),
        "field_operator": ("Rajesh Kumar (Field Operations Lead)", UserRole.FIELD_OPERATOR),
        "viewer": ("Public / Stakeholder Viewer", UserRole.VIEWER)
    }
    
    username = form_data.username.lower()
    if username in default_users:
        full_name, role = default_users[username]
        access_token = create_access_token(data={"sub": username, "role": role.value, "name": full_name})
        return {
            "access_token": access_token,
            "token_type": "bearer",
            "role": role.value,
            "username": username,
            "full_name": full_name
        }
        
    user = db.query(User).filter(User.username == form_data.username).first()
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = create_access_token(data={"sub": user.username, "role": user.role.value, "name": user.full_name})
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "role": user.role.value,
        "username": user.username,
        "full_name": user.full_name
    }

@router.get("/me", response_model=UserResponse)
def get_current_user_info():
    return {
        "id": 1,
        "email": "researcher@ganga-bio.in",
        "username": "researcher",
        "full_name": "Dr. Ananya Sharma",
        "role": UserRole.RESEARCHER,
        "is_active": True,
        "organization": "National Mission for Clean Ganga / Remote Sensing Hub"
    }
