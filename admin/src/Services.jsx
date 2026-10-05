import { useEffect, useState } from "react";

function Services() {
  const [services, setServices] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const loadServices = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/services"
      );

      const data = await response.json();

      if (response.ok) {
        setServices(data);
      } else {
        setMessage("Unable to load services.");
      }
    } catch (error) {
      setMessage("Unable to connect to the backend.");
    }

    setLoading(false);
  };

  useEffect(() => {
    loadServices();
  }, []);

  const clearForm = () => {
    setTitle("");
    setDescription("");
    setEditingId(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");

    const serviceData = {
      title: title,
      description: description,
    };

    try {
      let response;

      if (editingId) {
        response = await fetch(
          `http://127.0.0.1:8000/api/services/${editingId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(serviceData),
          }
        );
      } else {
        response = await fetch(
          "http://127.0.0.1:8000/api/services",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(serviceData),
          }
        );
      }

      const data = await response.json();

      if (!response.ok) {
        if (Array.isArray(data.detail)) {
          setMessage(
            data.detail[0]?.msg ||
              "Unable to save service."
          );
        } else {
          setMessage(
            data.detail ||
              "Unable to save service."
          );
        }

        return;
      }

      setMessage(
        editingId
          ? "Service updated successfully."
          : "Service added successfully."
      );

      clearForm();
      loadServices();
    } catch (error) {
      setMessage("Unable to connect to the backend.");
    }
  };

  const handleEdit = (service) => {
    setEditingId(service.id);

    setTitle(service.title || "");
    setDescription(service.description || "");

    setMessage("");
  };

  const handleDelete = async (serviceId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this service?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/services/${serviceId}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(
          data.detail ||
            "Unable to delete service."
        );
        return;
      }

      setMessage("Service deleted successfully.");

      if (editingId === serviceId) {
        clearForm();
      }

      loadServices();
    } catch (error) {
      setMessage("Unable to connect to the backend.");
    }
  };

  return (
    <div className="content-page">
      <div className="content-header">
        <div>
          <h2>Services</h2>
          <p>
            Add, edit, and delete your services.
          </p>
        </div>
      </div>

      <form
        className="content-form"
        onSubmit={handleSubmit}
      >
        <label>Service Title</label>

        <input
          type="text"
          placeholder="Example: Web Development"
          value={title}
          onChange={(event) =>
            setTitle(event.target.value)
          }
          required
        />

        <label>Service Description</label>

        <textarea
          placeholder="Describe your service"
          value={description}
          onChange={(event) =>
            setDescription(event.target.value)
          }
          rows="6"
          required
        />

        <div className="form-actions">
          <button
            type="submit"
            className="save-button"
          >
            {editingId
              ? "Update Service"
              : "Add Service"}
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
        <h3>Existing Services</h3>

        {loading ? (
          <p>Loading services...</p>
        ) : services.length === 0 ? (
          <p>No services added yet.</p>
        ) : (
          <div className="skills-table-wrapper">
            <table className="skills-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {services.map((service) => (
                  <tr key={service.id}>
                    <td>
                      {service.title || "-"}
                    </td>

                    <td>
                      {service.description
                        ? service.description.length > 100
                          ? `${service.description.substring(
                              0,
                              100
                            )}...`
                          : service.description
                        : "-"}
                    </td>

                    <td>
                      <button
                        className="edit-button"
                        onClick={() =>
                          handleEdit(service)
                        }
                      >
                        Edit
                      </button>

                      <button
                        className="delete-button"
                        onClick={() =>
                          handleDelete(service.id)
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

export default Services;