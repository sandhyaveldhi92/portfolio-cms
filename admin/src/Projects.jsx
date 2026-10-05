import { useEffect, useState } from "react";

function Projects() {
  const [projects, setProjects] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [liveUrl, setLiveUrl] = useState("");
  const [image, setImage] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const loadProjects = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/projects"
      );

      const data = await response.json();

      if (response.ok) {
        setProjects(data);
      } else {
        setMessage("Unable to load projects.");
      }
    } catch (error) {
      setMessage("Unable to connect to the backend.");
    }

    setLoading(false);
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const clearForm = () => {
    setTitle("");
    setDescription("");
    setTechnologies("");
    setGithubUrl("");
    setLiveUrl("");
    setImage("");
    setEditingId(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");

    const projectData = {
      title: title,
      description: description,
      technologies: technologies,
      github_url: githubUrl,
      live_url: liveUrl,
      image: image,
    };

    try {
      let response;

      if (editingId) {
        response = await fetch(
          `http://127.0.0.1:8000/api/projects/${editingId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(projectData),
          }
        );
      } else {
        response = await fetch(
          "http://127.0.0.1:8000/api/projects",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(projectData),
          }
        );
      }

      const data = await response.json();

      if (!response.ok) {
        if (Array.isArray(data.detail)) {
          setMessage(
            data.detail[0]?.msg || "Unable to save project."
          );
        } else {
          setMessage(
            data.detail || "Unable to save project."
          );
        }

        return;
      }

      setMessage(
        editingId
          ? "Project updated successfully."
          : "Project added successfully."
      );

      clearForm();
      loadProjects();
    } catch (error) {
      setMessage("Unable to connect to the backend.");
    }
  };

  const handleEdit = (project) => {
    setEditingId(project.id);

    setTitle(project.title || "");
    setDescription(project.description || "");
    setTechnologies(project.technologies || "");
    setGithubUrl(project.github_url || "");
    setLiveUrl(project.live_url || "");
    setImage(project.image || "");

    setMessage("");
  };

  const handleDelete = async (projectId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this project?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/projects/${projectId}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(
          data.detail || "Unable to delete project."
        );
        return;
      }

      setMessage("Project deleted successfully.");

      if (editingId === projectId) {
        clearForm();
      }

      loadProjects();
    } catch (error) {
      setMessage("Unable to connect to the backend.");
    }
  };

  return (
    <div className="content-page">
      <div className="content-header">
        <div>
          <h2>Projects</h2>
          <p>
            Add, edit, and delete your portfolio projects.
          </p>
        </div>
      </div>

      <form
        className="content-form"
        onSubmit={handleSubmit}
      >
        <label>Project Title</label>

        <input
          type="text"
          placeholder="Example: Text-to-Speech Application"
          value={title}
          onChange={(event) =>
            setTitle(event.target.value)
          }
          required
        />

        <label>Description</label>

        <textarea
          placeholder="Enter project description"
          value={description}
          onChange={(event) =>
            setDescription(event.target.value)
          }
          rows="5"
        />

        <label>Technologies</label>

        <input
          type="text"
          placeholder="Example: Python, FastAPI, React, Vite"
          value={technologies}
          onChange={(event) =>
            setTechnologies(event.target.value)
          }
        />

        <label>GitHub URL</label>

        <input
          type="url"
          placeholder="https://github.com/username/project"
          value={githubUrl}
          onChange={(event) =>
            setGithubUrl(event.target.value)
          }
        />

        <label>Live URL</label>

        <input
          type="url"
          placeholder="https://example.com"
          value={liveUrl}
          onChange={(event) =>
            setLiveUrl(event.target.value)
          }
        />

        <label>Image URL</label>

        <input
          type="text"
          placeholder="Enter image path or URL"
          value={image}
          onChange={(event) =>
            setImage(event.target.value)
          }
        />

        <div className="form-actions">
          <button
            type="submit"
            className="save-button"
          >
            {editingId
              ? "Update Project"
              : "Add Project"}
          </button>

          {editingId && (
            <button
              type="button"
              className="cancel-button"
              onClick={clearForm}
            >
              Cancel
            </button>
          )}
        </div>

        {message && (
          <div className="success-message">
            {message}
          </div>
        )}
      </form>

      <div className="skills-list">
        <h3>Existing Projects</h3>

        {loading ? (
          <p>Loading projects...</p>
        ) : projects.length === 0 ? (
          <p>No projects added yet.</p>
        ) : (
          <div className="skills-table-wrapper">
            <table className="skills-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Technologies</th>
                  <th>GitHub</th>
                  <th>Live</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {projects.map((project) => (
                  <tr key={project.id}>
                    <td>{project.title}</td>

                    <td>
                      {project.technologies || "-"}
                    </td>

                    <td>
                      {project.github_url ? (
                        <a
                          href={project.github_url}
                          target="_blank"
                          rel="noreferrer"
                        >
                          GitHub
                        </a>
                      ) : (
                        "-"
                      )}
                    </td>

                    <td>
                      {project.live_url ? (
                        <a
                          href={project.live_url}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Live
                        </a>
                      ) : (
                        "-"
                      )}
                    </td>

                    <td>
                      <button
                        className="edit-button"
                        onClick={() =>
                          handleEdit(project)
                        }
                      >
                        Edit
                      </button>

                      <button
                        className="delete-button"
                        onClick={() =>
                          handleDelete(project.id)
                        }
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Projects;