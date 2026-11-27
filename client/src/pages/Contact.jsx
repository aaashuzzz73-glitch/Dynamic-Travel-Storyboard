
import { useState } from "react";
import { Link } from "react-router-dom";
import PublicNavbar from "../components/PublicNavbar";
import { submitContactMessage } from "../services/contactService";
import "./Home.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({
    type: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFeedback({ type: "", message: "" });

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setFeedback({
        type: "error",
        message: "Please fill in all fields.",
      });
      return;
    }

    if (formData.message.trim().length < 10) {
      setFeedback({
        type: "error",
        message: "Message must contain at least 10 characters.",
      });
      return;
    }

    try {
      setLoading(true);

      const response = await submitContactMessage({
        name: formData.name.trim(),
        email: formData.email.trim(),
        message: formData.message.trim(),
      });

      setFeedback({
        type: "success",
        message: response.message || "Your message has been sent successfully!",
      });

      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      setFeedback({
        type: "error",
        message:
          error.response?.data?.message ||
          "Unable to send your message. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="public-home">
      <PublicNavbar />

      <section className="home-features">
        <span className="home-eyebrow">GET IN TOUCH</span>
        <h2>Contact Us</h2>

        <p>
          Have a question or suggestion? We would love to hear from you.
        </p>

        <form className="contact-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            maxLength={80}
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
            maxLength={254}
          />

          <textarea
            name="message"
            placeholder="Your Message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            required
            minLength={10}
            maxLength={2000}
          />

          <button
            type="submit"
            className="hero-primary"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>

        {feedback.message && (
          <p
            className={`contact-feedback ${feedback.type}`}
            role="status"
          >
            {feedback.message}
          </p>
        )}

        <Link to="/" className="hero-secondary">
          Back to Home
        </Link>
      </section>
    </div>
  );
};

export default Contact;
