import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

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
        </div>

        {/* Desktop Navigation */}
        <nav className="nav-links desktop-nav" aria-label="Primary">
          <NavLink
            to="/"
            end
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
          >
            Home
          </NavLink>

          <NavLink
            to="/map"
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
          >
            Map
          </NavLink>
          <NavLink
            to="/report"
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
          >
            Report
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
          >
            About Us
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
          >
            Contact
          </NavLink>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="mobile-menu-btn"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
          aria-expanded={isMobileMenuOpen}
        >
          <span className={`hamburger ${isMobileMenuOpen ? "active" : ""}`}>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </span>
        </button>
      </div>

      {/* Mobile Navigation */}
      <nav
        className={`mobile-nav ${isMobileMenuOpen ? "open" : ""}`}
        aria-label="Mobile navigation"
      >
        <div className="mobile-nav-content">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `mobile-nav-link ${isActive ? "active" : ""}`
            }
            onClick={closeMobileMenu}
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `mobile-nav-link ${isActive ? "active" : ""}`
            }
            onClick={closeMobileMenu}
          >
            About Us
          </NavLink>
          <NavLink
            to="/map"
            className={({ isActive }) =>
              `mobile-nav-link ${isActive ? "active" : ""}`
            }
            onClick={closeMobileMenu}
          >
            Map
          </NavLink>
          <NavLink
            to="/report"
            className={({ isActive }) =>
              `mobile-nav-link ${isActive ? "active" : ""}`
            }
            onClick={closeMobileMenu}
          >
            Report
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `mobile-nav-link ${isActive ? "active" : ""}`
            }
            onClick={closeMobileMenu}
          >
            Contact
          </NavLink>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
