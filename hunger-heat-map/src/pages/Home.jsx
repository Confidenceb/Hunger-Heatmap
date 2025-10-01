import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-overlay" />
        <div className="section hero-content">
          <div className="hero-content-inner">
            <h1 className="hero-title">
              Making Hunger Visible &mdash; So We Can End It.
            </h1>
            <p className="home-hero-subtitle">
              Hunger HeatMap is a real-time platform that highlights food
              scarcity zones, helping NGOs and volunteers respond quickly.
            </p>
            <div className="hero-actions">
              <Link
                to="/map"
                className="cta-button"
                aria-label="View hunger map"
              >
                <span role="img" aria-label="map">
                  🗺
                </span>
                <span>View Map</span>
              </Link>
              <Link
                to="/report"
                className="cta-button secondary"
                aria-label="Report hunger"
              >
                <span role="img" aria-label="report">
                  📝
                </span>
                <span>Report Hunger</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">🔥</div>
              <div className="stat-number">500+</div>
              <div className="stat-label">Active Hotspots</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">👥</div>
              <div className="stat-number">50+</div>
              <div className="stat-label">Partner NGOs</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">🍽️</div>
              <div className="stat-number">10,000+</div>
              <div className="stat-label">People Helped</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">⚡</div>
              <div className="stat-number">24h</div>
              <div className="stat-label">Response Time</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works-section">
        <div className="container">
          <div className="section-header">
            <h2>How It Works</h2>
            <p>Three simple steps to make a difference</p>
          </div>
          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">1</div>
              <h3>Report</h3>
              <p>
                Community members report hunger hotspots through our easy-to-use
                platform
              </p>
            </div>
            <div className="step-card">
              <div className="step-number">2</div>
              <h3>Visualize</h3>
              <p>
                Reports appear instantly on our interactive map, creating
                real-time awareness
              </p>
            </div>
            <div className="step-card">
              <div className="step-number">3</div>
              <h3>Respond</h3>
              <p>
                NGOs and volunteers coordinate rapid response based on location
                and urgency
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <h2>Why Choose Hunger HeatMap?</h2>
            <p>Powerful features that make hunger relief more effective</p>
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🗺️</div>
              <h3>Real-Time Mapping</h3>
              <p>
                Interactive heatmap shows hunger hotspots as they're reported,
                enabling immediate response
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Data Analytics</h3>
              <p>
                Comprehensive insights help organizations optimize resource
                allocation and track impact
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🤝</div>
              <h3>Community Driven</h3>
              <p>
                Built by and for communities, ensuring local needs are met with
                local solutions
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Rapid Response</h3>
              <p>
                Instant notifications and coordination tools help responders act
                quickly when it matters most
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Make a Difference?</h2>
            <p>
              Join thousands of community members, volunteers, and organizations
              fighting hunger together
            </p>
            <div className="cta-buttons">
              <Link to="/map" className="btn btn-primary">
                Start Mapping
              </Link>
              <Link to="/about" className="btn btn-secondary">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
