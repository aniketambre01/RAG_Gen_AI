from sqlalchemy.orm import Session
from app.core.security import (
    create_access_token,
    hash_password,
    verify_password,
)
from app.core.security import hash_password
from app.crud.user import create_user, get_user_by_email
from app.database.models.user import User
from app.schemas.auth import UserLogin, UserRegister

def register_user(
    db: Session,
    user_data: UserRegister,
) -> User:

    # Check whether email already exists
    existing_user = get_user_by_email(
        db,
        user_data.email,
    )

    if existing_user:
        raise ValueError("Email already registered")

    # Hash password
    hashed_password = hash_password(
        user_data.password
    )

    # Create database user
    user = User(
        name=user_data.name,
        email=user_data.email,
        hashed_password=hashed_password,
    )

    return create_user(db, user)

def login_user(
    db: Session,
    email: str,
    password: str,
):
    user = get_user_by_email(
        db,
        email,
    )

    if not user:
        raise ValueError("Invalid email or password")

    if not verify_password(
        password,
        user.hashed_password,
    ):
        raise ValueError("Invalid email or password")

    if not user.is_active:
        raise ValueError("User account is inactive")

    access_token = create_access_token(
        data={
            "sub": str(user.id),
        }
    )

    return access_token