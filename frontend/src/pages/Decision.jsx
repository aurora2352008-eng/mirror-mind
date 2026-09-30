import { useState } from "react";

export default function Decision({ profile, onDecisionComplete }) {
  const [decision, setDecision] = useState(
    "Should I submit my project today or tomorrow?"
  );

  const [options, setOptions] = useState([
    "Submit today",
    "Submit tomorrow"
  ]);

  const [variables, setVariables] = useState({
    deadline: "Tomorrow",
    project_quality: "Needs improvement",
    stress: "High",
    remaining_work: "Moderate"
  });

  const [loading, setLoading] = useState(false);

  const updateOption = (index, value) => {
    setOptions((previous) =>
      previous.map((option, optionIndex) =>
        optionIndex === index ? value : option
      )
    );
  };

  const updateVariable = (key, value) => {
    setVariables((previous) => ({
      ...previous,
      [key]: value
    }));
  };

  const analyzeDecision = async () => {
    if (!decision.trim() || options.some((option) => !option.trim())) {
      alert("Please enter the decision and both options.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://10.53.162.73:8000/decision/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          user_id: profile?.user_id || "demo_user",
          decision: decision,
          options: options,
          variables: variables
        })
      });

      if (!response.ok) {
        throw new Error("Unable to analyze decision.");
      }

      const data = await response.json();

      onDecisionComplete(data);
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

        <span className="badge">
          STEP 03 · ASK YOUR DECISION TWIN
        </span>

        <h1 className="page-title" style={{ marginTop: "18px" }}>
          What decision
          <br />
          are you facing?
        </h1>

        <p className="page-subtitle">
          Give Mirror Mind the decision, the choices you are considering,
          and the conditions that are true right now.
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
              onChange={(event) => setDecision(event.target.value)}
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
                    updateOption(index, event.target.value)
                  }
                  placeholder={`Option ${index + 1}`}
                />
              ))}

            </div>
          </div>

          {/* Variables */}
          <div style={{ marginTop: "28px" }}>

            <div className="row space-between">
              <label className="label">
                Current situation
              </label>

              <span className="badge">
                Decision Variables
              </span>
            </div>

            <div className="grid grid-2">

              <div>
                <label className="label">
                  Deadline
                </label>

                <select
                  className="select"
                  value={variables.deadline}
                  onChange={(event) =>
                    updateVariable(
                      "deadline",
                      event.target.value
                    )
                  }
                >
                  <option>Today</option>
                  <option>Tomorrow</option>
                  <option>In 2 days</option>
                  <option>In 1 week</option>
                </select>
              </div>

              <div>
                <label className="label">
                  Project quality
                </label>

                <select
                  className="select"
                  value={variables.project_quality}
                  onChange={(event) =>
                    updateVariable(
                      "project_quality",
                      event.target.value
                    )
                  }
                >
                  <option>Good</option>
                  <option>Needs improvement</option>
                  <option>Poor</option>
                </select>
              </div>

              <div>
                <label className="label">
                  Stress level
                </label>

                <select
                  className="select"
                  value={variables.stress}
                  onChange={(event) =>
                    updateVariable(
                      "stress",
                      event.target.value
                    )
                  }
                >
                  <option>Low</option>
                  <option>Moderate</option>
                  <option>High</option>
                </select>
              </div>

              <div>
                <label className="label">
                  Remaining work
                </label>

                <select
                  className="select"
                  value={variables.remaining_work}
                  onChange={(event) =>
                    updateVariable(
                      "remaining_work",
                      event.target.value
                    )
                  }
                >
                  <option>Very little</option>
                  <option>Moderate</option>
                  <option>A lot</option>
                </select>
              </div>

            </div>
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
          Mirror Mind will explain which factors are influencing the
          recommendation and what could change it.
        </p>

      </div>
    </div>
  );
}