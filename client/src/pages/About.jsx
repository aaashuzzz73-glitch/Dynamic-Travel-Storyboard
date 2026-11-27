
import { Link } from "react-router-dom";
import PublicNavbar from "../components/PublicNavbar";
import "./Home.css";

const About = () => {
  return (
    <div className="public-home">
      <PublicNavbar />

      <section className="home-features about-content">
        <span className="home-eyebrow">OUR STORY</span>
        <h2>About Travel Storyboard</h2>
        <p>
          Travel Storyboard helps travellers plan their journeys,
          organize bookings and preserve their favourite memories
          in one beautiful space.
        </p>

        <h2>Our Purpose</h2>
        <p>
          We believe every journey has a story worth remembering.
          Our goal is to make travel planning simple and memorable.
        </p>

        <Link to="/" className="hero-primary">Back to Home</Link>
      </section>
    </div>
  );
};

export default About;
