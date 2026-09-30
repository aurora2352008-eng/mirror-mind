export default function Landing({ onStart }) {
  return (
    <div className="landing-page">

      {/* Navigation */}
      <nav className="navbar">
        <div className="logo">
          Mirror<span>Mind</span>
        </div>

        <div className="nav-links">
          <span>How It Works</span>
          <span>Decision Twin</span>
        </div>
      </nav>

      {/* Hero Section */}
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

          <button className="primary-button" onClick={onStart}>
            Build My Twin →
          </button>

        </div>

        {/* Twin Preview */}
        <div className="twin-preview">

          <div className="preview-card">

            <div className="card-header">
              <div>
                <p className="small-label">YOUR DIGITAL TWIN</p>
                <h3>Academic Decision Profile</h3>
              </div>

              <div className="status-dot"></div>
            </div>

            <div className="profile-row">
              <div className="profile-icon">🎓</div>

              <div>
                <p className="profile-title">Student Profile</p>
                <p className="profile-subtitle">
                  Goals & preferences continuously evolving
                </p>
              </div>
            </div>

            <div className="insight-box">
              <p className="small-label">CURRENT INSIGHT</p>

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

      {/* Bottom Information */}
      <section className="features">

        <div>
          <h3>01</h3>
          <p>
            <strong>Understand You</strong>
            <br />
            Build a profile from your goals, preferences and behaviour.
          </p>
        </div>

        <div>
          <h3>02</h3>
          <p>
            <strong>Evaluate Choices</strong>
            <br />
            Compare decisions using your personal context.
          </p>
        </div>

        <div>
          <h3>03</h3>
          <p>
            <strong>Learn From Feedback</strong>
            <br />
            Improve the twin as your decisions evolve.
          </p>
        </div>

      </section>

    </div>
  );
}