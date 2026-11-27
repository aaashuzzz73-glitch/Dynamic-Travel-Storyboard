
import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, Search } from "lucide-react";
import "./ExploreTrips.css";

const destinations = [
  { name: "Munnar", region: "kerala", location: "Idukki, Kerala", image: "https://images.unsplash.com/photo-1593693411515-c20261bcad6e?w=800", description: "Misty mountains and endless tea gardens." },
  { name: "Alleppey", region: "kerala", location: "Alappuzha, Kerala", image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800", description: "Beautiful backwaters and houseboat experiences." },
  { name: "Wayanad", region: "kerala", location: "Wayanad, Kerala", image: "https://images.unsplash.com/photo-1511497584788-876760111969?w=800", description: "Green forests, waterfalls and peaceful escapes." },
  { name: "Varkala", region: "kerala", location: "Thiruvananthapuram, Kerala", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800", description: "Cliffside views and beautiful beaches." },
  { name: "Kochi", region: "kerala", location: "Ernakulam, Kerala", image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800", description: "Heritage streets and coastal charm." },

  { name: "Jaipur", region: "india", location: "Rajasthan, India", image: "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?w=800", description: "Royal palaces and colourful heritage." },
  { name: "Agra", region: "india", location: "Uttar Pradesh, India", image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800", description: "Discover timeless architectural wonders." },
  { name: "Goa", region: "india", location: "India", image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800", description: "Golden beaches and relaxed coastal life." },
  { name: "Manali", region: "india", location: "Himachal Pradesh, India", image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800", description: "Mountain adventures and snowy views." },
  { name: "Udaipur", region: "india", location: "Rajasthan, India", image: "https://images.unsplash.com/photo-1606293926075-69a00dbfde81?w=800", description: "Romantic lakes and royal architecture." },

  { name: "Paris", region: "international", location: "France", image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800", description: "Romantic streets and iconic landmarks." },
  { name: "Bali", region: "international", location: "Indonesia", image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800", description: "Tropical escapes and peaceful temples." },
  { name: "Switzerland", region: "international", location: "Europe", image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800", description: "Alpine mountains and scenic villages." },
  { name: "Dubai", region: "international", location: "United Arab Emirates", image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800", description: "Modern skylines and desert adventures." },
  { name: "Maldives", region: "international", location: "Indian Ocean", image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800", description: "Crystal-clear waters and island stays." },
];

const regionNames = {
  all: "All Destinations",
  kerala: "Kerala Destinations",
  india: "Explore India",
  international: "International Destinations",
};

const ExploreTrips = () => {
  const [searchParams] = useSearchParams();
  const initialRegion = searchParams.get("region") || "all";

  const [activeRegion, setActiveRegion] = useState(
    regionNames[initialRegion] ? initialRegion : "all"
  );

  const [search, setSearch] = useState("");

  const filteredDestinations = useMemo(() => {
    return destinations.filter((destination) => {
      const matchesRegion =
        activeRegion === "all" || destination.region === activeRegion;

      const matchesSearch =
        destination.name.toLowerCase().includes(search.toLowerCase()) ||
        destination.location.toLowerCase().includes(search.toLowerCase());

      return matchesRegion && matchesSearch;
    });
  }, [activeRegion, search]);

  return (
    <main className="explore-page">
      <header className="explore-topbar">
     <Link to="/dashboard" className="explore-dashboard-btn">
  <ArrowLeft size={18} />
  Back to Dashboard
</Link>

        <Link to="/register" className="explore-plan">
          Plan Your Trip <ArrowUpRight size={16} />
        </Link>
      </header>

      <section className="explore-heading">
        <span className="home-eyebrow">
          EXPLORE · DISCOVER · REMEMBER
        </span>

        <h1>
          Find Your Next <span>Adventure.</span>
        </h1>

        <p>
          Explore beautiful destinations and find inspiration for your next journey.
        </p>
      </section>

      <section className="explore-controls">
        <div className="explore-search">
          <Search size={19} />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search destinations..."
            aria-label="Search destinations"
          />
        </div>

        <div className="explore-filters">
          {Object.entries(regionNames).map(([key, label]) => (
            <button
              key={key}
              className={activeRegion === key ? "active" : ""}
              onClick={() => setActiveRegion(key)}
            >
              {label}
            </button>
          ))}
        </div>
      </section>

      <section className="explore-results">
        <div className="explore-results-heading">
          <h2>{regionNames[activeRegion]}</h2>
          <span>{filteredDestinations.length} destinations</span>
        </div>

        {filteredDestinations.length > 0 ? (
          <div className="explore-grid">
            {filteredDestinations.map((destination) => {
              const destinationSlug = destination.name
                .toLowerCase()
                .replace(/\s+/g, "-");

              return (
                <Link
                  to={`/explore-trips/${destination.region}/${destinationSlug}`}
                  className="explore-card"
                  key={destination.name}
                  aria-label={`Explore ${destination.name}`}
                >
                  <div className="explore-card-image">
                    <img
                      src={destination.image}
                      alt={destination.name}
                      loading="lazy"
                    />
                  </div>

                  <div className="explore-card-content">
                    <span>{destination.location}</span>

                    <h3>{destination.name}</h3>

                    <p>{destination.description}</p>
<div className="explore-card-action">
  <span>Explore</span>
  <ArrowLeft size={17} />
</div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="explore-empty">
            <h3>No destinations found</h3>
            <p>Try another destination name or category.</p>
          </div>
        )}
      </section>

      <footer className="explore-footer">
        <Link to="/">Travel Storyboard</Link>
        <p>Explore. Discover. Remember.</p>
      </footer>
    </main>
  );
};

export default ExploreTrips;
