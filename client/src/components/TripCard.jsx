
import { Link } from "react-router-dom";
import {
  MapPin,
  CalendarDays,
  Trash2,
  ArrowUpRight,
} from "lucide-react";
import { formatDate, calculateTripDays } from "../utils/dateUtils";

const TripCard = ({ trip, onDelete }) => {
  const destinations = Array.isArray(trip.destinations)
    ? trip.destinations
    : [];

  const days = calculateTripDays(trip.startDate, trip.endDate);

  return (
    <article className="trip-card premium-trip-card">
      <div className="trip-card-image">
        <img
          src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=85"
          alt={destinations.join(", ") || "Travel destination"}
        />

        <span className="trip-days-badge">
          {days} Days
        </span>

        <span className="trip-location-badge">
          <MapPin size={13} />
          {destinations[0] || "Your destination"}
        </span>
      </div>

      <div className="trip-card-content">
        <h3>{trip.tripName}</h3>

        <p className="trip-card-location">
          <MapPin size={15} />
          {destinations.join(", ")}
        </p>

        <p className="trip-card-date">
          <CalendarDays size={15} />
          {formatDate(trip.startDate)} – {formatDate(trip.endDate)}
        </p>

        <div className="trip-card-actions">
          <Link to={`/trips/${trip._id}`} className="trip-view-btn">
            View Trip <ArrowUpRight size={16} />
          </Link>

          <button
            className="trip-delete-btn"
            onClick={() => onDelete(trip._id)}
            aria-label="Delete trip"
          >
            <Trash2 size={17} />
          </button>
        </div>
      </div>
    </article>
  );
};

export default TripCard;
