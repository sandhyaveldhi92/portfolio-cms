import { useEffect, useState } from "react";

function About() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/about")
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          setTitle(data.title || "");
          setDescription(data.description || "");
        }

        setLoading(false);
      })
      .catch(() => {
        setMessage("Unable to load About information.");
        setLoading(false);
      });
  }, []);

  const handleSave = async (event) => {
    event.preventDefault();
    setMessage("");

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/about",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: title,
            description: description,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        if (Array.isArray(data.detail)) {
          setMessage(data.detail[0]?.msg || "Unable to save.");
        } else {
          setMessage(
            data.detail || "Unable to save About information."
          );
        }

        return;
      }

      setMessage("About information saved successfully.");
    } catch (error) {
      setMessage("Unable to connect to the backend.");
    }
  };

  if (loading) {
    return (
      <div className="content-page">
        <p>Loading About information...</p>
      </div>
    );
  }

  return (
    <div className="content-page">
      <div className="content-header">
        <div>
          <h2>About</h2>
          <p>Manage your portfolio introduction.</p>
        </div>
      </div>

      <form
        className="content-form"
        onSubmit={handleSave}
      >
        <label>Title</label>

        <input
          type="text"
          value={title}
          onChange={(event) =>
            setTitle(event.target.value)
          }
          placeholder="Enter your title"
          required
        />

        <label>Description</label>

        <textarea
          value={description}
          onChange={(event) =>
            setDescription(event.target.value)
          }
          placeholder="Enter your description"
          rows="6"
          required
        />

        <button
          type="submit"
          className="save-button"
        >
          Save About
        </button>

        {message && (
          <div className="success-message">
            {message}
          </div>
        )}
      </form>
    </div>
  );
}

export default About;