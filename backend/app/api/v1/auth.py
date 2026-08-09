from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordRequestForm
from app.database.database import get_db
from app.schemas.auth import (
    Token,
    UserLogin,
    UserRegister,
)
from app.services.auth_service import (
    login_user,
    register_user,
)

from app.api.dependencies import get_current_user
from app.database.models.user import User


router = APIRouter(
    prefix="/auth",
    tags=["Authentication"],
)


@router.post("/register")
def register(
    user_data: UserRegister,
    db: Session = Depends(get_db),
):
    try:
        user = register_user(
            db,
            user_data,
        )

        return {
            "message": "User registered successfully",
            "user": {
                "id": user.id,
                "name": user.name,
                "email": user.email,
            },
        }

    except ValueError as e:
        raise HTTPException(
            status_code=400,
            detail=str(e),
        )

@router.post(
    "/login",
    response_model=Token,
)
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db),
):
    try:
        access_token = login_user(
            db,
            form_data.username,
            form_data.password,
        )

        return {
            "access_token": access_token,
            "token_type": "bearer",
        }

    except ValueError as e:
        raise HTTPException(
            status_code=401,
            detail=str(e),
        )

@router.get("/me")
def get_me(
    current_user: User = Depends(get_current_user),
):
    return {
        "id": current_user.id,
        "name": current_user.name,
        "email": current_user.email,
        "is_active": current_user.is_active,
    }