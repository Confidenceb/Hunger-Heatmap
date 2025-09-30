import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  function onSubmit(event) {
    event.preventDefault();
    if (!query.trim()) return;
    // For now, route to /search?q=... if you later add a Search page
    navigate(`/search?q=${encodeURIComponent(query.trim())}`);
  }

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

          <form className="nav-search" onSubmit={onSubmit} role="search">
            <span className="search-icon" aria-hidden>
              🔍
            </span>
            <input
              className="search-input"
              type="search"
              placeholder="Search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search"
            />
          </form>
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
