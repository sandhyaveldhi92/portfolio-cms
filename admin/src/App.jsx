import { useState } from "react";
import "./App.css";

import About from "./About";
import Skills from "./Skills";
import Projects from "./Projects";
import Blogs from "./Blogs";
import Experience from "./Experience";
import Services from "./Services";
import Testimonials from "./Testimonials";
import Messages from "./Messages";
import Media from "./Media";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [loggedIn, setLoggedIn] = useState(
    Boolean(localStorage.getItem("access_token"))
  );

  const [currentPage, setCurrentPage] = useState("dashboard");

  const handleLogin = async (event) => {
    event.preventDefault();
    setError("");

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            username: username,
            password: password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        if (Array.isArray(data.detail)) {
          setError(
            data.detail[0]?.msg || "Login failed."
          );
        } else {
          setError(data.detail || "Login failed.");
        }

        return;
      }

      localStorage.setItem(
        "access_token",
        data.access_token
      );

      setLoggedIn(true);
      setCurrentPage("dashboard");
    } catch (error) {
      setError("Unable to connect to the backend.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    setLoggedIn(false);
    setCurrentPage("dashboard");
    setUsername("");
    setPassword("");
  };

  if (!loggedIn) {
    return (
      <div className="login-page">
        <div className="login-card">
          <h1>Portfolio CMS</h1>

          <p className="subtitle">
            Admin Panel Login
          </p>

          <form
            className="login-form"
            onSubmit={handleLogin}
          >
            <label>Username</label>

            <input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(event) =>
                setUsername(event.target.value)
              }
              required
            />

            <label>Password</label>

            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              required
            />

            {error && (
              <div className="error-message">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="login-button"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (currentPage === "about") {
    return (
      <ContentPage
        onBack={() => setCurrentPage("dashboard")}
        onLogout={handleLogout}
      >
        <About />
      </ContentPage>
    );
  }

  if (currentPage === "skills") {
    return (
      <ContentPage
        onBack={() => setCurrentPage("dashboard")}
        onLogout={handleLogout}
      >
        <Skills />
      </ContentPage>
    );
  }

  if (currentPage === "projects") {
    return (
      <ContentPage
        onBack={() => setCurrentPage("dashboard")}
        onLogout={handleLogout}
      >
        <Projects />
      </ContentPage>
    );
  }

  if (currentPage === "blogs") {
    return (
      <ContentPage
        onBack={() => setCurrentPage("dashboard")}
        onLogout={handleLogout}
      >
        <Blogs />
      </ContentPage>
    );
  }

  if (currentPage === "experience") {
    return (
      <ContentPage
        onBack={() => setCurrentPage("dashboard")}
        onLogout={handleLogout}
      >
        <Experience />
      </ContentPage>
    );
  }

  if (currentPage === "services") {
    return (
      <ContentPage
        onBack={() => setCurrentPage("dashboard")}
        onLogout={handleLogout}
      >
        <Services />
      </ContentPage>
    );
  }

  if (currentPage === "testimonials") {
    return (
      <ContentPage
        onBack={() => setCurrentPage("dashboard")}
        onLogout={handleLogout}
      >
        <Testimonials />
      </ContentPage>
    );
  }

  if (currentPage === "messages") {
    return (
      <ContentPage
        onBack={() => setCurrentPage("dashboard")}
        onLogout={handleLogout}
      >
        <Messages />
      </ContentPage>
    );
  }

  if (currentPage === "media") {
    return (
      <ContentPage
        onBack={() => setCurrentPage("dashboard")}
        onLogout={handleLogout}
      >
        <Media />
      </ContentPage>
    );
  }

  return (
    <div className="dashboard-page">
      <header className="dashboard-header">
        <div>
          <h1>Portfolio CMS</h1>
          <p>Admin Dashboard</p>
        </div>

        <button
          className="logout-button"
          onClick={handleLogout}
        >
          Logout
        </button>
      </header>

      <main className="dashboard-content">
        <h2>Welcome, Admin 👋</h2>

        <p className="dashboard-description">
          Manage your portfolio content from this dashboard.
        </p>

        <div className="dashboard-grid">

          <div className="dashboard-card">
            <h3>About</h3>
            <p>
              Manage your portfolio introduction.
            </p>
            <button
              onClick={() =>
                setCurrentPage("about")
              }
            >
              Manage About
            </button>
          </div>

          <div className="dashboard-card">
            <h3>Skills</h3>
            <p>
              Manage your technical skills.
            </p>
            <button
              onClick={() =>
                setCurrentPage("skills")
              }
            >
              Manage Skills
            </button>
          </div>

          <div className="dashboard-card">
            <h3>Projects</h3>
            <p>
              Manage your portfolio projects.
            </p>
            <button
              onClick={() =>
                setCurrentPage("projects")
              }
            >
              Manage Projects
            </button>
          </div>

          <div className="dashboard-card">
            <h3>Blogs</h3>
            <p>
              Manage your blog posts.
            </p>
            <button
              onClick={() =>
                setCurrentPage("blogs")
              }
            >
              Manage Blogs
            </button>
          </div>

          <div className="dashboard-card">
            <h3>Experience</h3>
            <p>
              Manage your work experience.
            </p>
            <button
              onClick={() =>
                setCurrentPage("experience")
              }
            >
              Manage Experience
            </button>
          </div>

          <div className="dashboard-card">
            <h3>Services</h3>
            <p>
              Manage your services.
            </p>
            <button
              onClick={() =>
                setCurrentPage("services")
              }
            >
              Manage Services
            </button>
          </div>

          <div className="dashboard-card">
            <h3>Testimonials</h3>
            <p>
              Manage testimonials.
            </p>
            <button
              onClick={() =>
                setCurrentPage("testimonials")
              }
            >
              Manage Testimonials
            </button>
          </div>

          <div className="dashboard-card">
            <h3>Messages</h3>
            <p>
              View contact form messages.
            </p>
            <button
              onClick={() =>
                setCurrentPage("messages")
              }
            >
              View Messages
            </button>
          </div>

          <div className="dashboard-card">
            <h3>Media</h3>
            <p>
              Manage uploaded images and files.
            </p>
            <button
              onClick={() =>
                setCurrentPage("media")
              }
            >
              Manage Media
            </button>
          </div>

        </div>
      </main>
    </div>
  );
}

function ContentPage({
  children,
  onBack,
  onLogout,
}) {
  return (
    <div className="dashboard-page">
      <header className="dashboard-header">
        <div>
          <h1>Portfolio CMS</h1>
          <p>Admin Dashboard</p>
        </div>

        <button
          className="logout-button"
          onClick={onLogout}
        >
          Logout
        </button>
      </header>

      <main className="dashboard-content">
        <button
          className="back-button"
          onClick={onBack}
        >
          ← Back to Dashboard
        </button>

        {children}
      </main>
    </div>
  );
}

export default App;