
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

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
        const response = await axios.get(
          `${SERVER_ROOT}/api/public/share/${shareToken}`
        );

        const data = response.data;

        // Debugging: Check complete shared trip response
        console.log(
          "FULL SHARED DATA:",
          JSON.stringify(data, null, 2)
        );

        setTrip(data.trip);
        setBookings(data.bookings || []);
        setActivities(data.activities || []);
        setNotes(data.notes || []);
        setMedia(data.media || []);
      } catch (err) {
        console.error("Shared trip error:", err.response?.data || err);
        setError("This shared travel story is unavailable.");
      } finally {
        setLoading(false);
      }
    };

    fetchSharedTrip();
  }, [shareToken]);

  if (loading) return <p>Loading travel story...</p>;
  if (error) return <p>{error}</p>;
  if (!trip) return <p>Trip not found.</p>;

  return (
    <div className="shared-trip-page">
      <h1>{trip.tripName}</h1>

      <p>{trip.destinations?.join(", ")}</p>

      <p>
        {trip.startDate?.slice(0, 10)} – {trip.endDate?.slice(0, 10)}
      </p>

      <h2>Travel Storyboard</h2>

      <Timeline
        trip={trip}
        bookings={bookings}
        activities={activities}
        notes={notes}
        media={media}
      />
    </div>
  );
};

export default SharedTrip;
