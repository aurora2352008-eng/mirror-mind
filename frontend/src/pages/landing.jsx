export default function Landing({ onStart, onNavigate }) {
  return (
    <div className="landing-page">

      {/* Navigation */}
      <nav className="navbar">

        <button
          className="landing-logo-button"
          onClick={() => onNavigate("landing")}
        >
          <div className="logo">
            Mirror<span>Mind</span>
          </div>
        </button>

        <div className="nav-links">

          <button onClick={() => onNavigate("landing")}>
            Home
          </button>

          <button onClick={() => onNavigate("profile")}>
            Personal Twin
          </button>

          <button onClick={() => onNavigate("decision")}>
            Decision Twin
          </button>

        </div>

      </nav>


      {/* Hero */}
      <main className="hero">

        <div className="hero-content">

          <p className="eyebrow">
            AI-POWERED ACADEMIC DECISION TWIN
          </p>

          <h1>
            Make decisions
            <br />
            that understand <span>you.</span>
          </h1>

          <p className="hero-description">
            Mirror Mind learns from your goals, preferences, routines,
            past decisions and feedback to create a personalized
            decision twin for academic choices.
          </p>

          <button
            className="primary-button"
            onClick={onStart}
          >
            Build My Twin →
          </button>

        </div>


        {/* Twin Preview */}
        <div className="twin-preview">

          <div className="preview-card">

            <div className="card-header">

              <div>
                <p className="small-label">
                  YOUR DIGITAL TWIN
                </p>

                <h3>
                  Academic Decision Profile
                </h3>
              </div>

              <div className="status-dot"></div>

            </div>


            <div className="profile-row">

              <div className="profile-icon">
                🎓
              </div>

              <div>
                <p className="profile-title">
                  Student Profile
                </p>

                <p className="profile-subtitle">
                  Goals & preferences continuously evolving
                </p>
              </div>

            </div>


            <div className="insight-box">

              <p className="small-label">
                CURRENT INSIGHT
              </p>

              <p>
                Your twin is learning how you prioritize
                academic deadlines and project quality.
              </p>

            </div>


            <div className="mini-stats">

              <div>
                <strong>Goals</strong>
                <span>Tracked</span>
              </div>

              <div>
                <strong>Patterns</strong>
                <span>Learning</span>
              </div>

              <div>
                <strong>Feedback</strong>
                <span>Updating</span>
              </div>

            </div>

          </div>

        </div>

      </main>


      {/* Features */}
      <section className="features">

        <div>
          <h3>01</h3>
          <strong>Understand You</strong>
          <p>
            Build a profile from your goals,
            preferences and behaviour.
          </p>
        </div>

        <div>
          <h3>02</h3>
          <strong>Evaluate Choices</strong>
          <p>
            Compare decisions using your
            personal context.
          </p>
        </div>

        <div>
          <h3>03</h3>
          <strong>Learn From Feedback</strong>
          <p>
            Improve the twin as your
            decisions evolve.
          </p>
        </div>

      </section>

    </div>
  );
}