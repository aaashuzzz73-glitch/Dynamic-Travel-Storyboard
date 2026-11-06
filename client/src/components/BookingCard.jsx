import { Plane, Train, Bus, Hotel, Trash2 } from "lucide-react";

const BookingCard = ({ booking, onDelete, onEdit }) => {
  const icons = {
    Flight: <Plane size={20} />,
    Train: <Train size={20} />,
    Bus: <Bus size={20} />,
    Hotel: <Hotel size={20} />,
  };

  return (
    <div className="booking-card">
      <div className="booking-icon">
        {icons[booking.bookingType]}
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
          <p>Reference: {booking.bookingReference}</p>
        )}
      </div>

      <div className="booking-actions">
        <button onClick={() => onEdit(booking)}>
          Edit
        </button>

        <button onClick={() => onDelete(booking._id)}>
          <Trash2 size={15} />
          Delete
        </button>
      </div>
    </div>
  );
};

export default BookingCard;