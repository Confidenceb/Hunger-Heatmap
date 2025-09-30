import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <section className=" hero">
      <div className="hero-overlay" />
      <div className="section hero-content">
        <div className="hero-content-inner">
          <h1 className="hero-title">
            Making Hunger Visible &mdash; So We Can End It.
          </h1>
          <p className="hero-subtitle">
            Hunger HeatMap is a real-time platform that highlights food scarcity
            zones, helping NGOs and volunteers respond quickly.
          </p>
          <div className="hero-actions">
            <Link to="/map" className="cta-button" aria-label="View hunger map">
              <span role="img" aria-label="map">
                🗺
              </span>
              <span>View Map</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
