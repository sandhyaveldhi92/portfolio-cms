import { useEffect, useState } from "react";

function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);

  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [role, setRole] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(true);

  const loadTestimonials = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/testimonials"
      );

      const data = await response.json();

      if (response.ok) {
        setTestimonials(data);
      } else {
        setFeedback("Unable to load testimonials.");
      }
    } catch (error) {
      setFeedback("Unable to connect to the backend.");
    }

    setLoading(false);
  };

  useEffect(() => {
    loadTestimonials();
  }, []);

  const clearForm = () => {
    setName("");
    setMessage("");
    setRole("");
    setEditingId(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFeedback("");

    const testimonialData = {
      name: name,
      message: message,
      role: role,
    };

    try {
      let response;

      if (editingId) {
        response = await fetch(
          `http://127.0.0.1:8000/api/testimonials/${editingId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(testimonialData),
          }
        );
      } else {
        response = await fetch(
          "http://127.0.0.1:8000/api/testimonials",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(testimonialData),
          }
        );
      }

      const data = await response.json();

      if (!response.ok) {
        if (Array.isArray(data.detail)) {
          setFeedback(
            data.detail[0]?.msg ||
              "Unable to save testimonial."
          );
        } else {
          setFeedback(
            data.detail ||
              "Unable to save testimonial."
          );
        }

        return;
      }

      setFeedback(
        editingId
          ? "Testimonial updated successfully."
          : "Testimonial added successfully."
      );

      clearForm();
      loadTestimonials();
    } catch (error) {
      setFeedback("Unable to connect to the backend.");
    }
  };

  const handleEdit = (testimonial) => {
    setEditingId(testimonial.id);

    setName(testimonial.name || "");
    setMessage(testimonial.message || "");
    setRole(testimonial.role || "");

    setFeedback("");
  };

  const handleDelete = async (testimonialId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this testimonial?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/testimonials/${testimonialId}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setFeedback(
          data.detail ||
            "Unable to delete testimonial."
        );
        return;
      }

      setFeedback(
        "Testimonial deleted successfully."
      );

      if (editingId === testimonialId) {
        clearForm();
      }

      loadTestimonials();
    } catch (error) {
      setFeedback("Unable to connect to the backend.");
    }
  };

  return (
    <div className="content-page">
      <div className="content-header">
        <div>
          <h2>Testimonials</h2>
          <p>
            Add, edit, and delete your testimonials.
          </p>
        </div>
      </div>

      <form
        className="content-form"
        onSubmit={handleSubmit}
      >
        <label>Name</label>

        <input
          type="text"
          placeholder="Example: Labmentrix"
          value={name}
          onChange={(event) =>
            setName(event.target.value)
          }
          required
        />

        <label>Message</label>

        <textarea
          placeholder="Enter testimonial message"
          value={message}
          onChange={(event) =>
            setMessage(event.target.value)
          }
          rows="6"
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
        />

        <div className="form-actions">
          <button
            type="submit"
            className="save-button"
          >
            {editingId
              ? "Update Testimonial"
              : "Add Testimonial"}
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

        {feedback && (
          <div className="success-message">
            {feedback}
          </div>
        )}
      </form>

      <div className="skills-list">
        <h3>Existing Testimonials</h3>

        {loading ? (
          <p>Loading testimonials...</p>
        ) : testimonials.length === 0 ? (
          <p>No testimonials added yet.</p>
        ) : (
          <div className="skills-table-wrapper">
            <table className="skills-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Message</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {testimonials.map((testimonial) => (
                  <tr key={testimonial.id}>
                    <td>
                      {testimonial.name || "-"}
                    </td>

                    <td>
                      {testimonial.message
                        ? testimonial.message.length > 100
                          ? `${testimonial.message.substring(
                              0,
                              100
                            )}...`
                          : testimonial.message
                        : "-"}
                    </td>

                    <td>
                      {testimonial.role || "-"}
                    </td>

                    <td>
                      <button
                        className="edit-button"
                        onClick={() =>
                          handleEdit(testimonial)
                        }
                      >
                        Edit
                      </button>

                      <button
                        className="delete-button"
                        onClick={() =>
                          handleDelete(
                            testimonial.id
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

export default Testimonials;