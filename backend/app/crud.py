from sqlalchemy.orm import Session

from . import models


# -------------------------
# About
# -------------------------

def get_about(db: Session):
    return db.query(models.About).first()


def create_about(db: Session, data):
    about = models.About(**data.model_dump())
    db.add(about)
    db.commit()
    db.refresh(about)
    return about


def update_about(db: Session, about, data):
    for key, value in data.model_dump(exclude_unset=True).items():
        setattr(about, key, value)

    db.commit()
    db.refresh(about)

    return about


# -------------------------
# Skills
# -------------------------

def get_skills(db: Session):
    return db.query(models.Skill).all()


def create_skill(db: Session, data):
    skill = models.Skill(**data.model_dump())
    db.add(skill)
    db.commit()
    db.refresh(skill)
    return skill


def get_skill(db: Session, skill_id: int):
    return db.query(models.Skill).filter(
        models.Skill.id == skill_id
    ).first()


def update_skill(db: Session, skill, data):
    for key, value in data.model_dump(exclude_unset=True).items():
        setattr(skill, key, value)

    db.commit()
    db.refresh(skill)

    return skill


def delete_skill(db: Session, skill):
    db.delete(skill)
    db.commit()


# -------------------------
# Projects
# -------------------------

def get_projects(db: Session):
    return db.query(models.Project).all()


def create_project(db: Session, data):
    project = models.Project(**data.model_dump())
    db.add(project)
    db.commit()
    db.refresh(project)
    return project


def get_project(db: Session, project_id: int):
    return db.query(models.Project).filter(
        models.Project.id == project_id
    ).first()


def update_project(db: Session, project, data):
    for key, value in data.model_dump(exclude_unset=True).items():
        setattr(project, key, value)

    db.commit()
    db.refresh(project)

    return project


def delete_project(db: Session, project):
    db.delete(project)
    db.commit()


# -------------------------
# Blogs
# -------------------------

def get_blogs(db: Session):
    return db.query(models.Blog).all()


def create_blog(db: Session, data):
    blog = models.Blog(**data.model_dump())
    db.add(blog)
    db.commit()
    db.refresh(blog)
    return blog


def get_blog(db: Session, blog_id: int):
    return db.query(models.Blog).filter(
        models.Blog.id == blog_id
    ).first()


def update_blog(db: Session, blog, data):
    for key, value in data.model_dump(exclude_unset=True).items():
        setattr(blog, key, value)

    db.commit()
    db.refresh(blog)

    return blog


def delete_blog(db: Session, blog):
    db.delete(blog)
    db.commit()


# -------------------------
# Experience
# -------------------------

def get_experience(db: Session):
    return db.query(models.Experience).all()


def create_experience(db: Session, data):
    experience = models.Experience(**data.model_dump())
    db.add(experience)
    db.commit()
    db.refresh(experience)
    return experience


def get_experience_item(db: Session, experience_id: int):
    return db.query(models.Experience).filter(
        models.Experience.id == experience_id
    ).first()


def update_experience(db: Session, experience, data):
    for key, value in data.model_dump(exclude_unset=True).items():
        setattr(experience, key, value)

    db.commit()
    db.refresh(experience)

    return experience


def delete_experience(db: Session, experience):
    db.delete(experience)
    db.commit()


# -------------------------
# Testimonials
# -------------------------

def get_testimonials(db: Session):
    return db.query(models.Testimonial).all()


def create_testimonial(db: Session, data):
    testimonial = models.Testimonial(**data.model_dump())
    db.add(testimonial)
    db.commit()
    db.refresh(testimonial)
    return testimonial


def get_testimonial(db: Session, testimonial_id: int):
    return db.query(models.Testimonial).filter(
        models.Testimonial.id == testimonial_id
    ).first()


def update_testimonial(db: Session, testimonial, data):
    for key, value in data.model_dump(exclude_unset=True).items():
        setattr(testimonial, key, value)

    db.commit()
    db.refresh(testimonial)

    return testimonial


def delete_testimonial(db: Session, testimonial):
    db.delete(testimonial)
    db.commit()


# -------------------------
# Services
# -------------------------

def get_services(db: Session):
    return db.query(models.Service).all()


def create_service(db: Session, data):
    service = models.Service(**data.model_dump())
    db.add(service)
    db.commit()
    db.refresh(service)
    return service


def get_service(db: Session, service_id: int):
    return db.query(models.Service).filter(
        models.Service.id == service_id
    ).first()


def update_service(db: Session, service, data):
    for key, value in data.model_dump(exclude_unset=True).items():
        setattr(service, key, value)

    db.commit()
    db.refresh(service)

    return service


def delete_service(db: Session, service):
    db.delete(service)
    db.commit()


# -------------------------
# Messages
# -------------------------

def create_message(db: Session, data):
    message = models.Message(**data.model_dump())
    db.add(message)
    db.commit()
    db.refresh(message)
    return message


def get_messages(db: Session):
    return db.query(models.Message).all()


# -------------------------
# Media
# -------------------------

def create_media(db: Session, filename: str, file_path: str):
    media = models.Media(
        filename=filename,
        file_path=file_path
    )

    db.add(media)
    db.commit()
    db.refresh(media)

    return media


def get_media(db: Session):
    return db.query(models.Media).all()