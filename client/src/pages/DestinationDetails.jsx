import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowUpRight,
  MapPin,
  CalendarDays,
  Compass,
  Sparkles,
  Landmark,
} from "lucide-react";
import "./DestinationDetails.css";

const destinationDetails = {
  munnar: {
    name: "Munnar",
    region: "Kerala, India",
    image: "https://images.unsplash.com/photo-1593693411515-c20261bcad6e?w=1600",
    description: "Escape into mist-covered mountains, endless tea plantations and peaceful valleys. Munnar is a beautiful hill destination for nature lovers.",
    bestTime: "September – March",
    duration: "2–3 days",
    highlights: ["Tea plantations", "Mountain viewpoints", "Waterfalls", "Nature walks"],
    attractions: ["Eravikulam National Park", "Mattupetty Dam", "Top Station", "Tea Museum"],
    itinerary: [
      ["Day 1", "Explore tea gardens and visit the Tea Museum."],
      ["Day 2", "Discover Mattupetty Dam and nearby viewpoints."],
      ["Day 3", "Visit Eravikulam National Park and enjoy the mountain scenery."],
    ],
    gallery: [
      { image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80", title: "Tea garden views" },
      { image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80", title: "Mountain landscapes" },
      { image: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=80", title: "Nature escapes" },
    ],
  },
  alleppey: {
    name: "Alleppey",
    region: "Alappuzha, Kerala, India",
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=1600",
    description: "Experience the peaceful charm of Kerala's backwaters, traditional houseboats and beautiful village landscapes.",
    bestTime: "October – March",
    duration: "2–3 days",
    highlights: ["Backwater cruises", "Houseboat stays", "Village experiences", "Beaches"],
    attractions: ["Alappuzha Beach", "Vembanad Lake", "Pathiramanal Island", "Marari Beach"],
    itinerary: [
      ["Day 1", "Explore Alappuzha town and relax at the beach."],
      ["Day 2", "Enjoy a backwater cruise and houseboat experience."],
      ["Day 3", "Discover nearby islands and village landscapes."],
    ],
    gallery: [
      { image: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1200&q=80", title: "Peaceful waters" },
      { image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1200&q=80", title: "Backwater scenery" },
      { image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80", title: "Village landscapes" },
    ],
  },
  wayanad: {
    name: "Wayanad",
    region: "Kerala, India",
    image: "https://images.unsplash.com/photo-1511497584788-876760111969?w=1600",
    description: "Discover green forests, misty hills, waterfalls and peaceful nature escapes in the Western Ghats.",
    bestTime: "October – May",
    duration: "2–4 days",
    highlights: ["Forest trails", "Waterfalls", "Mountain views", "Wildlife"],
    attractions: ["Edakkal Caves", "Banasura Sagar Dam", "Soochipara Waterfalls", "Pookode Lake"],
    itinerary: [
      ["Day 1", "Explore Pookode Lake and nearby viewpoints."],
      ["Day 2", "Visit Edakkal Caves and discover the surrounding landscapes."],
      ["Day 3", "Explore Banasura Sagar Dam and waterfalls."],
    ],
    gallery: [
      { image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=80", title: "Forest trails" },
      { image: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=80", title: "Green landscapes" },
      { image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80", title: "Mountain views" },
    ],
  },
  varkala: {
    name: "Varkala",
    region: "Thiruvananthapuram, Kerala, India",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600",
    description: "Enjoy dramatic coastal cliffs, beautiful sunsets and a relaxed beach atmosphere along the Arabian Sea.",
    bestTime: "October – March",
    duration: "2 days",
    highlights: ["Cliffside views", "Beach sunsets", "Coastal cafes", "Water activities"],
    attractions: ["Varkala Cliff", "Papanasam Beach", "Kappil Beach", "Anjengo Fort"],
    itinerary: [
      ["Day 1", "Explore Varkala Cliff, cafes and Papanasam Beach."],
      ["Day 2", "Visit Kappil Beach and enjoy the coastal scenery."],
    ],
    gallery: [
      { image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80", title: "Coastal views" },
      { image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1200&q=80", title: "Beach moments" },
      { image: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1200&q=80", title: "Ocean scenery" },
    ],
  },
  kochi: {
    name: "Kochi",
    region: "Ernakulam, Kerala, India",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1600",
    description: "Explore a coastal city filled with historic streets, cultural influences, waterfront views and lively local experiences.",
    bestTime: "October – March",
    duration: "2–3 days",
    highlights: ["Colonial heritage", "Local food", "Art and culture", "Waterfront views"],
    attractions: ["Fort Kochi", "Chinese Fishing Nets", "Mattancherry Palace", "Jew Town"],
    itinerary: [
      ["Day 1", "Explore Fort Kochi and the Chinese Fishing Nets."],
      ["Day 2", "Discover Mattancherry Palace and Jew Town."],
      ["Day 3", "Enjoy local food, art spaces and waterfront views."],
    ],
    gallery: [
      { image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80", title: "Coastal heritage" },
      { image: "https://images.unsplash.com/photo-1494522358652-f30e61a60313?auto=format&fit=crop&w=1200&q=80", title: "City streets" },
      { image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80", title: "Waterfront views" },
    ],
  },
  jaipur: {
    name: "Jaipur",
    region: "Rajasthan, India",
    image: "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?w=1600",
    description: "Discover Rajasthan's royal heritage through grand forts, colourful markets and beautiful historic architecture.",
    bestTime: "October – March",
    duration: "2–3 days",
    highlights: ["Royal architecture", "Historic forts", "Local markets", "Rajasthani food"],
    attractions: ["Amber Fort", "Hawa Mahal", "City Palace", "Jantar Mantar"],
    itinerary: [
      ["Day 1", "Explore Amber Fort and nearby viewpoints."],
      ["Day 2", "Visit Hawa Mahal, City Palace and Jantar Mantar."],
      ["Day 3", "Explore local markets and traditional food."],
    ],
    gallery: [
      { image: "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?auto=format&fit=crop&w=1200&q=80", title: "Royal architecture" },
      { image: "https://images.unsplash.com/photo-1567157577867-05ccb1388e66?auto=format&fit=crop&w=1200&q=80", title: "Pink City" },
      { image: "https://images.unsplash.com/photo-1585506942812-e72b29cef752?auto=format&fit=crop&w=1200&q=80", title: "Historic landmarks" },
    ],
  },
  agra: {
    name: "Agra",
    region: "Uttar Pradesh, India",
    image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=1600",
    description: "Experience India's remarkable Mughal heritage and discover some of its most iconic architectural landmarks.",
    bestTime: "October – March",
    duration: "1–2 days",
    highlights: ["Mughal architecture", "Historic monuments", "Gardens", "Local cuisine"],
    attractions: ["Taj Mahal", "Agra Fort", "Mehtab Bagh", "Fatehpur Sikri"],
    itinerary: [
      ["Day 1", "Visit the Taj Mahal and explore Agra Fort."],
      ["Day 2", "Discover Mehtab Bagh and nearby heritage sites."],
    ],
    gallery: [
      {
        image: "https://images.unsplash.com/photo-1681097233063-aa7a941bb688?auto=format&fit=crop&w=1200&q=80",
        title: "Taj Mahal",
      },
      {
        image: "https://images.unsplash.com/photo-1732639840730-a3cdf066a9e6?auto=format&fit=crop&w=1200&q=80",
        title: "Agra Fort",
      },
      {
        image: "https://assets.waybird.com/experiences/kodak_images/000/015/824/original/Visit_Mehtab_Bagh__the_Moonlight_Gardens_of_Agra.jpg",
        title: "Mehtab Bagh",
      },
    ],
  },
  goa: {
    name: "Goa",
    region: "India",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1600",
    description: "Enjoy sunny beaches, Portuguese-influenced heritage, colourful markets and a relaxed coastal atmosphere.",
    bestTime: "November – February",
    duration: "3–4 days",
    highlights: ["Beaches", "Heritage sites", "Water activities", "Local food"],
    attractions: ["Baga Beach", "Fort Aguada", "Basilica of Bom Jesus", "Anjuna Beach"],
    itinerary: [
      ["Day 1", "Explore North Goa beaches and coastal markets."],
      ["Day 2", "Discover historic churches and heritage landmarks."],
      ["Day 3", "Relax at the beach and enjoy local cuisine."],
    ],
    gallery: [
      { image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80", title: "Golden beaches" },
      { image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1200&q=80", title: "Coastal escapes" },
      { image: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1200&q=80", title: "Ocean views" },
    ],
  },
  manali: {
    name: "Manali",
    region: "Himachal Pradesh, India",
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=1600",
    description: "A mountain escape surrounded by snow-covered peaks, scenic valleys and opportunities for outdoor adventures.",
    bestTime: "March – June",
    duration: "3–4 days",
    highlights: ["Mountain scenery", "Adventure activities", "Valley views", "Local culture"],
    attractions: ["Solang Valley", "Hadimba Temple", "Old Manali", "Rohtang Pass"],
    itinerary: [
      ["Day 1", "Explore Manali town and Hadimba Temple."],
      ["Day 2", "Discover Solang Valley and mountain activities."],
      ["Day 3", "Visit Old Manali and nearby scenic spots."],
    ],
    gallery: [
      { image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80", title: "Snowy mountains" },
      { image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80", title: "Mountain valleys" },
      { image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80", title: "Scenic escapes" },
    ],
  },
  udaipur: {
    name: "Udaipur",
    region: "Rajasthan, India",
    image: "https://images.unsplash.com/photo-1606293926075-69a00dbfde81?w=1600",
    description: "Discover beautiful lakes, royal palaces and romantic heritage in Rajasthan's City of Lakes.",
    bestTime: "October – March",
    duration: "2–3 days",
    highlights: ["Lake views", "Royal palaces", "Heritage walks", "Boat rides"],
    attractions: ["City Palace", "Lake Pichola", "Jag Mandir", "Saheliyon Ki Bari"],
    itinerary: [
      ["Day 1", "Explore City Palace and Lake Pichola."],
      ["Day 2", "Discover Jag Mandir and the old city."],
      ["Day 3", "Visit Saheliyon Ki Bari and local markets."],
    ],
    gallery: [
      { image: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1200&q=80", title: "Lake views" },
      { image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1200&q=80", title: "Heritage scenery" },
      { image: "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?auto=format&fit=crop&w=1200&q=80", title: "Royal details" },
    ],
  },
  paris: {
    name: "Paris",
    region: "France",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1600",
    description: "Experience iconic landmarks, charming streets, art museums and the timeless atmosphere of the French capital.",
    bestTime: "April – June, September – October",
    duration: "3–5 days",
    highlights: ["Iconic landmarks", "Art museums", "French cuisine", "City walks"],
    attractions: ["Eiffel Tower", "Louvre Museum", "Notre-Dame Cathedral", "Arc de Triomphe"],
    itinerary: [
      ["Day 1", "Discover the Eiffel Tower and Seine riverfront."],
      ["Day 2", "Explore the Louvre Museum and historic centre."],
      ["Day 3", "Visit Montmartre and enjoy the city's cafes."],
    ],
    gallery: [
      { image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=1200&q=80", title: "Paris streets" },
      { image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80", title: "Paris landmarks" },
      { image: "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&w=1200&q=80", title: "City romance" },
    ],
  },
  bali: {
    name: "Bali",
    region: "Indonesia",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1600",
    description: "Discover tropical beaches, peaceful temples, lush rice terraces and the island's distinctive culture.",
    bestTime: "April – October",
    duration: "4–6 days",
    highlights: ["Tropical beaches", "Temples", "Rice terraces", "Island culture"],
    attractions: ["Uluwatu Temple", "Ubud", "Tegallalang Rice Terraces", "Tanah Lot"],
    itinerary: [
      ["Day 1", "Explore Ubud and its cultural surroundings."],
      ["Day 2", "Discover rice terraces and local villages."],
      ["Day 3", "Visit Uluwatu Temple and enjoy coastal views."],
    ],
    gallery: [
      { image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1200&q=80", title: "Tropical retreat" },
      { image: "https://images.unsplash.com/photo-1530789253388-582c481c54b0?auto=format&fit=crop&w=1200&q=80", title: "Island scenery" },
      { image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80", title: "Bali landscapes" },
    ],
  },
  switzerland: {
    name: "Switzerland",
    region: "Europe",
    image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=1600",
    description: "Experience alpine scenery, peaceful lakes, mountain villages and spectacular landscapes.",
    bestTime: "June – September",
    duration: "5–7 days",
    highlights: ["Alpine landscapes", "Mountain railways", "Lakes", "Scenic villages"],
    attractions: ["Jungfraujoch", "Lake Geneva", "Interlaken", "Lucerne"],
    itinerary: [
      ["Day 1", "Explore Lucerne and its lakefront."],
      ["Day 2", "Discover Interlaken and the surrounding scenery."],
      ["Day 3", "Enjoy a mountain excursion in the Jungfrau region."],
    ],
    gallery: [
      { image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80", title: "Alpine lakes" },
      { image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80", title: "Mountain peaks" },
      { image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=1200&q=80", title: "Swiss scenery" },
    ],
  },
  dubai: {
    name: "Dubai",
    region: "United Arab Emirates",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1600",
    description: "Explore a modern city known for its impressive skyline, cultural districts, shopping and desert landscapes.",
    bestTime: "November – March",
    duration: "3–4 days",
    highlights: ["Modern architecture", "Desert experiences", "Shopping", "Cultural districts"],
    attractions: ["Burj Khalifa", "Dubai Mall", "Dubai Marina", "Al Fahidi Historical Neighbourhood"],
    itinerary: [
      ["Day 1", "Explore Downtown Dubai and Burj Khalifa."],
      ["Day 2", "Discover Dubai Marina and the waterfront."],
      ["Day 3", "Experience the desert and explore local culture."],
    ],
    gallery: [
      { image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80", title: "Dubai skyline" },
      { image: "https://images.pexels.com/photos/14750492/pexels-photo-14750492.jpeg?cs=srgb&dl=pexels-kadiravsarr-14750492.jpg&fm=jpg", title: "Desert atmosphere" },
      { image: "https://images.unsplash.com/photo-1512632578888-169bbbc64f33?auto=format&fit=crop&w=1200&q=80", title: "Modern city" },
    ],
  },
  maldives: {
    name: "Maldives",
    region: "Indian Ocean",
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=1600",
    description: "Escape to tropical islands surrounded by turquoise waters, white-sand beaches and beautiful marine life.",
    bestTime: "November – April",
    duration: "3–5 days",
    highlights: ["Island stays", "Snorkelling", "Beaches", "Marine life"],
    attractions: ["Malé", "Maafushi", "Banana Reef", "Vaadhoo Island"],
    itinerary: [
      ["Day 1", "Arrive and explore your island surroundings."],
      ["Day 2", "Enjoy a snorkelling or marine-life excursion."],
      ["Day 3", "Relax on the beach and discover local island life."],
    ],
    gallery: [
      { image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=80", title: "Island paradise" },
      { image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1200&q=80", title: "Turquoise waters" },
      { image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80", title: "White sand beaches" },
    ],
  },
};

const DestinationDetails = () => {
  const { region, destination: slug } = useParams();
  const destination = destinationDetails[slug];

  if (!destination) {
    return (
      <main className="destination-not-found">
        <h2>Destination not found</h2>
        <Link to="/explore-trips">Back to Explore Trips</Link>
      </main>
    );
  }

  return (
    <main className="destination-details-page">
      <div className="destination-details-topbar">
        <Link to={`/explore-trips?region=${region}`} className="destination-back">
          <ArrowLeft size={18} /> Back to destinations
        </Link>
        <Link to="/register" className="destination-plan-top">
          Start Planning <ArrowUpRight size={16} />
        </Link>
      </div>

      <section className="destination-hero">
        <img src={destination.image} alt={destination.name} />
        <div className="destination-hero-overlay" />
        <div className="destination-hero-content">
          <span><MapPin size={15} /> {destination.region}</span>
          <h1>{destination.name}</h1>
          <p>{destination.description}</p>
          <a href="#destination-overview" className="destination-explore-button">
            Discover Destination <ArrowUpRight size={17} />
          </a>
        </div>
      </section>

      <section className="destination-overview" id="destination-overview">
        <div className="destination-section-heading">
          <span className="home-eyebrow">GET TO KNOW THE PLACE</span>
          <h2>Discover {destination.name}</h2>
          <p>{destination.description}</p>
        </div>

        <div className="destination-info-grid">
          <article className="destination-info-card">
            <CalendarDays />
            <h3>Best Time to Visit</h3>
            <p>{destination.bestTime}</p>
          </article>
          <article className="destination-info-card">
            <Compass />
            <h3>Suggested Duration</h3>
            <p>{destination.duration}</p>
          </article>
        </div>
      </section>

      
<section className="destination-highlights">
  <div className="destination-section-heading">
    <span className="home-eyebrow">EXPERIENCE MORE</span>
    <h2>Travel Highlights</h2>
    <p>Discover what makes {destination.name} special.</p>
  </div>

  <div className="destination-highlight-grid">
    {destination.highlights.map((highlight, index) => (
      <article className="destination-highlight" key={highlight}>
        <span className="destination-highlight-icon">
          <Sparkles size={22} />
        </span>

        <div>
          <span className="destination-highlight-number">
            0{index + 1}
          </span>
          <h3>{highlight}</h3>
        </div>
      </article>
    ))}
  </div>
</section>


 <section className="destination-attractions">
  <div className="destination-section-heading">
    <span className="home-eyebrow">PLACES TO EXPLORE</span>
    <h2>Popular Attractions</h2>
    <p>Explore the must-visit places around {destination.name}.</p>
  </div>

  <div className="destination-attraction-grid">
    {destination.attractions.map((attraction, index) => (
      <article className="destination-attraction-card" key={attraction}>
        <div className="destination-attraction-visual">
          <span className="destination-attraction-number">
            0{index + 1}
          </span>
          <Landmark size={34} />
        </div>

        <div className="destination-attraction-content">
          <span>DISCOVER THIS PLACE</span>
          <h3>{attraction}</h3>
        <a
  className="destination-attraction-link"
  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${attraction} ${destination.name}`
  )}`}
  target="_blank"
  rel="noopener noreferrer"
>
  Explore attraction <ArrowUpRight size={16} />
</a>
        </div>
      </article>
    ))}
  </div>
</section>

    
{destination.gallery?.length > 0 && (
  <section className="destination-gallery">
    <div className="destination-section-heading">
      <span className="home-eyebrow">CAPTURE THE MOMENTS</span>
      <h2>Explore {destination.name}</h2>
      <p>A glimpse of the beautiful places waiting for you.</p>
    </div>

    <div className="destination-gallery-grid">
      {destination.gallery.map((photo, index) => (
        <article className="destination-gallery-card" key={photo.title}>
          <img src={photo.image} alt={photo.title} loading="lazy" />
          <div className="destination-gallery-overlay">
            <span>0{index + 1}</span>
            <h3>{photo.title}</h3>
          </div>
        </article>
      ))}
    </div>
  </section>
)}

<section className="destination-itinerary">
  <div className="destination-section-heading">
    <span className="home-eyebrow">YOUR JOURNEY</span>
    <h2>Suggested Itinerary</h2>
    <p>A little inspiration for every day of your adventure.</p>
  </div>

  <div className="destination-itinerary-list">
    {destination.itinerary.map(([day, activity], index) => (
      <article className="destination-itinerary-item" key={day}>
        <div className="itinerary-timeline-marker">
          <span>{String(index + 1).padStart(2, "0")}</span>
        </div>

        <div className="itinerary-timeline-content">
          <span className="itinerary-day-label">{day}</span>
          <p>{activity}</p>
        </div>
      </article>
    ))}
  </div>
</section>


      <section className="destination-plan-section">
        <span className="home-eyebrow">YOUR NEXT ADVENTURE STARTS HERE</span>
        <h2>Ready to explore {destination.name}?</h2>
        <p>Create your own trip, organise your activities and save your travel memories.</p>
        <Link
          to="/register"
          state={{ destination: destination.name, region: destination.region }}
          className="destination-plan-button"
        >
          Plan This Trip <ArrowUpRight size={18} />
        </Link>
      </section>

      <footer className="destination-details-footer">
        <Link to="/">Travel Storyboard</Link>
        <p>Explore. Discover. Remember.</p>
      </footer>
    </main>
  );
};

export default DestinationDetails;
