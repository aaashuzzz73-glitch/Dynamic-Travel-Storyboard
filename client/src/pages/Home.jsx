
import { Link } from "react-router-dom";
import { ArrowUpRight, Mouse, Sparkles, ChevronRight } from "lucide-react";
import { useState } from "react";
import "./Home.css";

const collections = [
  {
    id: "kerala",
    eyebrow: "GOD'S OWN COUNTRY",
    title: "Explore Kerala",
    description: "Discover peaceful backwaters, misty mountains and beautiful coastal escapes.",
    destinations: [
      {
        name: "Munnar",
        location: "Idukki, Kerala",
        description: "Misty hills and endless tea gardens.",
        image: "https://images.unsplash.com/photo-1593693411515-c20261bcad6e?w=800",
      },
      {
        name: "Alleppey",
        location: "Alappuzha, Kerala",
        description: "Experience the magic of the backwaters.",
        image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800",
      },
      {
        name: "Wayanad",
        location: "Wayanad, Kerala",
        description: "Green landscapes and hidden waterfalls.",
        image: "https://images.unsplash.com/photo-1511497584788-876760111969?w=800",
      },
      {
        name: "Varkala",
        location: "Thiruvananthapuram, Kerala",
        description: "Cliffside views and beautiful beaches.",
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
      },
      {
        name: "Kochi",
        location: "Ernakulam, Kerala",
        description: "Heritage streets and coastal charm.",
        image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800",
      },
    ],
  },
  {
    id: "india",
    eyebrow: "INCREDIBLE INDIA",
    title: "Explore India",
    description: "From royal heritage to mountain escapes, discover India's diverse beauty.",
    destinations: [
      {
        name: "Jaipur",
        location: "Rajasthan, India",
        description: "Royal palaces and colourful heritage.",
        image: "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?w=800",
      },
      {
        name: "Agra",
        location: "Uttar Pradesh, India",
        description: "Discover timeless architectural wonders.",
        image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800",
      },
      {
        name: "Goa",
        location: "India",
        description: "Golden beaches and relaxed coastal life.",
        image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800",
      },
      {
        name: "Manali",
        location: "Himachal Pradesh, India",
        description: "Mountain adventures and snowy views.",
        image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800",
      },
      {
        name: "Udaipur",
        location: "Rajasthan, India",
        description: "Romantic lakes and royal architecture.",
        image: "https://images.unsplash.com/photo-1606293926075-69a00dbfde81?w=800",
      },
    ],
  },
  {
    id: "international",
    eyebrow: "BEYOND BORDERS",
    title: "Explore International",
    description: "Find inspiration for your next unforgettable journey around the world.",
    destinations: [
      {
        name: "Paris",
        location: "France",
        description: "Romantic streets and iconic landmarks.",
        image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800",
      },
      {
        name: "Bali",
        location: "Indonesia",
        description: "Tropical escapes and peaceful temples.",
        image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800",
      },
      {
        name: "Switzerland",
        location: "Europe",
        description: "Alpine mountains and scenic villages.",
        image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800",
      },
      {
        name: "Dubai",
        location: "United Arab Emirates",
        description: "Modern skylines and desert adventures.",
        image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800",
      },
      {
        name: "Maldives",
        location: "Indian Ocean",
        description: "Crystal-clear waters and island stays.",
        image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800",
      },
    ],
  },
];

const featureDetails = {
  planning: {
    icon: "✈️",
    title: "Smart Trip Planning",
    description: "Plan your journeys with ease. Organize destinations, travel dates and trip details in one beautiful space.",
    features: ["Create and organize trips", "Manage multiple destinations", "Track your travel plans"],
  },
  bookings: {
    icon: "🏨",
    title: "Booking Management",
    description: "Keep all your travel reservations organized in one place.",
    features: ["Manage hotel bookings", "Store booking references", "Edit and delete bookings"],
  },
  memories: {
    icon: "📸",
    title: "Travel Memories",
    description: "Preserve your favourite travel moments and revisit them anytime.",
    features: ["Upload travel photos", "View your travel gallery", "Organize memories by trip"],
  },
  journal: {
    icon: "📖",
    title: "Personal Journal",
    description: "Turn every journey into a beautiful personal story.",
    features: ["Write travel notes", "Save daily experiences", "Revisit your travel stories"],
  },
};

