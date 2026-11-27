
import { Plane, Train, Bus, Hotel, Trash2 } from "lucide-react";

const BookingCard = ({ booking, onDelete, onEdit }) => {
  const icons = {
    Flight: <Plane size={22} />,
    Train: <Train size={22} />,
    Bus: <Bus size={22} />,
    Hotel: <Hotel size={22} />,
  };

  return (
    <div className="booking-card">
      <div className="booking-icon">
        {icons[booking.bookingType] || <Plane size={22} />}
      </div>

      <div className="booking-info">
        <span>{booking.bookingType} Booking</span>

        <h3>{booking.title}</h3>

        <p>{booking.location || "Location not specified"}</p>

        <small>
          {booking.bookingDate
            ? new Date(booking.bookingDate).toLocaleDateString()
            : "Date not specified"}
          {booking.bookingTime && ` · ${booking.bookingTime}`}
        </small>

        {booking.bookingReference && (
          <p className="booking-reference">
            Reference: {booking.bookingReference}
          </p>
        )}
      </div>

      <div className="booking-actions">
        <button type="button" onClick={() => onEdit(booking)}>
          Edit
        </button>

        <button type="button" onClick={() => onDelete(booking)}>
          <Trash2 size={15} />
          Delete
        </button>
      </div>
    </div>
  );
};

export default BookingCard;
