import { useState } from "react";
import ReportForm from "../components/ReportForm.jsx";
import "./Report.css";

function Report() {
  const [reports, setReports] = useState([]);

  const handleReportSubmit = (reportData) => {
    setReports((prev) => [reportData, ...prev]);
    console.log("New report submitted:", reportData);
    // Here you would typically send to your backend API
  };

  return (
    <div className="report-page">
      <div className="report-header">
        <div className="header-content">
          <h1>Report Hunger Hotspot</h1>
          <p>
            Your report helps NGOs and volunteers respond quickly to food
            insecurity
          </p>
          <div className="header-stats">
            <div className="stat-item">
              <span className="stat-number">{reports.length}</span>
              <span className="stat-label">Reports Submitted</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">24h</span>
              <span className="stat-label">Average Response</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">95%</span>
              <span className="stat-label">Success Rate</span>
            </div>
          </div>
        </div>
      </div>

      <div className="report-content">
        <div className="report-form-container">
          <ReportForm onSubmit={handleReportSubmit} />
        </div>

        {reports.length > 0 && (
          <div className="recent-reports">
            <h3>Recent Reports</h3>
            <div className="reports-list">
              {reports.slice(0, 3).map((report, index) => (
                <div key={report.id} className="report-card">
                  <div className="report-header">
                    <span className="report-location">{report.location}</span>
                    <span className={`report-severity ${report.severity}`}>
                      {report.severity}
                    </span>
                  </div>
                  <p className="report-description">{report.description}</p>
                  <div className="report-meta">
                    <span className="report-affected">
                      {report.affectedCount} people affected
                    </span>
                    <span className="report-time">
                      {new Date(report.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Report;
