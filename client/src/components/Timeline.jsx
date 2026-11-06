
import { generateTimeline } from "../utils/timelineUtils";
import { formatDate } from "../utils/dateUtils";
import { SERVER_ROOT } from "../services/api";

import {
  Plane,
  MapPin,
  BookOpen,
  Camera,
} from "lucide-react";

const Timeline = ({
  trip,
  bookings = [],
  activities = [],
  notes = [],
  media = [],
}) => {
  const days = generateTimeline(
    trip.startDate,
    trip.endDate,
    bookings,
    activities,
    notes,
    media
  );

  return (
    <div className="timeline">
      {days.map((day, index) => (
        <section className="timeline-day" key={index}>
          <h3>
            Day {index + 1} - {formatDate(day.date)}
          </h3>

          {day.bookings.map((item) => (
            <div key={item._id} className="timeline-item">
              <Plane size={18} />
              <div>
                <h4>{item.title}</h4>
                <p>{item.bookingType} Booking</p>
                <small>{item.location}</small>
              </div>
            </div>
          ))}

          {day.activities.map((item) => (
            <div key={item._id} className="timeline-item">
              <MapPin size={18} />
              <div>
                <h4>{item.title}</h4>
                <p>{item.category}</p>
                <small>{item.location}</small>
              </div>
            </div>
          ))}

          {day.notes.map((item) => (
            <div key={item._id} className="timeline-item">
              <BookOpen size={18} />
              <div>
                <h4>{item.title}</h4>
                <p>{item.content}</p>
              </div>
            </div>
          ))}

          {day.media.map((item) => (
            <div key={item._id} className="timeline-item">
              <Camera size={18} />
              <div>
                <h4>Travel Photo</h4>
                <img
                  src={`${SERVER_ROOT}${item.url}`}
                  alt={item.originalName || "Travel photo"}
                  width="150"
                />
              </div>
            </div>
          ))}

          {!day.bookings.length &&
            !day.activities.length &&
            !day.notes.length &&
            !day.media.length && (
              <p>No events added for this day yet.</p>
            )}
        </section>
      ))}
    </div>
  );
};

export default Timeline;
