import { useEffect, useState } from "react";

function Messages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState("");

  const loadMessages = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/messages"
      );

      const data = await response.json();

      if (response.ok) {
        setMessages(data);
      } else {
        setFeedback("Unable to load messages.");
      }
    } catch (error) {
      setFeedback("Unable to connect to the backend.");
    }

    setLoading(false);
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const handleDelete = async (messageId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this message?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/messages/${messageId}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setFeedback(
          data.detail || "Unable to delete message."
        );
        return;
      }

      setFeedback("Message deleted successfully.");
      loadMessages();
    } catch (error) {
      setFeedback("Unable to connect to the backend.");
    }
  };

  return (
    <div className="content-page">
      <div className="content-header">
        <div>
          <h2>Messages</h2>
          <p>
            View messages received from your portfolio contact form.
          </p>
        </div>
      </div>

      {feedback && (
        <div className="success-message">
          {feedback}
        </div>
      )}

      <div className="skills-list">
        <h3>Contact Messages</h3>

        {loading ? (
          <p>Loading messages...</p>
        ) : messages.length === 0 ? (
          <p>No messages received yet.</p>
        ) : (
          <div className="skills-table-wrapper">
            <table className="skills-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Subject</th>
                  <th>Message</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {messages.map((item) => (
                  <tr key={item.id}>
                    <td>
                      {item.name || "-"}
                    </td>

                    <td>
                      {item.email || "-"}
                    </td>

                    <td>
                      {item.subject || "-"}
                    </td>

                    <td>
                      {item.message
                        ? item.message.length > 120
                          ? `${item.message.substring(
                              0,
                              120
                            )}...`
                          : item.message
                        : "-"}
                    </td>

                    <td>
                      <button
                        className="delete-button"
                        onClick={() =>
                          handleDelete(item.id)
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

export default Messages;