

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  getTripById,
  updateTripSharing,
} from "../services/tripService";

import { getBookings } from "../services/bookingService";
import { getNotes } from "../services/noteService";
import { getMedia } from "../services/mediaService";

import {
  getActivities,
  createActivity,
  deleteActivity,
} from "../services/activityService";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Timeline from "../components/Timeline";
import WeatherCard from "../components/WeatherCard";
import PhotoGallery from "../components/PhotoGallery";
import PhotoUpload from "../components/PhotoUpload";

const TripDetails = () => {
  const { tripId } = useParams();

  const [trip, setTrip] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [activities, setActivities] = useState([]);
  const [notes, setNotes] = useState([]);
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [shareLink, setShareLink] = useState("");
  const [sharing, setSharing] = useState(false);

  const [activityForm, setActivityForm] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    category: "Other",
  });

  useEffect(() => {
    const fetchTripDetails = async () => {
      try {
        const [
          tripData,
          bookingData,
          activityData,
          noteData,
          mediaData,
        ] = await Promise.all([
          getTripById(tripId),
          getBookings(tripId),
          getActivities(tripId),
          getNotes(tripId),
          getMedia(tripId),
        ]);

        setTrip(tripData.trip || tripData);
        setBookings(bookingData.bookings || bookingData);
        setActivities(activityData.activities || activityData);
        setNotes(noteData.notes || noteData);
        setMedia(mediaData.media || mediaData);
      } catch (err) {
        setError("Unable to load trip details.");
      } finally {
        setLoading(false);
      }
    };

    fetchTripDetails();
  }, [tripId]);

  const handleShare = async () => {
    try {
      setSharing(true);

      const response = await updateTripSharing(tripId, true);
      const updatedTrip = response.trip || response;

      const link = `${window.location.origin}/share/${updatedTrip.shareToken}`;

      setShareLink(link);
      await navigator.clipboard.writeText(link);

      alert("Share link copied!");
    } catch (error) {
      alert("Unable to generate share link.");
    } finally {
      setSharing(false);
    }
  };

  const handleActivityChange = (e) => {
    setActivityForm({
      ...activityForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddActivity = async (e) => {
    e.preventDefault();

    try {
      const response = await createActivity(tripId, activityForm);
      const newActivity = response.activity || response;

      setActivities((prev) => [...prev, newActivity]);

      setActivityForm({
        title: "",
        description: "",
        date: "",
        time: "",
        location: "",
        category: "Other",
      });

      alert("Activity added successfully!");
    } catch (error) {
      alert("Unable to add activity.");
    }
  };

  const handleDeleteActivity = async (activityId) => {
    if (!window.confirm("Delete this activity?")) return;

    try {
      await deleteActivity(tripId, activityId);

      setActivities((prev) =>
        prev.filter((item) => item._id !== activityId)
      );
    } catch (error) {
      alert("Unable to delete activity.");
    }
  };

  return (
    <div className="app-layout">
      <Navbar />

      <div className="dashboard-layout">
        <Sidebar />

        <main className="dashboard-content trip-details-page">
          {loading ? (
            <p>Loading trip details...</p>
          ) : error ? (
            <p className="error-message">{error}</p>
          ) : trip ? (
            <>
              <section className="trip-hero">
                <div>
                  <span className="trip-label">YOUR TRAVEL STORY</span>
                  <h1>{trip.tripName}</h1>

                  <p className="trip-destinations">
                    📍 {trip.destinations?.join(", ")}
                  </p>

                  <p className="trip-dates">
                    📅 {new Date(trip.startDate).toLocaleDateString()}
                    {" - "}
                    {new Date(trip.endDate).toLocaleDateString()}
                  </p>

                  <button onClick={handleShare} disabled={sharing}>
                    {sharing ? "Generating..." : "Share Trip"}
                  </button>

                  {shareLink && (
                    <p>
                      Share Link: <a href={shareLink}>{shareLink}</a>
                    </p>
                  )}
                </div>
              </section>

              <section className="trip-overview-grid">
                <div className="overview-card">
                  <span>📍</span>
                  <div>
                    <h3>{trip.destinations?.length || 0}</h3>
                    <p>Destinations</p>
                  </div>
                </div>

                <div className="overview-card">
                  <span>🎯</span>
                  <div>
                    <h3>{activities.length}</h3>
                    <p>Activities</p>
                  </div>
                </div>

                <div className="overview-card">
                  <span>📝</span>
                  <div>
                    <h3>{notes.length}</h3>
                    <p>Journal Notes</p>
                  </div>
                </div>

                <div className="overview-card">
                  <span>📸</span>
                  <div>
                    <h3>{media.length}</h3>
                    <p>Travel Photos</p>
                  </div>
                </div>
              </section>

              {/* Activity Management */}
              <section className="trip-section">
                <div className="section-heading">
                  <h2>Plan Your Activities</h2>
                  <p>Add sightseeing, food, travel and adventure plans.</p>
                </div>

                <form className="trip-form" onSubmit={handleAddActivity}>
                  <div className="form-group">
                    <label>Activity Title</label>
                    <input
                      name="title"
                      value={activityForm.title}
                      onChange={handleActivityChange}
                      placeholder="Eg: Munnar sightseeing"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Description</label>
                    <textarea
                      name="description"
                      value={activityForm.description}
                      onChange={handleActivityChange}
                      placeholder="Describe your activity"
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Date</label>
                      <input
                        type="date"
                        name="date"
                        value={activityForm.date}
                        onChange={handleActivityChange}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>Time</label>
                      <input
                        type="time"
                        name="time"
                        value={activityForm.time}
                        onChange={handleActivityChange}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Location</label>
                    <input
                      name="location"
                      value={activityForm.location}
                      onChange={handleActivityChange}
                      placeholder="Enter location"
                    />
                  </div>

                  <div className="form-group">
                    <label>Category</label>
                    <select
                      name="category"
                      value={activityForm.category}
                      onChange={handleActivityChange}
                    >
                      <option>Travel</option>
                      <option>Sightseeing</option>
                      <option>Food</option>
                      <option>Adventure</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <button type="submit">Add Activity</button>
                </form>

                <h3>Planned Activities</h3>

                {activities.length === 0 ? (
                  <p>No activities added yet.</p>
                ) : (
                  activities.map((activity) => (
                    <div key={activity._id} className="overview-card">
                      <div>
                        <h3>{activity.title}</h3>
                        <p>{activity.category} · {activity.location}</p>
                        <p>
                          {activity.date?.slice(0, 10)} {activity.time}
                        </p>
                        <p>{activity.description}</p>

                        <button
                          type="button"
                          onClick={() =>
                            handleDeleteActivity(activity._id)
                          }
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </section>

              <section className="trip-section">
                <div className="section-heading">
                  <h2>Weather Forecast</h2>
                  <p>Check the weather at your destination.</p>
                </div>

                <WeatherCard destination={trip.destinations?.[0]} />
              </section>

              <section className="trip-section">
                <div className="section-heading">
                  <h2>Travel Timeline</h2>
                  <p>Your journey, organized day by day.</p>
                </div>

                <Timeline
                  trip={trip}
                  bookings={bookings}
                  activities={activities}
                  notes={notes}
                  media={media}
                />
              </section>

              <section className="trip-section">
                <div className="section-heading">
                  <h2>Travel Memories</h2>
                  <p>All your captured moments in one place.</p>
                </div>

                <PhotoUpload
                  tripId={tripId}
                  activities={activities}
                  onUpload={async () => {
                    const data = await getMedia(tripId);
                    setMedia(data.media || data);
                  }}
                />

                <PhotoGallery
                  media={media}
                  onDelete={(mediaId) =>
                    setMedia((prev) =>
                      prev.filter((item) => item._id !== mediaId)
                    )
                  }
                />
              </section>
            </>
          ) : (
            <p>Trip not found.</p>
          )}
        </main>
      </div>
    </div>
  );
};

export default TripDetails;
