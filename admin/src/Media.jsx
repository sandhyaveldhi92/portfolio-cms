import { useEffect, useState } from "react";

function Media() {
  const [media, setMedia] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  const loadMedia = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/media"
      );

      const data = await response.json();

      if (response.ok) {
        setMedia(data);
      } else {
        setMessage("Unable to load media.");
      }
    } catch (error) {
      setMessage("Unable to connect to the backend.");
    }

    setLoading(false);
  };

  useEffect(() => {
    loadMedia();
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      setSelectedFile(file);
      setMessage("");
    }
  };

  const handleUpload = async (event) => {
    event.preventDefault();

    if (!selectedFile) {
      setMessage("Please select an image first.");
      return;
    }

    setUploading(true);
    setMessage("");

    const formData = new FormData();

    formData.append("file", selectedFile);

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/upload/image",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(
          data.detail || "Unable to upload image."
        );
        setUploading(false);
        return;
      }

      setMessage("Image uploaded successfully.");
      setSelectedFile(null);

      document.getElementById("media-file").value = "";

      loadMedia();
    } catch (error) {
      setMessage("Unable to connect to the backend.");
    }

    setUploading(false);
  };

  return (
    <div className="content-page">
      <div className="content-header">
        <div>
          <h2>Media</h2>
          <p>
            Upload and manage images used in your portfolio.
          </p>
        </div>
      </div>

      <form
        className="content-form"
        onSubmit={handleUpload}
      >
        <label>Select Image</label>

        <input
          id="media-file"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />

        {selectedFile && (
          <p>
            Selected: {selectedFile.name}
          </p>
        )}

        <button
          type="submit"
          className="save-button"
          disabled={uploading}
        >
          {uploading
            ? "Uploading..."
            : "Upload Image"}
        </button>

        {message && (
          <div className="success-message">
            {message}
          </div>
        )}
      </form>

      <div className="skills-list">
        <h3>Uploaded Media</h3>

        {loading ? (
          <p>Loading media...</p>
        ) : media.length === 0 ? (
          <p>No media uploaded yet.</p>
        ) : (
          <div className="skills-table-wrapper">
            <table className="skills-table">
              <thead>
                <tr>
                  <th>Preview</th>
                  <th>Filename</th>
                  <th>File Path</th>
                </tr>
              </thead>

              <tbody>
                {media.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <img
                        src={`http://127.0.0.1:8000/${item.file_path.replace(
                          /\\/g,
                          "/"
                        )}`}
                        alt={item.filename}
                        style={{
                          width: "80px",
                          height: "60px",
                          objectFit: "cover",
                          borderRadius: "8px",
                        }}
                      />
                    </td>

                    <td>
                      {item.filename}
                    </td>

                    <td>
                      {item.file_path}
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

export default Media;