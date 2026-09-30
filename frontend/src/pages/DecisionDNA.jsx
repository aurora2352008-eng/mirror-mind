export default function DecisionDNA({ result, onContinue }) {
  if (!result) {
    return (
      <div className="page">
        <div className="container">
          <h1 className="page-title">No decision yet.</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="container">

        <span className="badge">
          STEP 04 · DECISION DNA
        </span>

        <h1 className="page-title" style={{ marginTop: "18px" }}>
          Here's how your
          <br />
          Twin reasoned.
        </h1>

        <p className="page-subtitle">
          Mirror Mind does not just give you an answer. It shows the
          factors behind the recommendation and what could change it.
        </p>

        {/* Recommendation */}
        <div
          className="card"
          style={{
            marginTop: "40px",
            background: "#eef2ff"
          }}
        >
          <span className="badge">
            CURRENT RECOMMENDATION
          </span>

          <h2
            style={{
              fontFamily: '"Newsreader", serif',
              fontSize: "2.5rem",
              fontWeight: "500",
              color: "#172554",
              marginTop: "14px"
            }}
          >
            {result.recommendation}
          </h2>

          <p
            style={{
              marginTop: "14px",
              color: "#475569",
              lineHeight: "1.7"
            }}
          >
            {result.explanation}
          </p>
        </div>

        {/* Factors */}
        <div style={{ marginTop: "28px" }}>

          <h2 className="section-title">
            Why this recommendation?
          </h2>

          <p
            className="muted"
            style={{
              marginTop: "8px",
              marginBottom: "18px"
            }}
          >
            These are the factors currently influencing your decision.
          </p>

          <div className="grid grid-2">

            {(result.factors || []).map((factor, index) => {

              const importance = Math.round(
                Number(factor.importance || 0) * 100
              );

              return (
                <div className="card" key={index}>

                  <div className="row space-between">
                    <h3
                      style={{
                        color: "#172554",
                        fontSize: "1.05rem"
                      }}
                    >
                      {factor.name}
                    </h3>

                    <span className="badge">
                      {importance}% importance
                    </span>
                  </div>

                  <div
                    style={{
                      height: "8px",
                      background: "#e2e8f0",
                      borderRadius: "999px",
                      marginTop: "16px",
                      overflow: "hidden"
                    }}
                  >
                    <div
                      style={{
                        width: `${importance}%`,
                        height: "100%",
                        background: "#172554",
                        borderRadius: "999px"
                      }}
                    />
                  </div>

                  <p
                    className="muted"
                    style={{
                      marginTop: "14px",
                      lineHeight: "1.6"
                    }}
                  >
                    {factor.reason}
                  </p>

                </div>
              );
            })}

          </div>
        </div>

        {/* Change triggers */}
        <div
          className="card"
          style={{
            marginTop: "28px"
          }}
        >

          <span className="badge">
            WHAT WOULD CHANGE THE DECISION?
          </span>

          <h2
            className="section-title"
            style={{ marginTop: "14px" }}
          >
            Change the situation. Reconsider the answer.
          </h2>

          <p
            className="muted"
            style={{
              marginTop: "8px",
              lineHeight: "1.6"
            }}
          >
            These conditions could cause Mirror Mind to reconsider
            its current recommendation.
          </p>

          <div style={{ marginTop: "20px" }}>

            {(result.change_triggers || []).map(
              (trigger, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    gap: "12px",
                    alignItems: "flex-start",
                    padding: "14px 0",
                    borderBottom:
                      index !== result.change_triggers.length - 1
                        ? "1px solid #e5e7eb"
                        : "none"
                  }}
                >
                  <span
                    style={{
                      display: "inline-flex",
                      width: "28px",
                      height: "28px",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "50%",
                      background: "#eef2ff",
                      color: "#3730a3",
                      fontWeight: "700",
                      flexShrink: 0
                    }}
                  >
                    {index + 1}
                  </span>

                  <p
                    style={{
                      color: "#334155",
                      lineHeight: "1.6"
                    }}
                  >
                    {trigger}
                  </p>
                </div>
              )
            )}

          </div>
        </div>

        {/* Continue */}
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
            Record Decision Outcome →
          </button>
        </div>

      </div>
    </div>
  );
}