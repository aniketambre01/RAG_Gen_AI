from app.core.security import (
    hash_password,
    verify_password,
    create_access_token,
)

password = "Admin@123"

hashed = hash_password(password)

print("Hash:")
print(hashed)

print()

print(
    "Password Match:",
    verify_password(password, hashed),
)

print()

token = create_access_token(
    {"sub": "admin@example.com"}
)

print("JWT:")
print(token)