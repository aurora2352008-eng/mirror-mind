import { useState } from "react";

export default function Feedback({ decision, onComplete }) {
  const [feedback, setFeedback] = useState("");
  const [outcome, setOutcome] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const submitFeedback = () => {
    if (!feedback.trim() || !outcome.trim()) {
      alert("Please describe the feedback and actual outcome.");
      return;
    }

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="page">
        <div className="container">
          <div
            className="card"
            style={{
              maxWidth: "700px",
              margin: "100px auto",
              textAlign: "center"
            }}
          >
            <span className="badge">
              TWIN UPDATED
            </span>

            <h1
              className="page-title"
              style={{
                fontSize: "3.5rem",
                marginTop: "18px"
              }}
            >
              Mirror Mind
              <br />
              learned from this decision.
            </h1>

            <p
              className="muted"
              style={{
                marginTop: "18px",
                lineHeight: "1.7"
              }}
            >
              Your feedback and actual outcome can now be used to
              improve how the Twin understands your future decisions.
            </p>

            <button
              className="primary-button"
              style={{ marginTop: "28px" }}
              onClick={onComplete}
            >
              Return to Twin Profile →
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="container">

        <span className="badge">
          STEP 05 · LEARN FROM THE OUTCOME
        </span>

        <h1 className="page-title" style={{ marginTop: "18px" }}>
          What actually
          <br />
          happened?
        </h1>

        <p className="page-subtitle">
          Mirror Mind compares its recommendation with what actually
          happened so the Twin can become more useful over time.
        </p>

        {/* Previous recommendation */}
        {decision && (
          <div
            className="card"
            style={{
              maxWidth: "800px",
              margin: "40px auto 0"
            }}
          >
            <span className="badge">
              PREVIOUS RECOMMENDATION
            </span>

            <h2
              className="section-title"
              style={{ marginTop: "14px" }}
            >
              {decision.recommendation}
            </h2>

            <p
              className="muted"
              style={{
                marginTop: "10px",
                lineHeight: "1.6"
              }}
            >
              Now tell Mirror Mind what happened after you made
              the decision.
            </p>
          </div>
        )}

        {/* Feedback form */}
        <div
          className="card"
          style={{
            maxWidth: "800px",
            margin: "24px auto 0"
          }}
        >

          <div>
            <label className="label">
              How useful was the recommendation?
            </label>

            <textarea
              className="textarea"
              value={feedback}
              onChange={(event) =>
                setFeedback(event.target.value)
              }
              placeholder="Example: The recommendation was useful because..."
            />
          </div>

          <div style={{ marginTop: "24px" }}>
            <label className="label">
              What was the actual outcome?
            </label>

            <textarea
              className="textarea"
              value={outcome}
              onChange={(event) =>
                setOutcome(event.target.value)
              }
              placeholder="Example: I submitted the project today and managed to fix the most important issues."
            />
          </div>

          <button
            className="primary-button"
            style={{
              width: "100%",
              marginTop: "24px"
            }}
            onClick={submitFeedback}
          >
            Update My Twin →
          </button>

        </div>

        <p
          className="muted"
          style={{
            textAlign: "center",
            marginTop: "18px",
            fontSize: "0.85rem"
          }}
        >
          Your feedback helps Mirror Mind understand future
          decisions more accurately.
        </p>

      </div>
    </div>
  );
}