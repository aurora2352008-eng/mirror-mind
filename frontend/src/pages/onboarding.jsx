import { useState } from "react";

export default function Onboarding({ onComplete }) {
  const [conversation, setConversation] = useState([
    {
      role: "assistant",
      text: "Hi! I'm Mirror Mind. I'd like to understand how you approach your academic life so I can become your decision twin."
    }
  ]);

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const addMessage = () => {
    const trimmedMessage = message.trim();

    if (!trimmedMessage) {
      return;
    }

    setConversation((previous) => [
      ...previous,
      {
        role: "user",
        text: trimmedMessage
      }
    ]);

    setMessage("");
  };

  const buildTwin = async () => {
    if (conversation.length <= 1) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://10.53.162.73:8000/onboarding/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          user_id: "demo_user",
          conversation: conversation
            .filter((item) => item.role === "user")
            .map((item) => item.text)
        })
      });

      if (!response.ok) {
        throw new Error("Unable to create Twin Profile.");
      }

      const data = await response.json();

      onComplete(data.twin_profile);
    } catch (error) {
      console.error(error);
      alert(
        "Could not connect to Mirror Mind. Make sure the FastAPI backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="container">

        <div className="row space-between">
          <div>
            <span className="badge">STEP 01 · BUILD YOUR TWIN</span>

            <h1 className="page-title">
              Let Mirror Mind
              <br />
              understand you.
            </h1>

            <p className="page-subtitle">
              Tell Mirror Mind about your goals, priorities, routines and
              preferences through a natural conversation.
            </p>
          </div>
        </div>

        <div
          className="card"
          style={{
            maxWidth: "820px",
            marginTop: "40px",
            marginLeft: "auto",
            marginRight: "auto"
          }}
        >

          <div
            style={{
              minHeight: "360px",
              maxHeight: "500px",
              overflowY: "auto",
              padding: "10px 0"
            }}
          >
            {conversation.map((item, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  justifyContent:
                    item.role === "user" ? "flex-end" : "flex-start",
                  marginBottom: "18px"
                }}
              >
                <div
                  style={{
                    maxWidth: "75%",
                    padding: "14px 17px",
                    borderRadius: "16px",
                    background:
                      item.role === "user" ? "#172554" : "#f1f5f9",
                    color: item.role === "user" ? "#ffffff" : "#334155",
                    lineHeight: "1.6"
                  }}
                >
                  {item.text}
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              borderTop: "1px solid #e5e7eb",
              paddingTop: "20px",
              marginTop: "10px"
            }}
          >
            <label className="label">
              Tell your Twin about yourself
            </label>

            <textarea
              className="textarea"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="For example: My main goal is to improve my academic performance. I usually study at night..."
            />

            <div
              className="row"
              style={{
                justifyContent: "flex-end",
                marginTop: "14px"
              }}
            >
              <button
                className="secondary-button"
                onClick={addMessage}
              >
                Add to Conversation
              </button>

              <button
                className="primary-button"
                onClick={buildTwin}
                disabled={loading}
              >
                {loading ? "Building Twin..." : "Build My Twin →"}
              </button>
            </div>
          </div>

        </div>

        <p
          className="muted"
          style={{
            textAlign: "center",
            marginTop: "18px",
            fontSize: "0.85rem"
          }}
        >
          Mirror Mind only uses information you choose to share.
        </p>

      </div>
    </div>
  );
}