
import { Link } from "react-router-dom";
import "./PublicNavbar.css";

const PublicNavbar = () => {
  return (
    <header className="public-nav">
      <Link to="/" className="public-nav-logo">
        <span>✈</span> Travel Storyboard
      </Link>

      <nav>
        <Link to="/">Home</Link>
        <Link to="/#features">Features</Link>
        <Link to="/about">About Us</Link>
        <Link to="/contact">Contact</Link>
      </nav>

      <Link to="/register" className="public-nav-cta">
        Plan Your Trip ↗
      </Link>
    </header>
  );
};

export default PublicNavbar;
