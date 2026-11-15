
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { MapPin, CalendarDays, Compass, LoaderCircle } from "lucide-react";

import { SERVER_ROOT } from "../services/api";
import Timeline from "../components/Timeline";

const SharedTrip = () => {
  const { shareToken } = useParams();

  const [trip, setTrip] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [activities, setActivities] = useState([]);
  const [notes, setNotes] = useState([]);
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSharedTrip = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await axios.get(
          `${SERVER_ROOT}/api/public/share/${shareToken}`
        );

        const data = response.data;

        setTrip(data.trip);
        setBookings(data.bookings || []);
        setActivities(data.activities || []);
        setNotes(data.notes || []);
        setMedia(data.media || []);
      } catch (err) {
        console.error("Shared trip error:", err);
        setError("This shared travel story is unavailable.");
      } finally {
        setLoading(false);
      }
    };

    fetchSharedTrip();
  }, [shareToken]);

  if (loading) {
    return (
      <div className="shared-status">
        <LoaderCircle className="shared-loader" size={35} />
        <h2>Preparing your travel story...</h2>
        <p>Collecting beautiful travel memories.</p>
      </div>
    );
  }

  if (error || !trip) {
    return (
      <div className="shared-status">
        <Compass size={42} />
        <h2>Travel Story Unavailable</h2>
        <p>{error || "Trip not found."}</p>
      </div>
    );
  }

  return (
    <div className="shared-trip-page">
      <header className="shared-hero">
        <div className="shared-hero-content">
          <span className="shared-eyebrow">
            YOUR JOURNEY, BEAUTIFULLY SHARED
          </span>

          <h1>{trip.tripName}</h1>

          <p className="shared-destination">
            <MapPin size={18} />
            {trip.destinations?.join(", ") || "Travel Destination"}
          </p>

          <div className="shared-date">
            <CalendarDays size={18} />
            <span>
              {trip.startDate?.slice(0, 10)} –{" "}
              {trip.endDate?.slice(0, 10)}
            </span>
          </div>
        </div>

        <div className="shared-hero-decoration">
          <Compass size={110} strokeWidth={1} />
        </div>
      </header>

      <main className="shared-content">
        <div className="shared-section-heading">
          <span>THE JOURNEY</span>
          <h2>Travel Storyboard</h2>
          <p>Every destination has a story worth remembering.</p>
        </div>

        <div className="shared-timeline-wrapper">
          <Timeline
            trip={trip}
            bookings={bookings}
            activities={activities}
            notes={notes}
            media={media}
          />
        </div>

        <footer className="shared-footer">
          <span>✦</span>
          Made for journeys and memories
          <span>✦</span>
        </footer>
      </main>
    </div>
  );
};

export default SharedTrip;
