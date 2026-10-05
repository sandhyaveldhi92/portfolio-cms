from pydantic import BaseModel, ConfigDict
from typing import Optional


class UserCreate(BaseModel):
    username: str
    password: str


class UserResponse(BaseModel):
    id: int
    username: str

    model_config = ConfigDict(from_attributes=True)


class AboutBase(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None


class AboutCreate(AboutBase):
    pass


class AboutResponse(AboutBase):
    id: int

    model_config = ConfigDict(from_attributes=True)


class SkillBase(BaseModel):
    name: str
    category: Optional[str] = None
    level: Optional[str] = None


class SkillCreate(SkillBase):
    pass


class SkillResponse(SkillBase):
    id: int

    model_config = ConfigDict(from_attributes=True)


class ProjectBase(BaseModel):
    title: str
    description: Optional[str] = None
    technologies: Optional[str] = None
    github_url: Optional[str] = None
    live_url: Optional[str] = None
    image: Optional[str] = None


class ProjectCreate(ProjectBase):
    pass


class ProjectResponse(ProjectBase):
    id: int

    model_config = ConfigDict(from_attributes=True)


class BlogBase(BaseModel):
    title: str
    content: Optional[str] = None
    image: Optional[str] = None


class BlogCreate(BlogBase):
    pass


class BlogResponse(BlogBase):
    id: int

    model_config = ConfigDict(from_attributes=True)


class ExperienceBase(BaseModel):
    company: Optional[str] = None
    role: Optional[str] = None
    description: Optional[str] = None
    start_date: Optional[str] = None
    end_date: Optional[str] = None


class ExperienceCreate(ExperienceBase):
    pass


class ExperienceResponse(ExperienceBase):
    id: int

    model_config = ConfigDict(from_attributes=True)


class TestimonialBase(BaseModel):
    name: Optional[str] = None
    message: Optional[str] = None
    role: Optional[str] = None


class TestimonialCreate(TestimonialBase):
    pass


class TestimonialResponse(TestimonialBase):
    id: int

    model_config = ConfigDict(from_attributes=True)


class ServiceBase(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None


class ServiceCreate(ServiceBase):
    pass


class ServiceResponse(ServiceBase):
    id: int

    model_config = ConfigDict(from_attributes=True)


class MessageCreate(BaseModel):
    name: str
    email: str
    subject: Optional[str] = None
    message: str


class MessageResponse(MessageCreate):
    id: int

    model_config = ConfigDict(from_attributes=True)


class MediaResponse(BaseModel):
    id: int
    filename: str
    file_path: str

    model_config = ConfigDict(from_attributes=True)