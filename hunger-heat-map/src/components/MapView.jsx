import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./MapView.css";

// Quick Report Form Component
function QuickReportForm({ initialData, onSubmit, onCancel }) {
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (!formData.affectedCount || parseInt(formData.affectedCount) <= 0) {
      newErrors.affectedCount = "Please enter a valid number";
    }
    if (!formData.contactInfo.trim())
      newErrors.contactInfo = "Contact info is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="quick-report-form">
      <div className="form-group">
        <label>Location</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleInputChange}
          placeholder="Enter location"
          className={errors.location ? "error" : ""}
        />
        {errors.location && (
          <span className="error-message">{errors.location}</span>
        )}
      </div>

      <div className="form-group">
        <label>Severity</label>
        <select
          name="severity"
          value={formData.severity}
          onChange={handleInputChange}
        >
          <option value="low">Low (Mild)</option>
          <option value="medium">Medium (Moderate)</option>
          <option value="high">High (Critical)</option>
        </select>
      </div>

      <div className="form-group">
        <label>Description *</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Describe the hunger situation..."
          rows="3"
          className={errors.description ? "error" : ""}
        />
        {errors.description && (
          <span className="error-message">{errors.description}</span>
        )}
      </div>

      <div className="form-group">
        <label>People Affected *</label>
        <input
          type="number"
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
        <label>Your Contact *</label>
        <input
          type="text"
          name="contactInfo"
          value={formData.contactInfo}
          onChange={handleInputChange}
          placeholder="Phone or email"
          className={errors.contactInfo ? "error" : ""}
        />
        {errors.contactInfo && (
          <span className="error-message">{errors.contactInfo}</span>
        )}
      </div>

      <div className="form-actions">
        <button type="button" onClick={onCancel} className="cancel-btn">
          Cancel
        </button>
        <button type="submit" className="submit-btn">
          Submit Report
        </button>
      </div>
    </form>
  );
}

// Fix for default markers in Leaflet with Vite
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

