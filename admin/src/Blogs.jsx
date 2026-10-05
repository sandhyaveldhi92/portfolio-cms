import { useEffect, useState } from "react";

function Blogs() {
  const [blogs, setBlogs] = useState([]);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const loadBlogs = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/blogs"
      );

      const data = await response.json();

      if (response.ok) {
        setBlogs(data);
      } else {
        setMessage("Unable to load blogs.");
      }
    } catch (error) {
      setMessage("Unable to connect to the backend.");
    }

    setLoading(false);
  };

  useEffect(() => {
    loadBlogs();
  }, []);

  const clearForm = () => {
    setTitle("");
    setContent("");
    setImage("");
    setEditingId(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");

    const blogData = {
      title: title,
      content: content,
      image: image,
    };

    try {
      let response;

      if (editingId) {
        response = await fetch(
          `http://127.0.0.1:8000/api/blogs/${editingId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(blogData),
          }
        );
      } else {
        response = await fetch(
          "http://127.0.0.1:8000/api/blogs",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(blogData),
          }
        );
      }

      const data = await response.json();

      if (!response.ok) {
        if (Array.isArray(data.detail)) {
          setMessage(
            data.detail[0]?.msg || "Unable to save blog."
          );
        } else {
          setMessage(
            data.detail || "Unable to save blog."
          );
        }

        return;
      }

      setMessage(
        editingId
          ? "Blog updated successfully."
          : "Blog added successfully."
      );

      clearForm();
      loadBlogs();
    } catch (error) {
      setMessage("Unable to connect to the backend.");
    }
  };

  const handleEdit = (blog) => {
    setEditingId(blog.id);
    setTitle(blog.title || "");
    setContent(blog.content || "");
    setImage(blog.image || "");
    setMessage("");
  };

  const handleDelete = async (blogId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this blog?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/blogs/${blogId}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(
          data.detail || "Unable to delete blog."
        );
        return;
      }

      setMessage("Blog deleted successfully.");

      if (editingId === blogId) {
        clearForm();
      }

      loadBlogs();
    } catch (error) {
      setMessage("Unable to connect to the backend.");
    }
  };

  return (
    <div className="content-page">
      <div className="content-header">
        <div>
          <h2>Blogs</h2>
          <p>
            Add, edit, and delete your blog posts.
          </p>
        </div>
      </div>

      <form
        className="content-form"
        onSubmit={handleSubmit}
      >
        <label>Blog Title</label>

        <input
          type="text"
          placeholder="Enter blog title"
          value={title}
          onChange={(event) =>
            setTitle(event.target.value)
          }
          required
        />

        <label>Blog Content</label>

        <textarea
          placeholder="Write your blog content"
          value={content}
          onChange={(event) =>
            setContent(event.target.value)
          }
          rows="8"
          required
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
              ? "Update Blog"
              : "Add Blog"}
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
        <h3>Existing Blogs</h3>

        {loading ? (
          <p>Loading blogs...</p>
        ) : blogs.length === 0 ? (
          <p>No blogs added yet.</p>
        ) : (
          <div className="skills-table-wrapper">
            <table className="skills-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Content</th>
                  <th>Image</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {blogs.map((blog) => (
                  <tr key={blog.id}>
                    <td>{blog.title}</td>

                    <td>
                      {blog.content
                        ? blog.content.length > 80
                          ? `${blog.content.substring(
                              0,
                              80
                            )}...`
                          : blog.content
                        : "-"}
                    </td>

                    <td>
                      {blog.image ? "Available" : "-"}
                    </td>

                    <td>
                      <button
                        className="edit-button"
                        onClick={() =>
                          handleEdit(blog)
                        }
                      >
                        Edit
                      </button>

                      <button
                        className="delete-button"
                        onClick={() =>
                          handleDelete(blog.id)
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

export default Blogs;