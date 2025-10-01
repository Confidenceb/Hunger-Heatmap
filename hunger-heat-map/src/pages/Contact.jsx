import { useState } from "react";
import "./Contact.css";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    inquiryType: "general",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const inquiryTypes = [
    { value: "general", label: "General Inquiry" },
    { value: "partnership", label: "Partnership" },
    { value: "volunteer", label: "Volunteer" },
    { value: "technical", label: "Technical Support" },
    { value: "media", label: "Media Inquiry" },
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

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
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

      alert(
        "Thank you for your message! We'll get back to you within 24 hours."
      );

      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        inquiryType: "general",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="container">
          <div className="contact-hero-content">
            <h1>Get in Touch</h1>
            <p className="contact-hero-subtitle">
              Have questions about Hunger HeatMap? Want to partner with us or
              volunteer? We'd love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="contact-content">
        <div className="container">
          <div className="contact-grid">
            {/* Contact Form */}
            <div className="contact-form-section">
              <div className="form-header">
                <h2>Send us a Message</h2>
                <p>
                  Fill out the form below and we'll get back to you as soon as
                  possible.
                </p>
              </div>

              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Full Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={errors.name ? "error" : ""}
                      placeholder="Enter your full name"
                    />
                    {errors.name && (
                      <span className="error-message">{errors.name}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={errors.email ? "error" : ""}
                      placeholder="Enter your email"
                    />
                    {errors.email && (
                      <span className="error-message">{errors.email}</span>
                    )}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="inquiryType">Inquiry Type</label>
                    <select
                      id="inquiryType"
                      name="inquiryType"
                      value={formData.inquiryType}
                      onChange={handleInputChange}
                    >
                      {inquiryTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="subject">Subject *</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className={errors.subject ? "error" : ""}
                      placeholder="What's this about?"
                    />
                    {errors.subject && (
                      <span className="error-message">{errors.subject}</span>
                    )}
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className={errors.message ? "error" : ""}
                    placeholder="Tell us more about your inquiry..."
                    rows="6"
                  />
                  {errors.message && (
                    <span className="error-message">{errors.message}</span>
                  )}
                </div>

                <button
                  type="submit"
                  className="submit-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner"></span>
                      Sending Message...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="contact-info-section">
              <div className="contact-info-card">
                <h3>Contact Information</h3>
                <p>Reach out to us through any of these channels:</p>

                <div className="contact-methods">
                  <div className="contact-method">
                    <div className="method-icon">📧</div>
                    <div className="method-content">
                      <h4>Email</h4>
                      <p>info@hungerheatmap.org</p>
                      <span>We respond within 24 hours</span>
                    </div>
                  </div>

                  <div className="contact-method">
                    <div className="method-icon">📞</div>
                    <div className="method-content">
                      <h4>Phone</h4>
                      <p>+234 (0) 123 456 7890</p>
                      <span>Mon-Fri, 9AM-6PM WAT</span>
                    </div>
                  </div>

                  <div className="contact-method">
                    <div className="method-icon">📍</div>
                    <div className="method-content">
                      <h4>Office</h4>
                      <p>Lagos, Nigeria</p>
                      <span>Visit by appointment only</span>
                    </div>
                  </div>
                </div>

                <div className="social-section">
                  <h4>Follow Us</h4>
                  <div className="social-links">
                    <a href="#" className="social-link" aria-label="Facebook">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                    </a>
                    <a href="#" className="social-link" aria-label="Twitter">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                      </svg>
                    </a>
                    <a href="#" className="social-link" aria-label="LinkedIn">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065c0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </a>
                    <a href="#" className="social-link" aria-label="Instagram">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.014 5.367 18.647.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.815 3.708 13.664 3.708 12.367s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323c-.875.807-2.026 1.297-3.323 1.297zm7.83-9.405c-.49 0-.875-.385-.875-.875s.385-.875.875-.875.875.385.875.875-.385.875-.875.875zm-7.83 1.297c-1.297 0-2.448 1.151-2.448 2.448s1.151 2.448 2.448 2.448 2.448-1.151 2.448-2.448-1.151-2.448-2.448-2.448z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            {/* FAQ Section */}
            <div className="faq-section">
              <h3>Frequently Asked Questions</h3>
              <div className="faq-list">
                <div className="faq-item">
                  <h4>How do I report a hunger hotspot?</h4>
                  <p>
                    Simply click on the map where you want to report, fill out
                    the form with details about the situation, and submit. Your
                    report will appear on the map immediately.
                  </p>
                </div>
                <div className="faq-item">
                  <h4>Can I volunteer with Hunger HeatMap?</h4>
                  <p>
                    Yes! We welcome volunteers for data collection, community
                    outreach, and technical support. Contact us to learn about
                    current opportunities.
                  </p>
                </div>
                <div className="faq-item">
                  <h4>How accurate is the hunger data?</h4>
                  <p>
                    Our data comes from verified community reports and partner
                    organizations. We continuously validate and update
                    information to ensure accuracy.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;
