import { useEffect, useState } from "react";

function Experience() {
  const [experiences, setExperiences] = useState([]);

  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const loadExperiences = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/experience"
      );

      const data = await response.json();

      if (response.ok) {
        setExperiences(data);
      } else {
        setMessage("Unable to load experience.");
      }
    } catch (error) {
      setMessage("Unable to connect to the backend.");
    }

    setLoading(false);
  };

  useEffect(() => {
    loadExperiences();
  }, []);

  const clearForm = () => {
    setCompany("");
    setRole("");
    setDescription("");
    setStartDate("");
    setEndDate("");
    setEditingId(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");

    const experienceData = {
      company: company,
      role: role,
      description: description,
      start_date: startDate,
      end_date: endDate,
    };

    try {
      let response;

      if (editingId) {
        response = await fetch(
          `http://127.0.0.1:8000/api/experience/${editingId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(experienceData),
          }
        );
      } else {
        response = await fetch(
          "http://127.0.0.1:8000/api/experience",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(experienceData),
          }
        );
      }

      const data = await response.json();

      if (!response.ok) {
        if (Array.isArray(data.detail)) {
          setMessage(
            data.detail[0]?.msg ||
              "Unable to save experience."
          );
        } else {
          setMessage(
            data.detail ||
              "Unable to save experience."
          );
        }

        return;
      }

      setMessage(
        editingId
          ? "Experience updated successfully."
          : "Experience added successfully."
      );

      clearForm();
      loadExperiences();
    } catch (error) {
      setMessage("Unable to connect to the backend.");
    }
  };

  const handleEdit = (experience) => {
    setEditingId(experience.id);

    setCompany(experience.company || "");
    setRole(experience.role || "");
    setDescription(experience.description || "");
    setStartDate(experience.start_date || "");
    setEndDate(experience.end_date || "");

    setMessage("");
  };

  const handleDelete = async (experienceId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this experience?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/experience/${experienceId}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(
          data.detail ||
            "Unable to delete experience."
        );
        return;
      }

      setMessage(
        "Experience deleted successfully."
      );

      if (editingId === experienceId) {
        clearForm();
      }

      loadExperiences();
    } catch (error) {
      setMessage("Unable to connect to the backend.");
    }
  };

  return (
    <div className="content-page">
      <div className="content-header">
        <div>
          <h2>Experience</h2>
          <p>
            Add, edit, and delete your work experience.
          </p>
        </div>
      </div>

      <form
        className="content-form"
        onSubmit={handleSubmit}
      >
        <label>Company</label>

        <input
          type="text"
          placeholder="Example: Labmentrix"
          value={company}
          onChange={(event) =>
            setCompany(event.target.value)
          }
          required
        />

        <label>Role</label>

        <input
          type="text"
          placeholder="Example: Python Development Intern"
          value={role}
          onChange={(event) =>
            setRole(event.target.value)
          }
          required
        />

        <label>Description</label>

        <textarea
          placeholder="Describe your work and responsibilities"
          value={description}
          onChange={(event) =>
            setDescription(event.target.value)
          }
          rows="6"
        />

        <label>Start Date</label>

        <input
          type="text"
          placeholder="Example: August 2026"
          value={startDate}
          onChange={(event) =>
            setStartDate(event.target.value)
          }
        />

        <label>End Date</label>

        <input
          type="text"
          placeholder="Example: Present"
          value={endDate}
          onChange={(event) =>
            setEndDate(event.target.value)
          }
        />

        <div className="form-actions">
          <button
            type="submit"
            className="save-button"
          >
            {editingId
              ? "Update Experience"
              : "Add Experience"}
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
        <h3>Existing Experience</h3>

        {loading ? (
          <p>Loading experience...</p>
        ) : experiences.length === 0 ? (
          <p>No experience added yet.</p>
        ) : (
          <div className="skills-table-wrapper">
            <table className="skills-table">
              <thead>
                <tr>
                  <th>Company</th>
                  <th>Role</th>
                  <th>Start</th>
                  <th>End</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {experiences.map((experience) => (
                  <tr key={experience.id}>
                    <td>
                      {experience.company || "-"}
                    </td>

                    <td>
                      {experience.role || "-"}
                    </td>

                    <td>
                      {experience.start_date || "-"}
                    </td>

                    <td>
                      {experience.end_date || "-"}
                    </td>

                    <td>
                      <button
                        className="edit-button"
                        onClick={() =>
                          handleEdit(experience)
                        }
                      >
                        Edit
                      </button>

                      <button
                        className="delete-button"
                        onClick={() =>
                          handleDelete(
                            experience.id
                          )
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

export default Experience;