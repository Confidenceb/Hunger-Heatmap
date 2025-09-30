import { useState } from "react";
import MapView from "../components/MapView.jsx";
import "./Map.css";

function MapPage() {
  const [reports, setReports] = useState([]);

  const handleReportSubmit = (reportData) => {
    setReports((prev) => [reportData, ...prev]);
    console.log("New report submitted:", reportData);
    // Here you would typically send to your backend API
  };

  return (
    <div className="map-page">
      <div className="map-header">
        <div className="header-content">
          <h1>Hunger HeatMap</h1>
          <p>
            Real-time visualization of food insecurity hotspots and relief
            efforts
          </p>
          <div className="header-stats">
            <div className="stat-item">
              <span className="stat-number">{reports.length}</span>
              <span className="stat-label">Reports Today</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">24h</span>
              <span className="stat-label">Response Time</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">95%</span>
              <span className="stat-label">Success Rate</span>
            </div>
          </div>
        </div>
      </div>
      <MapView onReportSubmit={handleReportSubmit} />
    </div>
  );
}

export default MapPage;
