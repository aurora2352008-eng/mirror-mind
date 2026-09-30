import { useState } from "react";

export default function TwinProfile({ profile, onContinue }) {
  const [editableProfile, setEditableProfile] = useState(profile || {});

  const updateListItem = (section, index, value) => {
    setEditableProfile((previous) => ({
      ...previous,
      [section]: previous[section].map((item, itemIndex) =>
        itemIndex === index ? value : item
      )
    }));
  };

  const removeItem = (section, index) => {
    setEditableProfile((previous) => ({
      ...previous,
      [section]: previous[section].filter(
        (_, itemIndex) => itemIndex !== index
      )
    }));
  };

  const renderSimpleList = (title, section) => {
    const items = editableProfile?.[section] || [];

    return (
      <div className="card">
        <div className="row space-between">
          <h2 className="section-title">{title}</h2>

          <span className="badge">
            {items.length} {items.length === 1 ? "item" : "items"}
          </span>
        </div>

        <div style={{ marginTop: "20px" }}>
          {items.length === 0 ? (
            <p className="muted">
              Mirror Mind has not learned anything about this yet.
            </p>
          ) : (
            items.map((item, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  gap: "10px",
                  alignItems: "center",
                  marginBottom: "12px"
                }}
              >
                <input
                  className="input"
                  value={item}
                  onChange={(event) =>
                    updateListItem(section, index, event.target.value)
                  }
                />

                <button
                  className="secondary-button"
                  onClick={() => removeItem(section, index)}
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    );
  };

  const renderKeyValueList = (title, section) => {
    const items = editableProfile?.[section] || [];

    return (
      <div className="card">
        <div className="row space-between">
          <h2 className="section-title">{title}</h2>

          <span className="badge">
            {items.length} {items.length === 1 ? "item" : "items"}
          </span>
        </div>

        <div style={{ marginTop: "20px" }}>
          {items.length === 0 ? (
            <p className="muted">
              Mirror Mind has not learned anything about this yet.
            </p>
          ) : (
            items.map((item, index) => (
              <div
                key={index}
                className="card"
                style={{
                  padding: "16px",
                  marginBottom: "12px",
                  boxShadow: "none"
                }}
              >
                <p className="label">{item.key}</p>

                <input
                  className="input"
                  value={item.value}
                  onChange={(event) => {
                    const updatedItems = [...items];

                    updatedItems[index] = {
                      ...updatedItems[index],
                      value: event.target.value
                    };

                    setEditableProfile((previous) => ({
                      ...previous,
                      [section]: updatedItems
                    }));
                  }}
                />

                <button
                  className="secondary-button"
                  style={{ marginTop: "10px" }}
                  onClick={() => removeItem(section, index)}
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="page">
      <div className="container">

        <span className="badge">STEP 02 · YOUR MIRROR PROFILE</span>

        <h1 className="page-title" style={{ marginTop: "18px" }}>
          This is what
          <br />
          Mirror Mind learned.
        </h1>

        <p className="page-subtitle">
          Review the information extracted from your conversation.
          You remain in control of what your Twin remembers.
        </p>

        <div
          className="grid grid-2"
          style={{ marginTop: "40px" }}
        >

          {renderSimpleList("Goals", "goals")}

          {renderKeyValueList("Priorities", "priorities")}

          {renderKeyValueList("Preferences", "preferences")}

          {renderKeyValueList("Routines", "routines")}

          {renderSimpleList(
            "Behavioral Patterns",
            "behavioral_patterns"
          )}

          {renderKeyValueList(
            "Past Decisions",
            "past_decisions"
          )}

        </div>

        <div
          className="card"
          style={{
            marginTop: "24px",
            background: "#eef2ff"
          }}
        >
          <h2 className="section-title">
            Your information, your control.
          </h2>

          <p
            className="muted"
            style={{
              marginTop: "10px",
              lineHeight: "1.7"
            }}
          >
            Review what Mirror Mind learned. You can edit or remove
            information before continuing to use the Twin.
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
            onClick={onContinue}
          >
            Continue to Decision →
          </button>
        </div>

      </div>
    </div>
  );
}