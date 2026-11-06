import { Link } from "react-router-dom";
import { MapPin, CalendarDays, Trash2 } from "lucide-react";
import { formatDate, calculateTripDays } from "../utils/dateUtils";

const TripCard = ({ trip, onDelete }) => {
  return (
    <div className="trip-card">
      <div className="trip-card-content">
        <h3>{trip.tripName}</h3>

        <p>
          <MapPin size={15} />
          {trip.destinations.join(", ")}
        </p>

        <p>
          <CalendarDays size={15} />
          {formatDate(trip.startDate)} - {formatDate(trip.endDate)}
        </p>

        <span>
          {calculateTripDays(trip.startDate, trip.endDate)} Days
        </span>

        <div className="trip-card-actions">
          <Link to={`/trips/${trip._id}`}>
            View Trip
          </Link>

          <button onClick={() => onDelete(trip._id)}>
            <Trash2 size={15} /> Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TripCard;