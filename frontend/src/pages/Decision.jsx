import { useState } from "react";

export default function Decision({ profile, onDecisionComplete }) {

  const [decision, setDecision] = useState("");

  const [options, setOptions] = useState([
    "",
    ""
  ]);

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

    if (!profile) {
      alert("Twin Profile is missing. Please build your Twin first.");
      return;
    }

    if (!decision.trim()) {
      alert("Please enter the decision you are facing.");
      return;
    }

    if (options.some((option) => !option.trim())) {
      alert("Please enter both options.");
      return;
    }

    if (!currentSituation.trim()) {
      alert("Please describe what is happening right now.");
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
            user_id: profile.user_id,
            decision: decision,
            options: options,
            current_situation: currentSituation,
            twin_profile: profile
          })
        }
      );

      if (!response.ok) {

        const errorData = await response
          .json()
          .catch(() => null);

        throw new Error(
          errorData?.detail ||
          "Unable to analyze decision."
        );
      }

      const data = await response.json();

      onDecisionComplete(data);

    } catch (error) {

      console.error("Decision error:", error);

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
          Tell Mirror Mind what you are deciding,
          what your options are, and what is happening right now.
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
              placeholder="Example: Should I learn Python or Java first?"
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


          {/* Current situation */}

          <div style={{ marginTop: "28px" }}>

            <label className="label">
              What's happening right now?
            </label>

            <textarea
              className="textarea"
              value={currentSituation}
              onChange={(event) =>
                setCurrentSituation(event.target.value)
              }
              placeholder="Describe the situation, constraints, priorities, or anything else that matters for this decision..."
              rows={5}
            />

            <p
              className="muted"
              style={{
                marginTop: "8px",
                fontSize: "0.85rem"
              }}
            >
              Mirror Mind will identify the relevant decision
              factors automatically.
            </p>

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
          Mirror Mind will identify what matters to you,
          explain its recommendation, and show what could change it.
        </p>

      </div>

    </div>
  );
}