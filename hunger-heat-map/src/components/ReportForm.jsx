import { useState, useRef } from "react";
import "./ReportForm.css";

function ReportForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    location: "",
    latitude: "",
    longitude: "",
    severity: "medium",
    description: "",
    affectedCount: "",
    contactInfo: "",
    urgency: "normal",
    category: "food",
    images: [],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);

  const severityOptions = [
    {
      value: "low",
      label: "Low (Mild)",
      color: "#fdd835",
      description: "Some food insecurity, manageable",
    },
    {
      value: "medium",
      label: "Medium (Moderate)",
      color: "#fb8c00",
      description: "Significant hunger, needs attention",
    },
    {
      value: "high",
      label: "High (Critical)",
      color: "#e53935",
      description: "Severe hunger, immediate action needed",
    },
  ];

  const categoryOptions = [
    { value: "food", label: "Food Shortage", icon: "🍽️" },
    { value: "water", label: "Water Crisis", icon: "💧" },
    { value: "shelter", label: "Shelter Needs", icon: "🏠" },
    { value: "medical", label: "Medical Aid", icon: "🏥" },
    { value: "other", label: "Other", icon: "📋" },
  ];

  const urgencyOptions = [
    { value: "low", label: "Low Priority", description: "Can wait a few days" },
    { value: "normal", label: "Normal", description: "Standard response time" },
    {
      value: "urgent",
      label: "Urgent",
      description: "Needs response within 24h",
    },
    {
      value: "emergency",
      label: "Emergency",
      description: "Immediate response required",
    },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));

    if (imageFiles.length > 0) {
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...imageFiles],
      }));
    }
  };

  const removeImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData((prev) => ({
            ...prev,
            latitude: position.coords.latitude.toString(),
            longitude: position.coords.longitude.toString(),
            location: `${position.coords.latitude.toFixed(
              4
            )}, ${position.coords.longitude.toFixed(4)}`,
          }));
        },
        (error) => {
          console.error("Error getting location:", error);
          setErrors((prev) => ({
            ...prev,
            location: "Unable to get current location. Please enter manually.",
          }));
        }
      );
    } else {
      setErrors((prev) => ({
        ...prev,
        location: "Geolocation not supported by this browser.",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.location.trim()) {
      newErrors.location = "Location is required";
    }
    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }
    if (!formData.affectedCount || parseInt(formData.affectedCount) <= 0) {
      newErrors.affectedCount =
        "Please enter a valid number of affected people";
    }
    if (!formData.contactInfo.trim()) {
      newErrors.contactInfo = "Contact information is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const reportData = {
        ...formData,
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        status: "pending",
        verified: false,
      };

      onSubmit(reportData);

      // Reset form
      setFormData({
        location: "",
        latitude: "",
        longitude: "",
        severity: "medium",
        description: "",
        affectedCount: "",
        contactInfo: "",
        urgency: "normal",
        category: "food",
        images: [],
      });

      alert(
        "Report submitted successfully! Thank you for helping fight hunger."
      );
    } catch (error) {
      console.error("Error submitting report:", error);
      alert("Failed to submit report. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="report-form" onSubmit={handleSubmit}>
      <div className="form-header">
        <h2>Report Hunger Hotspot</h2>
        <p>Help us identify areas in need of food assistance</p>
      </div>

      <div className="form-grid">
        {/* Location Section */}
        <div className="form-section">
          <h3>📍 Location Details</h3>

          <div className="form-group">
            <label htmlFor="location">Location *</label>
            <div className="location-input-group">
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="Enter address or area name"
                className={errors.location ? "error" : ""}
              />
              <button
                type="button"
                onClick={getCurrentLocation}
                className="location-btn"
                title="Use current location"
              >
                📍
              </button>
            </div>
            {errors.location && (
              <span className="error-message">{errors.location}</span>
            )}
          </div>

          <div className="coordinates-group">
            <div className="form-group">
              <label htmlFor="latitude">Latitude</label>
              <input
                type="number"
                id="latitude"
                name="latitude"
                value={formData.latitude}
                onChange={handleInputChange}
                placeholder="e.g., 40.7128"
                step="any"
              />
            </div>
            <div className="form-group">
              <label htmlFor="longitude">Longitude</label>
              <input
                type="number"
                id="longitude"
                name="longitude"
                value={formData.longitude}
                onChange={handleInputChange}
                placeholder="e.g., -74.0060"
                step="any"
              />
            </div>
          </div>
        </div>

        {/* Severity & Category */}
        <div className="form-section">
          <h3>🚨 Severity & Category</h3>

          <div className="form-group">
            <label>Severity Level *</label>
            <div className="severity-options">
              {severityOptions.map((option) => (
                <label key={option.value} className="severity-option">
                  <input
                    type="radio"
                    name="severity"
                    value={option.value}
                    checked={formData.severity === option.value}
                    onChange={handleInputChange}
                  />
                  <div
                    className="severity-card"
                    style={{ borderColor: option.color }}
                  >
                    <div
                      className="severity-indicator"
                      style={{ backgroundColor: option.color }}
                    ></div>
                    <div className="severity-content">
                      <span className="severity-label">{option.label}</span>
                      <span className="severity-desc">
                        {option.description}
                      </span>
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>Category</label>
            <div className="category-options">
              {categoryOptions.map((option) => (
                <label key={option.value} className="category-option">
                  <input
                    type="radio"
                    name="category"
                    value={option.value}
                    checked={formData.category === option.value}
                    onChange={handleInputChange}
                  />
                  <div className="category-card">
                    <span className="category-icon">{option.icon}</span>
                    <span className="category-label">{option.label}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Details Section */}
        <div className="form-section">
          <h3>📝 Report Details</h3>

          <div className="form-group">
            <label htmlFor="description">Description *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Describe the hunger situation, number of people affected, specific needs..."
              rows="4"
              className={errors.description ? "error" : ""}
            />
            {errors.description && (
              <span className="error-message">{errors.description}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="affectedCount">Number of People Affected *</label>
            <input
              type="number"
              id="affectedCount"
              name="affectedCount"
              value={formData.affectedCount}
              onChange={handleInputChange}
              placeholder="e.g., 50"
              min="1"
              className={errors.affectedCount ? "error" : ""}
            />
            {errors.affectedCount && (
              <span className="error-message">{errors.affectedCount}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="contactInfo">Your Contact Information *</label>
            <input
              type="text"
              id="contactInfo"
              name="contactInfo"
              value={formData.contactInfo}
              onChange={handleInputChange}
              placeholder="Phone number or email"
              className={errors.contactInfo ? "error" : ""}
            />
            {errors.contactInfo && (
              <span className="error-message">{errors.contactInfo}</span>
            )}
          </div>

          <div className="form-group">
            <label>Urgency Level</label>
            <select
              name="urgency"
              value={formData.urgency}
              onChange={handleInputChange}
              className="urgency-select"
            >
              {urgencyOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label} - {option.description}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Images Section */}
        <div className="form-section">
          <h3>📸 Photos (Optional)</h3>

          <div className="form-group">
            <label htmlFor="images">Upload Photos</label>
            <div className="image-upload-area">
              <input
                ref={fileInputRef}
                type="file"
                id="images"
                name="images"
                onChange={handleImageUpload}
                multiple
                accept="image/*"
                style={{ display: "none" }}
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="upload-btn"
              >
                📷 Upload Photos
              </button>
              <p className="upload-hint">
                Add photos to help NGOs understand the situation better
              </p>
            </div>

            {formData.images.length > 0 && (
              <div className="image-preview-grid">
                {formData.images.map((file, index) => (
                  <div key={index} className="image-preview">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Upload ${index + 1}`}
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="remove-image"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="form-actions">
        <button type="submit" className="submit-btn" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <span className="spinner"></span>
              Submitting Report...
            </>
          ) : (
            <>🚀 Submit Report</>
          )}
        </button>
      </div>
    </form>
  );
}

export default ReportForm;
