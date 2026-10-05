from app.database import SessionLocal
from app.models import User
from app.auth import hash_password


db = SessionLocal()

existing_user = db.query(User).filter(
    User.username == "admin"
).first()

if existing_user:
    print("Admin user already exists.")
else:
    user = User(
        username="admin",
        hashed_password=hash_password("admin123")
    )

    db.add(user)
    db.commit()

    print("Admin user created successfully.")

db.close()