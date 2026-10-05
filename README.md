# 🚀 Portfolio CMS

A full-stack personal portfolio website with a custom-built Content Management System (CMS).

The project allows portfolio content such as About, Skills, Projects, Experience, Services, Testimonials, and Blogs to be managed through a custom backend and displayed dynamically on the portfolio frontend.

---

## 📌 Project Overview

This project was developed as a full-stack portfolio platform using:

* React + Vite for the frontend
* React + Vite for the CMS/Admin panel
* FastAPI for the backend
* SQLite for the database
* REST APIs for frontend-backend communication
* JWT-based authentication for admin access

The main goal was to build a portfolio system from scratch rather than depending on an external headless CMS.

---

## 🏗️ Architecture

```text
                    ┌──────────────────────┐
                    │   Portfolio Frontend │
                    │     React + Vite     │
                    └──────────┬───────────┘
                               │
                               │ REST API
                               ▼
                    ┌──────────────────────┐
                    │    FastAPI Backend   │
                    │      Custom CMS      │
                    └──────────┬───────────┘
                               │
                  ┌────────────┴────────────┐
                  │                         │
                  ▼                         ▼
          ┌───────────────┐         ┌───────────────┐
          │ SQLite DB     │         │ Upload Storage│
          └───────────────┘         └───────────────┘
                              
                    ┌──────────────────────┐
                    │    Admin Panel       │
                    │     React + Vite     │
                    └──────────┬───────────┘
                               │
                               │ REST API
                               ▼
                    ┌──────────────────────┐
                    │    FastAPI Backend   │
                    └──────────────────────┘
```

---

## ✨ Features

### Portfolio Frontend

* Responsive portfolio interface
* Dynamic About section
* Dynamic Skills section
* Projects section
* Experience section
* Services section
* Testimonials section
* Blog section
* Contact form
* Backend API integration

### Custom CMS / Admin

* Admin authentication
* Content management
* Portfolio content APIs
* CRUD operations for portfolio content
* Media/upload API support
* Contact message management

### Contact System

The contact form communicates with the FastAPI backend.

```text
User submits form
       ↓
React Frontend
       ↓
POST /api/contact
       ↓
FastAPI Backend
       ↓
SQLite Database
       ↓
Contact message stored
```

Contact messages can also be retrieved through the backend API.

---

## 🛠️ Tech Stack

### Frontend

* React
* Vite
* JavaScript
* CSS
* REST API

### Admin Panel

* React
* Vite
* JavaScript
* CSS

### Backend

* Python
* FastAPI
* SQLAlchemy
* Pydantic
* JWT Authentication
* Uvicorn

### Database

* SQLite

### Development Tools

* Visual Studio Code
* Git
* GitHub
* Postman / Swagger UI

---

## 📁 Project Structure

```text
portfolio-cms/
│
├── admin/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── app/
│   │   ├── routes/
│   │   │   ├── auth.py
│   │   │   ├── content.py
│   │   │   └── media.py
│   │   │
│   │   ├── auth.py
│   │   ├── crud.py
│   │   ├── database.py
│   │   ├── main.py
│   │   ├── models.py
│   │   └── schemas.py
│   │
│   ├── create_admin.py
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   ├── lib/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
└── .gitignore
```

---

## 🔌 API Integration

The frontend communicates with the FastAPI backend using REST APIs.

Examples include:

```text
GET  /api/about
GET  /api/skills
GET  /api/projects
GET  /api/experience
GET  /api/services
GET  /api/testimonials
GET  /api/blogs
POST /api/contact
GET  /api/contact/messages
```

The Contact API accepts:

```json
{
  "name": "Sandhya",
  "email": "example@gmail.com",
  "subject": "Portfolio",
  "message": "Hello"
}
```

---

## 🗄️ Database

The project currently uses SQLite for local development.

The database stores portfolio-related content and contact messages.

Example entities include:

```text
Users
About
Skills
Projects
Blogs
Experience
Testimonials
Services
Messages
```

---

## 🔐 Authentication

The custom CMS includes admin authentication using JWT-based authentication.

The authentication system is used to protect administrator functionality and content management operations.

---

## ▶️ Running the Project Locally

### 1. Clone the repository

```bash
git clone https://github.com/sandhyaveldhi92/portfolio-cms.git
```

```bash
cd portfolio-cms
```

---

### 2. Backend Setup

Go to the backend:

```bash
cd backend
```

Create and activate a virtual environment:

### Windows

```powershell
python -m venv venv
```

```powershell
venv\Scripts\Activate.ps1
```

Install dependencies:

```powershell
pip install -r requirements.txt
```

Start the FastAPI server:

```powershell
python -m uvicorn app.main:app --reload
```

Backend:

```text
http://127.0.0.1:8000
```

Swagger API documentation:

```text
http://127.0.0.1:8000/docs
```

---

### 3. Frontend Setup

Open another terminal:

```powershell
cd frontend
```

Install dependencies:

```powershell
npm install
```

Start the development server:

```powershell
npm run dev
```

---

### 4. Admin Panel Setup

Open another terminal:

```powershell
cd admin
```

Install dependencies:

```powershell
npm install
```

Start the admin development server:

```powershell
npm run dev
```

---

## 🧪 API Testing

The backend APIs can be tested using FastAPI's built-in Swagger documentation.

Open:

```text
http://127.0.0.1:8000/docs
```

The Contact API was tested successfully using:

```text
POST /api/contact
```

and contact messages can be retrieved using:

```text
GET /api/contact/messages
```

---

## 📈 Future Improvements

Possible future improvements include:

* Production deployment
* PostgreSQL database migration
* Email notifications for contact messages
* Advanced media management
* Image optimization
* SEO improvements
* Production environment configuration
* Automated testing
* CI/CD pipeline
* Custom domain
* Analytics integration

---

## 🎯 Learning Outcomes

This project provided practical experience with:

* Full-stack web development
* React and Vite
* FastAPI
* REST API development
* Database integration
* JWT authentication
* CRUD operations
* Frontend-backend integration
* Git and GitHub
* API testing with Swagger
* Building a custom CMS

---

## 👩‍💻 Author

**Sandhya Veldhi**

GitHub:

https://github.com/sandhyaveldhi92

---

## 📄 License

This project is intended for educational, portfolio, and demonstration purposes.
