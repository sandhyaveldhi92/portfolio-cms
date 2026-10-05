import { useEffect, useState } from "react";

function Skills() {
  const [skills, setSkills] = useState([]);

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [level, setLevel] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const loadSkills = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/skills"
      );

      const data = await response.json();

      if (response.ok) {
        setSkills(data);
      } else {
        setMessage("Unable to load skills.");
      }
    } catch (error) {
      setMessage("Unable to connect to the backend.");
    }

    setLoading(false);
  };

  useEffect(() => {
    loadSkills();
  }, []);

  const clearForm = () => {
    setName("");
    setCategory("");
    setLevel("");
    setEditingId(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");

    const skillData = {
      name: name,
      category: category,
      level: level,
    };

    try {
      let response;

      if (editingId) {
        response = await fetch(
          `http://127.0.0.1:8000/api/skills/${editingId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(skillData),
          }
        );
      } else {
        response = await fetch(
          "http://127.0.0.1:8000/api/skills",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(skillData),
          }
        );
      }

      const data = await response.json();

      if (!response.ok) {
        if (Array.isArray(data.detail)) {
          setMessage(
            data.detail[0]?.msg || "Unable to save skill."
          );
        } else {
          setMessage(
            data.detail || "Unable to save skill."
          );
        }

        return;
      }

      setMessage(
        editingId
          ? "Skill updated successfully."
          : "Skill added successfully."
      );

      clearForm();
      loadSkills();
    } catch (error) {
      setMessage("Unable to connect to the backend.");
    }
  };

  const handleEdit = (skill) => {
    setEditingId(skill.id);
    setName(skill.name || "");
    setCategory(skill.category || "");
    setLevel(skill.level || "");
    setMessage("");
  };

  const handleDelete = async (skillId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this skill?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/skills/${skillId}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(
          data.detail || "Unable to delete skill."
        );
        return;
      }

      setMessage("Skill deleted successfully.");

      if (editingId === skillId) {
        clearForm();
      }

      loadSkills();
    } catch (error) {
      setMessage("Unable to connect to the backend.");
    }
  };

  return (
    <div className="content-page">
      <div className="content-header">
        <div>
          <h2>Skills</h2>
          <p>
            Add, edit, and delete your technical skills.
          </p>
        </div>
      </div>

      <form
        className="content-form"
        onSubmit={handleSubmit}
      >
        <label>Skill Name</label>

        <input
          type="text"
          placeholder="Example: Python"
          value={name}
          onChange={(event) =>
            setName(event.target.value)
          }
          required
        />

        <label>Category</label>

        <input
          type="text"
          placeholder="Example: Programming Language"
          value={category}
          onChange={(event) =>
            setCategory(event.target.value)
          }
        />

        <label>Level</label>

        <input
          type="text"
          placeholder="Example: Intermediate"
          value={level}
          onChange={(event) =>
            setLevel(event.target.value)
          }
        />

        <div className="form-actions">
          <button
            type="submit"
            className="save-button"
          >
            {editingId ? "Update Skill" : "Add Skill"}
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
        <h3>Existing Skills</h3>

        {loading ? (
          <p>Loading skills...</p>
        ) : skills.length === 0 ? (
          <p>No skills added yet.</p>
        ) : (
          <div className="skills-table-wrapper">
            <table className="skills-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Level</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {skills.map((skill) => (
                  <tr key={skill.id}>
                    <td>{skill.name}</td>
                    <td>{skill.category || "-"}</td>
                    <td>{skill.level || "-"}</td>

                    <td>
                      <button
                        className="edit-button"
                        onClick={() =>
                          handleEdit(skill)
                        }
                      >
                        Edit
                      </button>

                      <button
                        className="delete-button"
                        onClick={() =>
                          handleDelete(skill.id)
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

export default Skills;