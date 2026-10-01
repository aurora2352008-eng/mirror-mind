import { useState } from "react";

export default function Decision({ profile, onDecisionComplete }) {
  const [decision, setDecision] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [currentSituation, setCurrentSituation] = useState("");
  const [loading, setLoading] = useState(false);

  const updateOption = (index, value) => {
    setOptions((previous) =>
      previous.map((option, optionIndex) =>
        optionIndex === index ? value : option
      )
    );
  };

  const analyzeDecision = async () => {
    if (
      !decision.trim() ||
      options.some((option) => !option.trim()) ||
      !currentSituation.trim()
    ) {
      alert(
        "Please enter the decision, both options, and the current situation."
      );
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/decision/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            user_id: profile?.user_id || "demo_user",
            decision: decision,
            options: options,
            current_situation: currentSituation,
            twin_profile: profile
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.detail || "Unable to analyze decision."
        );
      }

      onDecisionComplete({
        ...data,
        decision_context: {
          decision: decision,
          options: options,
          current_situation: currentSituation
        }
      });
    } catch (error) {
      console.error(error);

      alert(
        `Could not analyze the decision.\n\n${error.message}`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="container">

        <span className="badge">
          STEP 03 · ASK YOUR DECISION TWIN
        </span>

        <h1
          className="page-title"
          style={{ marginTop: "18px" }}
        >
          What decision
          <br />
          are you facing?
        </h1>

        <p className="page-subtitle">
          Give Mirror Mind the decision, the choices you are
          considering, and what is happening right now.
        </p>

        <div
          className="card"
          style={{
            maxWidth: "900px",
            margin: "40px auto 0"
          }}
        >

          {/* Decision */}
          <div>
            <label className="label">
              Your decision
            </label>

            <textarea
              className="textarea"
              value={decision}
              onChange={(event) =>
                setDecision(event.target.value)
              }
              placeholder="Example: Should I submit my project today or tomorrow?"
            />
          </div>

          {/* Options */}
          <div style={{ marginTop: "28px" }}>
            <label className="label">
              Options
            </label>

            <div className="grid grid-2">

              {options.map((option, index) => (
                <input
                  key={index}
                  className="input"
                  value={option}
                  onChange={(event) =>
                    updateOption(
                      index,
                      event.target.value
                    )
                  }
                  placeholder={`Option ${index + 1}`}
                />
              ))}

            </div>
          </div>

          {/* Current Situation */}
          <div style={{ marginTop: "28px" }}>

            <label className="label">
              Current situation
            </label>

            <textarea
              className="textarea"
              value={currentSituation}
              onChange={(event) =>
                setCurrentSituation(event.target.value)
              }
              placeholder="Describe what is happening right now and anything important that could affect the decision."
            />

          </div>

          {/* Analyze */}
          <div
            style={{
              marginTop: "32px",
              paddingTop: "24px",
              borderTop: "1px solid #e5e7eb"
            }}
          >
            <button
              className="primary-button"
              style={{
                width: "100%",
                padding: "15px"
              }}
              onClick={analyzeDecision}
              disabled={loading}
            >
              {loading
                ? "Mirror Mind is analyzing..."
                : "Analyze My Decision →"}
            </button>
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
          Mirror Mind uses your Twin Profile and current situation
          to explain its recommendation and what could change it.
        </p>

      </div>
    </div>
  );
}