
import { useEffect, useState } from "react";
import { generateTimeline } from "../utils/timelineUtils";
import { formatDate } from "../utils/dateUtils";
import { SERVER_ROOT } from "../services/api";

import {
  Plane,
  MapPin,
  BookOpen,
  Camera,
  X,
  ZoomIn,
} from "lucide-react";

const Timeline = ({
  trip,
  bookings = [],
  activities = [],
  notes = [],
  media = [],
}) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const days = generateTimeline(
    trip.startDate,
    trip.endDate,
    bookings,
    activities,
    notes,
    media
  );

  // Close image preview using Escape key
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setSelectedImage(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const getImageUrl = (url) => {
    if (!url) return "";

    return url.startsWith("http")
      ? url
      : `${SERVER_ROOT}${url}`;
  };

  return (
    <>
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

                  <button
                    type="button"
                    onClick={() => setSelectedImage(item)}
                    aria-label={`View ${item.originalName || "travel photo"} in full size`}
                    title="View full-size image"
                    style={{
                      position: "relative",
                      display: "inline-block",
                      padding: 0,
                      marginTop: "10px",
                      border: "none",
                      background: "transparent",
                      cursor: "zoom-in",
                      borderRadius: "12px",
                      overflow: "hidden",
                    }}
                  >
                    <img
                      src={getImageUrl(item.url)}
                      alt={item.originalName || "Travel photo"}
                      style={{
                        display: "block",
                        width: "150px",
                        height: "auto",
                        maxHeight: "150px",
                        objectFit: "cover",
                        borderRadius: "12px",
                      }}
                    />

                    <span
                      style={{
                        position: "absolute",
                        right: "8px",
                        bottom: "8px",
                        background: "rgba(0,0,0,0.7)",
                        color: "#fff",
                        padding: "6px",
                        borderRadius: "50%",
                        display: "flex",
                      }}
                    >
                      <ZoomIn size={17} />
                    </span>
                  </button>
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

      {/* FULL-SIZE IMAGE PREVIEW */}

      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 99999,
            background: "rgba(0,0,0,0.92)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "25px",
          }}
        >
          <button
            type="button"
            onClick={() => setSelectedImage(null)}
            aria-label="Close image preview"
            style={{
              position: "absolute",
              top: "20px",
              right: "25px",
              border: "none",
              borderRadius: "50%",
              background: "#ffffff",
              color: "#111",
              width: "42px",
              height: "42px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <X size={24} />
          </button>

          <div
            onClick={(event) => event.stopPropagation()}
            style={{
              maxWidth: "95vw",
              maxHeight: "90vh",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <img
              src={getImageUrl(selectedImage.url)}
              alt={selectedImage.originalName || "Travel photo"}
              style={{
                maxWidth: "90vw",
                maxHeight: "82vh",
                width: "auto",
                height: "auto",
                objectFit: "contain",
                borderRadius: "12px",
                boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
              }}
            />

            <p
              style={{
                color: "#fff",
                fontSize: "14px",
                textAlign: "center",
                margin: 0,
              }}
            >
              {selectedImage.originalName || "Travel Photo"}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Timeline;