const Home = () => {
  const [selectedFeature, setSelectedFeature] = useState(null);

  return (
    <div className="public-home">
      <section className="cinematic-hero">
        <div className="travel-collage">
          <img src="https://images.unsplash.com/photo-1511497584788-876760111969?w=1000" alt="Forest" />
          <img src="https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=1000" alt="Waterfall" />
          <img src="https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=1000" alt="Lake" />
          <img src="https://images.unsplash.com/photo-1448375240586-882707db888b?w=1000" alt="Nature" />
          <img src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1000" alt="Mountains" />
          <img src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1000" alt="Landscape" />
        </div>

        <div className="hero-overlay" />

        <header className="home-navbar">
          <Link to="/" className="home-logo">
            <span className="logo-icon">✈</span>
            Travel Storyboard
          </Link>

          <nav>
            <Link to="/">Home</Link>
            <a href="#destinations">Explore Trips</a>
            <Link to="/about">About Us</Link>
            <Link to="/contact">Contact</Link>
          </nav>

          <Link to="/register" className="home-signup">
            Plan Your Trip <ArrowUpRight size={16} />
          </Link>
        </header>

        <div className="hero-center">
          <div className="hero-award">
            <Sparkles size={16} />
            YOUR PERSONAL TRAVEL STORYTELLER
          </div>

          <h1>
            Where Journeys
            <br />
            Meet <span>Memories.</span>
          </h1>

          <p>
            Discover new destinations, plan meaningful adventures
            and turn every journey into a beautiful story.
          </p>

          <div className="hero-buttons">
            <Link to="/register" className="hero-primary">
              Start Planning <ArrowUpRight size={18} />
            </Link>
            <a href="#destinations" className="hero-secondary">
              Explore Destinations
            </a>
          </div>
        </div>

        <div className="hero-scroll">
          <span>SCROLL TO EXPLORE</span>
          <Mouse size={30} />
          <span>⌄</span>
        </div>

        <div className="hero-bottom-label">
          EXPLORE · DISCOVER · REMEMBER
        </div>
      </section>

      <section id="features" className="home-features">
        <span className="home-eyebrow">WHAT WE OFFER</span>
        <h2>Everything Your Journey Needs</h2>
        <p>
          Plan trips, organize bookings, capture memories and
          keep every travel story in one place.
        </p>

        <div className="feature-list">
          <button className="feature-card" onClick={() => setSelectedFeature("planning")}>
            <span>✈️</span>
            <h3>Smart Trip Planning</h3>
            <p>Plan and organize your journeys with ease.</p>
            <small>Explore ↗</small>
          </button>

          <button className="feature-card" onClick={() => setSelectedFeature("bookings")}>
            <span>🏨</span>
            <h3>Booking Management</h3>
            <p>Keep all your travel bookings in one place.</p>
            <small>Explore ↗</small>
          </button>

          <button className="feature-card" onClick={() => setSelectedFeature("memories")}>
            <span>📸</span>
            <h3>Travel Memories</h3>
            <p>Save and revisit your favourite travel moments.</p>
            <small>Explore ↗</small>
          </button>

          <button className="feature-card" onClick={() => setSelectedFeature("journal")}>
            <span>📖</span>
            <h3>Personal Journal</h3>
            <p>Turn every journey into a beautiful story.</p>
            <small>Explore ↗</small>
          </button>
        </div>

        {selectedFeature && (
          <div className="feature-modal-overlay" onClick={() => setSelectedFeature(null)}>
            <div className="feature-modal" onClick={(e) => e.stopPropagation()}>
              <button
                className="feature-modal-close"
                onClick={() => setSelectedFeature(null)}
                aria-label="Close popup"
              >
                ×
              </button>

              <div className="feature-modal-header">
                <span className="feature-modal-icon">{featureDetails[selectedFeature].icon}</span>
                <h2>{featureDetails[selectedFeature].title}</h2>
                <p>{featureDetails[selectedFeature].description}</p>
              </div>

              <div className="feature-modal-body">
                <h3>What you can do</h3>
                <ul>
                  {featureDetails[selectedFeature].features.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <Link to="/register" className="hero-primary">
                Create Account <ArrowUpRight size={16} />
              </Link>

              <p className="feature-modal-note">
                Create an account to access this feature.
              </p>
            </div>
          </div>
        )}
      </section>

      <section id="destinations" className="home-destinations">
        <div className="destination-intro">
          <span className="home-eyebrow">FIND YOUR NEXT ADVENTURE</span>
          <h2>Where Would You Like to Go?</h2>
          <p>
            Explore handpicked destinations and find inspiration
            for your next travel story.
          </p>
        </div>

        {collections.map((collection) => (
          <div className="destination-collection" key={collection.id}>
            <div className="collection-heading">
              <div>
                <span className="home-eyebrow">{collection.eyebrow}</span>
                <h3>{collection.title}</h3>
                <p>{collection.description}</p>
              </div>

              <Link
                to={`/explore-trips?region=${collection.id}`}
                className="collection-view-all"
              >
                View All <ArrowUpRight size={16} />
              </Link>
            </div>

            <div className="destination-slider">
              {collection.destinations.map((destination) => (
                <Link
                  to={`/explore-trips/${collection.id}/${destination.name.toLowerCase().replace(/\s+/g, "-")}`}
                  className="destination-card"
                  key={destination.name}
                >
                  <img src={destination.image} alt={destination.name} loading="lazy" />
                  <div className="destination-card-overlay">
                    <span>{destination.location}</span>
                    <h4>{destination.name}</h4>
                    <p>{destination.description}</p>
                    <span className="destination-discover">
                      Discover <ChevronRight size={16} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </section>

      <footer className="home-footer">
        <div className="footer-brand">
          <Link to="/" className="home-logo">
            <span className="logo-icon">✈</span>
            Travel Storyboard
          </Link>
          <p>Explore. Discover. Remember.</p>
        </div>

        <div className="footer-links">
          <Link to="/contact">Contact</Link>
          <Link to="/about">About Us</Link>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>

        <div className="footer-bottom">
          © 2026 Travel Storyboard. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Home;
