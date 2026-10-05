from fastapi import APIRouter, Depends, File, UploadFile
from sqlalchemy.orm import Session
import os
import shutil

from ..database import get_db
from .. import crud


router = APIRouter(
    prefix="/api/upload",
    tags=["Media Upload"]
)


UPLOAD_DIR = "uploads"

os.makedirs(UPLOAD_DIR, exist_ok=True)


@router.post("/image")
def upload_image(
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    file_path = os.path.join(
        UPLOAD_DIR,
        file.filename
    )

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(
            file.file,
            buffer
        )

    media = crud.create_media(
        db,
        file.filename,
        file_path
    )

    return {
        "message": "File uploaded successfully.",
        "filename": file.filename,
        "file_path": file_path,
        "id": media.id
    }