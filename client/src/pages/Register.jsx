
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await register(formData);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-brand">
        <span className="auth-logo">✦ TRAVEL STORYBOARD</span>
        <div>
          <p className="auth-tagline">YOUR JOURNEY, YOUR STORY</p>
          <h1>Every journey deserves a beautiful story.</h1>
          <p>
            Plan your trips, save your memories and turn
            your adventures into stories worth sharing.
          </p>
        </div>
        <span className="auth-footer">Explore. Experience. Remember.</span>
      </div>

      <div className="auth-content">
        <form className="auth-form" onSubmit={handleSubmit}>
          <span className="auth-welcome">START YOUR JOURNEY</span>
          <h2>Create Account</h2>
          <p className="auth-description">
            Join us and start creating your travel stories.
          </p>

          {error && <p className="error-message">{error}</p>}

          <label htmlFor="register-name">Full Name</label>
          <input
            id="register-name"
            type="text"
            name="name"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label htmlFor="register-email">Email Address</label>
          <input
            id="register-email"
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="register-password">Password</label>
          <div className="auth-password">
            <input
              id="register-password"
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              minLength={6}
              required
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <button className="auth-submit" type="submit" disabled={loading}>
            {loading ? "Creating Account..." : "Create Account →"}
          </button>

          <p className="auth-switch">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
