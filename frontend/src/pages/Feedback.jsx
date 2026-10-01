
import { useState } from "react";

export default function Feedback({ profile, decision, onComplete }) {
  const [chosenOption, setChosenOption] = useState("");
  const [accepted, setAccepted] = useState("");
  const [reason, setReason] = useState("");
  const [outcome, setOutcome] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!decision) {
    return (
      <div className="page">
        <div className="container">
          <h1 className="page-title">No decision available.</h1>
        </div>
      </div>
    );
  }

  const options = decision.decision_context?.options || [];

  const recommendation = decision.recommendation || "";

  const submitFeedback = async () => {
    if (!chosenOption || !accepted || !reason.trim() || !outcome.trim()) {
      alert("Please complete all the fields.");
      return;
    }

    const feedbackData = {
      user_id: profile?.user_id || "demo_user",
      decision: decision.decision_context?.decision || "",
      recommendation: recommendation,
      chosen_option: chosenOption,
      situation: decision.decision_context?.current_situation || "",
      accepted_assessment: accepted,
      reason: reason,
      outcome: outcome
    };

    console.log("Twin learning data:", feedbackData);

    /*
     * For the MVP, keep the learning data ready as a structured
     * feedback record. Backend persistence can be connected next.
     */

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="page">
        <div className="container">

          <span className="badge">
            STEP 05 · TWIN LEARNING
          </span>

          <h1
            className="page-title"
            style={{ marginTop: "18px" }}
          >
            Your Twin learned
            <br />
            from this decision.
          </h1>

          <p
            className="page-subtitle"
            style={{ marginTop: "18px" }}
          >
            Your choice, reasoning, and outcome can help Mirror Mind
            understand how you make decisions in similar situations.
          </p>

          <div
            className="card"
            style={{
              marginTop: "40px",
              background: "#eef2ff"
            }}
          >
            <span className="badge">
              DECISION RECORDED
            </span>

            <h2
              className="section-title"
              style={{ marginTop: "14px" }}
            >
              {chosenOption}
            </h2>

            <p
              className="muted"
              style={{
                marginTop: "12px",
                lineHeight: "1.6"
              }}
            >
              Your reasoning has been captured as behavioral feedback.
            </p>
          </div>

          <div
            className="row"
            style={{
              justifyContent: "flex-end",
              marginTop: "24px"
            }}
          >
            <button
              className="primary-button"
              onClick={onComplete}
            >
              Back to Twin Profile →
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
          STEP 05 · DECISION OUTCOME
        </span>

        <h1
          className="page-title"
          style={{ marginTop: "18px" }}
        >
          What did you
          <br />
          actually choose?
        </h1>

        <p className="page-subtitle">
          Mirror Mind wants to learn from what you actually decided,
          not just what it predicted.
        </p>

        {/* Actual choice */}
        <div
          className="card"
          style={{ marginTop: "40px" }}
        >
          <span className="badge">
            YOUR CHOICE
          </span>

          <h2
            className="section-title"
            style={{ marginTop: "14px" }}
          >
            Select the option you chose.
          </h2>

          <div
            style={{
              display: "grid",
              gap: "12px",
              marginTop: "20px"
            }}
          >
            {options.map((option, index) => (
              <button
                key={index}
                className={
                  chosenOption === option
                    ? "primary-button"
                    : "secondary-button"
                }
                style={{
                  width: "100%",
                  textAlign: "left"
                }}
                onClick={() => setChosenOption(option)}
              >
                {option}
              </button>
            ))}
          </div>

          <input
            className="input"
            style={{ marginTop: "12px" }}
            placeholder="Or enter another choice..."
            value={
              options.includes(chosenOption)
                ? ""
                : chosenOption
            }
            onChange={(e) => setChosenOption(e.target.value)}
          />
        </div>

        {/* Situation-aware reflection */}
        <div
          className="card"
          style={{ marginTop: "28px" }}
        >
          <span className="badge">
            MIRROR MIND CHECK
          </span>

          <h2
            className="section-title"
            style={{ marginTop: "14px" }}
          >
            Before you continue
          </h2>

          <p
            className="muted"
            style={{
              marginTop: "10px",
              lineHeight: "1.7"
            }}
          >
            Based on the current situation and your selected option,
            Mirror Mind wants you to confirm that you understand the
            important trade-offs, risks, or effects involved.
          </p>

          <label
            className="label"
            style={{ marginTop: "22px" }}
          >
            Are you comfortable proceeding with this choice?
          </label>

          <div className="row" style={{ marginTop: "12px" }}>
            <button
              className={
                accepted === "yes"
                  ? "primary-button"
                  : "secondary-button"
              }
              onClick={() => setAccepted("yes")}
            >
              Yes, I'm comfortable
            </button>

            <button
              className={
                accepted === "no"
                  ? "primary-button"
                  : "secondary-button"
              }
              onClick={() => setAccepted("no")}
            >
              No, reconsider
            </button>
          </div>
        </div>

        {/* Reason */}
        <div
          className="card"
          style={{ marginTop: "28px" }}
        >
          <span className="badge">
            TEACH YOUR TWIN
          </span>

          <h2
            className="section-title"
            style={{ marginTop: "14px" }}
          >
            What influenced your choice?
          </h2>

          <p
            className="muted"
            style={{
              marginTop: "8px",
              lineHeight: "1.6"
            }}
          >
            Tell Mirror Mind what mattered most when you made
            the decision.
          </p>

          <textarea
            className="textarea"
            style={{ marginTop: "18px" }}
            placeholder="Example: I chose this because avoiding the deadline risk mattered more to me."
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        </div>

        {/* Outcome */}
        <div
          className="card"
          style={{ marginTop: "28px" }}
        >
          <span className="badge">
            OUTCOME
          </span>

          <h2
            className="section-title"
            style={{ marginTop: "14px" }}
          >
            What happened after your decision?
          </h2>

          <textarea
            className="textarea"
            style={{ marginTop: "18px" }}
            placeholder="Describe the result..."
            value={outcome}
            onChange={(e) => setOutcome(e.target.value)}
          />
        </div>

        {/* Submit */}
        <div
          className="row"
          style={{
            justifyContent: "flex-end",
            marginTop: "24px"
          }}
        >
          <button
            className="primary-button"
            onClick={submitFeedback}
          >
            Teach My Twin →
          </button>
        </div>

      </div>
    </div>
  );
}