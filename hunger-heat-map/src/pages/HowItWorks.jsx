import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./HowItWorks.css";

function HowItWorks() {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to About page and scroll to the "How it works" section
    navigate("/about#how-it-works", { replace: true });
  }, [navigate]);

  return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p>Redirecting to How It Works section...</p>
    </div>
  );
}

export default HowItWorks;
