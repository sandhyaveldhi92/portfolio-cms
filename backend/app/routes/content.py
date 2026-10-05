from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from ..database import get_db
from .. import crud, schemas


router = APIRouter(
    prefix="/api",
    tags=["Content"]
)


# -------------------------
# About
# -------------------------

@router.get("/about")
def get_about(db: Session = Depends(get_db)):
    about = crud.get_about(db)

    if not about:
        return None

    return about


@router.post("/about")
def create_about(
    data: schemas.AboutCreate,
    db: Session = Depends(get_db)
):
    existing = crud.get_about(db)

    if existing:
        raise HTTPException(
            status_code=400,
            detail="About section already exists."
        )

    return crud.create_about(db, data)


@router.put("/about")
def update_about(
    data: schemas.AboutCreate,
    db: Session = Depends(get_db)
):
    about = crud.get_about(db)

    if not about:
        raise HTTPException(
            status_code=404,
            detail="About section not found."
        )

    return crud.update_about(db, about, data)


# -------------------------
# Skills
# -------------------------

@router.get("/skills")
def get_skills(db: Session = Depends(get_db)):
    return crud.get_skills(db)


@router.post("/skills")
def create_skill(
    data: schemas.SkillCreate,
    db: Session = Depends(get_db)
):
    return crud.create_skill(db, data)


@router.put("/skills/{skill_id}")
def update_skill(
    skill_id: int,
    data: schemas.SkillCreate,
    db: Session = Depends(get_db)
):
    skill = crud.get_skill(db, skill_id)

    if not skill:
        raise HTTPException(
            status_code=404,
            detail="Skill not found."
        )

    return crud.update_skill(db, skill, data)


@router.delete("/skills/{skill_id}")
def delete_skill(
    skill_id: int,
    db: Session = Depends(get_db)
):
    skill = crud.get_skill(db, skill_id)

    if not skill:
        raise HTTPException(
            status_code=404,
            detail="Skill not found."
        )

    crud.delete_skill(db, skill)

    return {
        "message": "Skill deleted successfully."
    }


# -------------------------
# Projects
# -------------------------

@router.get("/projects")
def get_projects(db: Session = Depends(get_db)):
    return crud.get_projects(db)


@router.post("/projects")
def create_project(
    data: schemas.ProjectCreate,
    db: Session = Depends(get_db)
):
    return crud.create_project(db, data)


@router.put("/projects/{project_id}")
def update_project(
    project_id: int,
    data: schemas.ProjectCreate,
    db: Session = Depends(get_db)
):
    project = crud.get_project(db, project_id)

    if not project:
        raise HTTPException(
            status_code=404,
            detail="Project not found."
        )

    return crud.update_project(db, project, data)


@router.delete("/projects/{project_id}")
def delete_project(
    project_id: int,
    db: Session = Depends(get_db)
):
    project = crud.get_project(db, project_id)

    if not project:
        raise HTTPException(
            status_code=404,
            detail="Project not found."
        )

    crud.delete_project(db, project)

    return {
        "message": "Project deleted successfully."
    }


# -------------------------
# Blogs
# -------------------------

@router.get("/blogs")
def get_blogs(db: Session = Depends(get_db)):
    return crud.get_blogs(db)


@router.post("/blogs")
def create_blog(
    data: schemas.BlogCreate,
    db: Session = Depends(get_db)
):
    return crud.create_blog(db, data)


@router.put("/blogs/{blog_id}")
def update_blog(
    blog_id: int,
    data: schemas.BlogCreate,
    db: Session = Depends(get_db)
):
    blog = crud.get_blog(db, blog_id)

    if not blog:
        raise HTTPException(
            status_code=404,
            detail="Blog not found."
        )

    return crud.update_blog(db, blog, data)


@router.delete("/blogs/{blog_id}")
def delete_blog(
    blog_id: int,
    db: Session = Depends(get_db)
):
    blog = crud.get_blog(db, blog_id)

    if not blog:
        raise HTTPException(
            status_code=404,
            detail="Blog not found."
        )

    crud.delete_blog(db, blog)

    return {
        "message": "Blog deleted successfully."
    }


