from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .database import Base, engine
from . import models

from .routes.auth import router as auth_router
from .routes.content import router as content_router
from .routes.media import router as media_router


# Create database tables
Base.metadata.create_all(bind=engine)


# Create FastAPI application
app = FastAPI(
    title="Portfolio CMS API",
    description="Custom Portfolio CMS Backend",
    version="1.0.0"
)


# Allow React Admin Panel to communicate with FastAPI
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Register API routers
app.include_router(auth_router)
app.include_router(content_router)
app.include_router(media_router)


# Home endpoint
@app.get("/")
def home():
    return {
        "message": "Portfolio CMS API is running"
    }


# Health check endpoint
@app.get("/api/health")
def health():
    return {
        "status": "healthy"
    }