function MapView({ onReportSubmit }) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const [selectedSeverity, setSelectedSeverity] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [showReportForm, setShowReportForm] = useState(false);
  const [, setClickedLocation] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [locationPermission, setLocationPermission] = useState(null); // null, 'granted', 'denied', 'requesting'
  const [showBanner, setShowBanner] = useState(false);
  const [reportFormData, setReportFormData] = useState({
    location: "",
    latitude: "",
    longitude: "",
    severity: "medium",
    description: "",
    affectedCount: "",
    contactInfo: "",
    urgency: "normal",
    category: "food",
  });

  // Sample data - Lagos, Nigeria locations
  const initialHungerData = [
    {
      lat: 6.5244,
      lng: 3.3792,
      severity: "high",
      type: "hotspot",
      name: "Lagos Island",
      reports: 15,
    },
    {
      lat: 6.4474,
      lng: 3.3903,
      severity: "medium",
      type: "ngo",
      name: "Lagos Food Bank",
      reports: 8,
    },
    {
      lat: 6.6018,
      lng: 3.3515,
      severity: "low",
      type: "volunteer",
      name: "Victoria Island Center",
      reports: 3,
    },
    {
      lat: 6.5244,
      lng: 3.3792,
      severity: "high",
      type: "hotspot",
      name: "Surulere District",
      reports: 22,
    },
    {
      lat: 6.4474,
      lng: 3.3903,
      severity: "medium",
      type: "donor",
      name: "Lagos Restaurant Chain",
      reports: 5,
    },
  ];

  const [hungerData, setHungerData] = useState(initialHungerData);

  const typeIcons = useMemo(
    () => ({
      hotspot: "🔥",
      ngo: "🏢",
      volunteer: "👥",
      donor: "🍽️",
    }),
    []
  );

  const addMarkersToMap = useCallback(
    (map) => {
      const filteredData = hungerData.filter((item) => {
        const severityMatch =
          selectedSeverity === "all" || item.severity === selectedSeverity;
        const typeMatch = selectedType === "all" || item.type === selectedType;
        return severityMatch && typeMatch;
      });

      filteredData.forEach((point) => {
        const customIcon = L.divIcon({
          html: `<div class="custom-marker ${point.severity} ${point.type}">
                 <span class="marker-icon">${typeIcons[point.type]}</span>
                 <span class="marker-pulse"></span>
               </div>`,
          className: "custom-div-icon",
          iconSize: [30, 30],
          iconAnchor: [15, 15],
        });

        const marker = L.marker([point.lat, point.lng], {
          icon: customIcon,
        }).addTo(map);

        marker.bindPopup(`
        <div class="map-popup">
          <h3>${point.name}</h3>
          <p><strong>Type:</strong> ${point.type}</p>
          <p><strong>Severity:</strong> <span class="severity-${point.severity}">${point.severity}</span></p>
          <p><strong>Reports:</strong> ${point.reports}</p>
          <button class="popup-action">View Details</button>
        </div>
      `);
      });
    },
    [hungerData, selectedSeverity, selectedType, typeIcons]
  );

  // Auto-dismiss banner after 3 seconds
  useEffect(() => {
    if (locationPermission && locationPermission !== "requesting") {
      setShowBanner(true);
      const timer = setTimeout(() => {
        setShowBanner(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [locationPermission]);

  // Request user location permission and get location
  const requestUserLocation = () => {
    if (!navigator.geolocation) {
      setLocationPermission("denied");
      return;
    }

    setLocationPermission("requesting");
    setShowBanner(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const location = { lat: latitude, lng: longitude };

        setUserLocation(location);
        setLocationPermission("granted");

        // Center map on user location
        if (mapInstanceRef.current) {
          mapInstanceRef.current.setView([latitude, longitude], 13);

          // Add user location marker
          const userIcon = L.divIcon({
            html: `<div class="user-location-marker">
                     <div class="user-marker-pulse"></div>
                     <div class="user-marker-center">📍</div>
                   </div>`,
            className: "user-div-icon",
            iconSize: [40, 40],
            iconAnchor: [20, 20],
          });

          L.marker([latitude, longitude], { icon: userIcon }).addTo(
            mapInstanceRef.current
          ).bindPopup(`
              <div class="user-location-popup">
                <h4>Your Location</h4>
                <p>You are here</p>
                <button onclick="navigator.geolocation.getCurrentPosition((pos) => {
                  const { latitude, longitude } = pos.coords;
                  window.open(\`https://www.google.com/maps?q=\${latitude},\${longitude}\`, '_blank');
                })" class="view-on-maps-btn">View on Google Maps</button>
              </div>
            `);
        }
      },
      (error) => {
        console.error("Error getting location:", error);
        setLocationPermission("denied");
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000, // 5 minutes
      }
    );
  };

  useEffect(() => {
    if (mapRef.current && !mapInstanceRef.current) {
      // Initialize map with Lagos, Nigeria as default location
      const map = L.map(mapRef.current).setView([6.5244, 3.3792], 11);
      mapInstanceRef.current = map;

      // Add tile layer
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
        className: "map-tiles",
      }).addTo(map);

      // Add click event to map
      map.on("click", (e) => {
        const { lat, lng } = e.latlng;
        setClickedLocation({ lat, lng });
        setReportFormData((prev) => ({
          ...prev,
          latitude: lat.toFixed(6),
          longitude: lng.toFixed(6),
          location: `${lat.toFixed(4)}, ${lng.toFixed(4)}`,
        }));
        setShowReportForm(true);
      });

      // Add markers
      addMarkersToMap(map);

      // Request user location after map is initialized
      setTimeout(() => {
        requestUserLocation();
      }, 1000);

      return () => {
        map.remove();
        mapInstanceRef.current = null;
      };
    }
  }, [addMarkersToMap]);

  useEffect(() => {
    if (mapInstanceRef.current) {
      // Clear existing markers
      mapInstanceRef.current.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
          mapInstanceRef.current.removeLayer(layer);
        }
      });

      // Add filtered markers
      addMarkersToMap(mapInstanceRef.current);
    }
  }, [selectedSeverity, selectedType, addMarkersToMap]);

  const handleReportSubmit = (formData) => {
    const reportData = {
      ...formData,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      status: "pending",
      verified: false,
    };

    // Add the new report as a marker to the map
    const newMarker = {
      lat: parseFloat(formData.latitude),
      lng: parseFloat(formData.longitude),
      severity: formData.severity,
      type: "hotspot", // New reports are always hotspots
      name: formData.location || "New Report",
      reports: 1,
      description: formData.description,
      affectedCount: formData.affectedCount,
      contactInfo: formData.contactInfo,
      timestamp: reportData.timestamp,
    };

    // Add to hunger data state
    setHungerData((prev) => [...prev, newMarker]);

    // Add marker to map immediately
    if (mapInstanceRef.current) {
      const customIcon = L.divIcon({
        html: `<div class="custom-marker ${newMarker.severity} ${
          newMarker.type
        }">
                 <span class="marker-icon">${typeIcons[newMarker.type]}</span>
                 <span class="marker-pulse"></span>
               </div>`,
        className: "custom-div-icon",
        iconSize: [30, 30],
        iconAnchor: [15, 15],
      });

      const marker = L.marker([newMarker.lat, newMarker.lng], {
        icon: customIcon,
      }).addTo(mapInstanceRef.current);

      marker.bindPopup(`
        <div class="map-popup">
          <h3>${newMarker.name}</h3>
          <p><strong>Type:</strong> ${newMarker.type}</p>
          <p><strong>Severity:</strong> <span class="severity-${
            newMarker.severity
          }">${newMarker.severity}</span></p>
          <p><strong>Description:</strong> ${newMarker.description}</p>
          <p><strong>People Affected:</strong> ${newMarker.affectedCount}</p>
          <p><strong>Contact:</strong> ${newMarker.contactInfo}</p>
          <p><strong>Reported:</strong> ${new Date(
            newMarker.timestamp
          ).toLocaleString()}</p>
          <button class="popup-action">View Details</button>
        </div>
      `);
    }

    if (onReportSubmit) {
      onReportSubmit(reportData);
    }

    setShowReportForm(false);
    setReportFormData({
      location: "",
      latitude: "",
      longitude: "",
      severity: "medium",
      description: "",
      affectedCount: "",
      contactInfo: "",
      urgency: "normal",
      category: "food",
    });
  };

  const handleManualReport = () => {
    setClickedLocation(null);
    setReportFormData({
      location: "",
      latitude: "",
      longitude: "",
      severity: "medium",
      description: "",
      affectedCount: "",
      contactInfo: "",
      urgency: "normal",
      category: "food",
    });
    setShowReportForm(true);
  };

  return (
    <div className="map-container">
      {/* Location Permission Banner */}
      {locationPermission === "requesting" && showBanner && (
        <div className="location-banner requesting">
          <div className="banner-content">
            <div className="banner-icon">📍</div>
            <div className="banner-text">
              <h4>Getting your location...</h4>
              <p>Please allow location access to center the map on your area</p>
            </div>
            <div className="banner-spinner"></div>
          </div>
        </div>
      )}

      {locationPermission === "denied" && showBanner && (
        <div className="location-banner denied">
          <div className="banner-content">
            <div className="banner-icon">🚫</div>
            <div className="banner-text">
              <h4>Location access denied</h4>
              <p>
                You can still use the map, but it won't center on your location
              </p>
            </div>
            <div className="banner-actions">
              <button
                onClick={requestUserLocation}
                className="retry-location-btn"
              >
                Try Again
              </button>
              <button
                onClick={() => setShowBanner(false)}
                className="close-banner-btn"
              >
                ×
              </button>
            </div>
          </div>
        </div>
      )}

      {locationPermission === "granted" && userLocation && showBanner && (
        <div className="location-banner granted">
          <div className="banner-content">
            <div className="banner-icon">✅</div>
            <div className="banner-text">
              <h4>Location found!</h4>
              <p>Map centered on your location</p>
            </div>
            <div className="banner-actions">
              <button
                onClick={() => {
                  if (mapInstanceRef.current) {
                    mapInstanceRef.current.setView(
                      [userLocation.lat, userLocation.lng],
                      13
                    );
                  }
                  setShowBanner(false); // Hide banner immediately when clicked
                }}
                className="center-location-btn"
              >
                Center Map
              </button>
              <button
                onClick={() => setShowBanner(false)}
                className="close-banner-btn"
              >
                ×
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="map-controls">
        <div className="control-group">
          <label>Severity Filter:</label>
          <select
            value={selectedSeverity}
            onChange={(e) => setSelectedSeverity(e.target.value)}
            className="map-select"
          >
            <option value="all">All Levels</option>
            <option value="high">High (Critical)</option>
            <option value="medium">Medium (Moderate)</option>
            <option value="low">Low (Mild)</option>
          </select>
        </div>

        <div className="control-group">
          <label>Type Filter:</label>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="map-select"
          >
            <option value="all">All Types</option>
            <option value="hotspot">Hunger Hotspots</option>
            <option value="ngo">NGOs</option>
            <option value="volunteer">Volunteers</option>
            <option value="donor">Donors</option>
          </select>
        </div>

        <div className="control-group">
          <button onClick={handleManualReport} className="add-report-btn">
            📝 Add Report
          </button>
        </div>

        <div className="control-group">
          <button onClick={requestUserLocation} className="location-btn">
            📍 {userLocation ? "Update Location" : "Get My Location"}
          </button>
        </div>

        <div className="legend">
          <h4>Legend</h4>
          <div className="legend-item">
            <span className="legend-icon">🔥</span>
            <span>Hunger Hotspots</span>
          </div>
          <div className="legend-item">
            <span className="legend-icon">🏢</span>
            <span>NGOs</span>
          </div>
          <div className="legend-item">
            <span className="legend-icon">👥</span>
            <span>Volunteers</span>
          </div>
          <div className="legend-item">
            <span className="legend-icon">🍽️</span>
            <span>Donors</span>
          </div>
        </div>
      </div>

      <div className="map-wrapper">
        <div ref={mapRef} className="leaflet-map"></div>
        <div className="map-overlay">
          <div className="map-stats">
            <div className="stat-item">
              <span className="stat-number">
                {hungerData.filter((d) => d.type === "hotspot").length}
              </span>
              <span className="stat-label">Active Hotspots</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">
                {hungerData.filter((d) => d.type === "ngo").length}
              </span>
              <span className="stat-label">NGOs</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">
                {hungerData.filter((d) => d.type === "volunteer").length}
              </span>
              <span className="stat-label">Volunteers</span>
            </div>
          </div>
        </div>
      </div>

      {showReportForm && (
        <div className="map-report-modal">
          <div
            className="modal-overlay"
            onClick={() => setShowReportForm(false)}
          ></div>
          <div className="modal-content">
            <div className="modal-header">
              <h3>Report Hunger Hotspot</h3>
              <button
                className="close-btn"
                onClick={() => setShowReportForm(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <QuickReportForm
                initialData={reportFormData}
                onSubmit={handleReportSubmit}
                onCancel={() => setShowReportForm(false)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MapView;
