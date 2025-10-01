import "./About.css";

function About() {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <div className="about-hero-content">
            <h1>About Hunger HeatMap</h1>
            <p className="hero-subtitle">
              Connecting communities to fight food insecurity through real-time
              data visualization and collaborative action.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission-section">
        <div className="container">
          <div className="section-header">
            <h2>Our Mission</h2>
            <p className="section-subtitle">
              We believe that no one should go hungry in our communities. Our
              platform empowers individuals, organizations, and governments to
              identify, track, and respond to food insecurity hotspots in
              real-time.
            </p>
          </div>

          <div className="mission-grid">
            <div className="mission-card">
              <div className="card-icon">🗺️</div>
              <h3>Real-Time Mapping</h3>
              <p>
                Visualize hunger hotspots and relief efforts across communities
                with our interactive heatmap technology.
              </p>
            </div>

            <div className="mission-card">
              <div className="card-icon">🤝</div>
              <h3>Community Connection</h3>
              <p>
                Connect NGOs, volunteers, donors, and those in need through our
                collaborative platform.
              </p>
            </div>

            <div className="mission-card">
              <div className="card-icon">📊</div>
              <h3>Data-Driven Solutions</h3>
              <p>
                Use comprehensive data analytics to make informed decisions and
                optimize resource allocation.
              </p>
            </div>

            <div className="mission-card">
              <div className="card-icon">⚡</div>
              <h3>Rapid Response</h3>
              <p>
                Enable quick identification and response to emerging hunger
                crises in your area.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="how-it-works-section">
        <div className="container">
          <div className="section-header">
            <h2>How It Works</h2>
            <p className="section-subtitle">
              Our platform makes it easy for anyone to contribute to the fight
              against hunger
            </p>
          </div>

          <div className="steps-container">
            <div className="step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>Report Hunger Hotspots</h3>
                <p>
                  Community members can easily report areas experiencing food
                  insecurity through our intuitive reporting system.
                </p>
              </div>
            </div>

            <div className="step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>Visualize on Heatmap</h3>
                <p>
                  Reports appear instantly on our interactive map, creating a
                  real-time visualization of hunger patterns.
                </p>
              </div>
            </div>

            <div className="step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>Coordinate Response</h3>
                <p>
                  NGOs, volunteers, and donors can coordinate their efforts
                  based on real-time data and location.
                </p>
              </div>
            </div>

            <div className="step">
              <div className="step-number">4</div>
              <div className="step-content">
                <h3>Track Impact</h3>
                <p>
                  Monitor the effectiveness of interventions and track progress
                  in reducing food insecurity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="impact-section">
        <div className="container">
          <div className="section-header">
            <h2>Our Impact</h2>
            <p className="section-subtitle">
              Together, we're making a difference in communities across Nigeria
            </p>
          </div>

          <div className="impact-stats">
            <div className="stat-item">
              <div className="stat-number">500+</div>
              <div className="stat-label">Reports Processed</div>
            </div>

            <div className="stat-item">
              <div className="stat-number">50+</div>
              <div className="stat-label">Partner Organizations</div>
            </div>

            <div className="stat-item">
              <div className="stat-number">10,000+</div>
              <div className="stat-label">People Reached</div>
            </div>

            <div className="stat-item">
              <div className="stat-number">24h</div>
              <div className="stat-label">Average Response Time</div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="container">
          <div className="section-header">
            <h2>Our Team</h2>
            <p className="section-subtitle">
              Dedicated professionals working to end hunger through technology
            </p>
          </div>

          <div className="team-grid">
            <div className="team-member">
              <div className="member-avatar">👨‍💻</div>
              <h3>Tech Team</h3>
              <p>
                Our developers and engineers building the platform that connects
                communities.
              </p>
            </div>

            <div className="team-member">
              <div className="member-avatar">🤝</div>
              <h3>Community Partners</h3>
              <p>
                Local NGOs and organizations working on the ground to provide
                relief.
              </p>
            </div>

            <div className="team-member">
              <div className="member-avatar">📊</div>
              <h3>Data Analysts</h3>
              <p>
                Experts analyzing hunger patterns to improve our response
                strategies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Join the Movement</h2>
            <p>
              Be part of the solution. Report hunger hotspots, volunteer your
              time, or support our mission.
            </p>
            <div className="cta-buttons">
              <a href="/map" className="btn btn-primary">
                Start Reporting
              </a>
              <a href="/contact" className="btn btn-secondary">
                Get Involved
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
