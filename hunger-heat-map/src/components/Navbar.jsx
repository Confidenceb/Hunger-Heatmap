import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  return (
    <header className="nav-root">
      <div className="nav-container">
        <div className="nav-left">
          <button
            className="logo"
            onClick={() => navigate("/")}
            aria-label="Hunger Heatmap home"
          >
            <span className="logo-mark">Hunger</span>
            <span className="logo-text">Heatmap.</span>
          </button>

          {/* search removed */}
        </div>

        <nav className="nav-links" aria-label="Primary">
          <NavLink
            to="/"
            end
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
          >
            About Us
          </NavLink>
          <NavLink
            to="/how-it-works"
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
          >
            How it works
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
          >
            Contact
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