# -------------------------
# Experience
# -------------------------

@router.get("/experience")
def get_experience(db: Session = Depends(get_db)):
    return crud.get_experience(db)


@router.post("/experience")
def create_experience(
    data: schemas.ExperienceCreate,
    db: Session = Depends(get_db)
):
    return crud.create_experience(db, data)


@router.put("/experience/{experience_id}")
def update_experience(
    experience_id: int,
    data: schemas.ExperienceCreate,
    db: Session = Depends(get_db)
):
    experience = crud.get_experience_item(
        db,
        experience_id
    )

    if not experience:
        raise HTTPException(
            status_code=404,
            detail="Experience not found."
        )

    return crud.update_experience(
        db,
        experience,
        data
    )


@router.delete("/experience/{experience_id}")
def delete_experience(
    experience_id: int,
    db: Session = Depends(get_db)
):
    experience = crud.get_experience_item(
        db,
        experience_id
    )

    if not experience:
        raise HTTPException(
            status_code=404,
            detail="Experience not found."
        )

    crud.delete_experience(db, experience)

    return {
        "message": "Experience deleted successfully."
    }


# -------------------------
# Testimonials
# -------------------------

@router.get("/testimonials")
def get_testimonials(db: Session = Depends(get_db)):
    return crud.get_testimonials(db)


@router.post("/testimonials")
def create_testimonial(
    data: schemas.TestimonialCreate,
    db: Session = Depends(get_db)
):
    return crud.create_testimonial(db, data)


@router.put("/testimonials/{testimonial_id}")
def update_testimonial(
    testimonial_id: int,
    data: schemas.TestimonialCreate,
    db: Session = Depends(get_db)
):
    testimonial = crud.get_testimonial(
        db,
        testimonial_id
    )

    if not testimonial:
        raise HTTPException(
            status_code=404,
            detail="Testimonial not found."
        )

    return crud.update_testimonial(
        db,
        testimonial,
        data
    )


@router.delete("/testimonials/{testimonial_id}")
def delete_testimonial(
    testimonial_id: int,
    db: Session = Depends(get_db)
):
    testimonial = crud.get_testimonial(
        db,
        testimonial_id
    )

    if not testimonial:
        raise HTTPException(
            status_code=404,
            detail="Testimonial not found."
        )

    crud.delete_testimonial(db, testimonial)

    return {
        "message": "Testimonial deleted successfully."
    }


# -------------------------
# Services
# -------------------------

@router.get("/services")
def get_services(db: Session = Depends(get_db)):
    return crud.get_services(db)


@router.post("/services")
def create_service(
    data: schemas.ServiceCreate,
    db: Session = Depends(get_db)
):
    return crud.create_service(db, data)


@router.put("/services/{service_id}")
def update_service(
    service_id: int,
    data: schemas.ServiceCreate,
    db: Session = Depends(get_db)
):
    service = crud.get_service(db, service_id)

    if not service:
        raise HTTPException(
            status_code=404,
            detail="Service not found."
        )

    return crud.update_service(
        db,
        service,
        data
    )


@router.delete("/services/{service_id}")
def delete_service(
    service_id: int,
    db: Session = Depends(get_db)
):
    service = crud.get_service(db, service_id)

    if not service:
        raise HTTPException(
            status_code=404,
            detail="Service not found."
        )

    crud.delete_service(db, service)

    return {
        "message": "Service deleted successfully."
    }


# -------------------------
# Contact Messages
# -------------------------

@router.post("/contact")
def create_contact_message(
    data: schemas.MessageCreate,
    db: Session = Depends(get_db)
):
    message = crud.create_message(db, data)

    return {
        "message": "Your message has been received.",
        "id": message.id
    }


@router.get("/messages")
def get_messages(db: Session = Depends(get_db)):
    return crud.get_messages(db)