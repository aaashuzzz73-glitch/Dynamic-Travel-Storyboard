
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  MapPin,
  CalendarDays,
  Plane,
  Camera,
  BookOpen,
  Compass,
  Share2,
  Trash2,
  Clock,
  Plus,
  Sparkles,
} from "lucide-react";

import {
  getTripById,
  updateTripSharing,
} from "../services/tripService";

import { getBookings } from "../services/bookingservice";
import { getNotes } from "../services/noteservice";
import {
  getMedia,
  deleteMedia,
} from "../services/mediaService";

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
  const [successMessage, setSuccessMessage] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [shareLink, setShareLink] = useState("");
  const [sharing, setSharing] = useState(false);
  const [addingActivity, setAddingActivity] = useState(false);

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
        setLoading(true);
        setError("");

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
    } catch (err) {
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
      setAddingActivity(true);

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
    } catch (err) {
      alert("Unable to add activity.");
    } finally {
      setAddingActivity(false);
    }
  };

  const handleDeleteActivity = async (activityId) => {
    if (!window.confirm("Delete this activity?")) return;

    try {
      await deleteActivity(tripId, activityId);

      setActivities((prev) =>
        prev.filter((item) => item._id !== activityId)
      );
    } catch (err) {
      alert("Unable to delete activity.");
    }
  };
// DELETE PHOTO
const handleDeleteMedia = async (mediaId) => {
  if (!window.confirm("Delete this photo?")) return;

  try {
    await deleteMedia(tripId, mediaId);

    setMedia((prev) =>
      prev.filter((item) => item._id !== mediaId)
    );

    setError("");
    setSuccessMessage("Photo deleted successfully!");

    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);

  } catch (err) {
    console.error("Delete photo error:", err);
    setError("Unable to delete photo.");
  }
};
  if (loading) {
    return (
      <div className="app-layout travel-dashboard">
        <Navbar />
        <div className="dashboard-layout">
          <Sidebar />
          <main className="dashboard-content">
            <div className="trip-loading">
              <Plane size={35} />
              <h2>Preparing your journey...</h2>
              <p>Loading your travel story.</p>
            </div>
          </main>
        </div>
      </div>
    );
  }

  if (error || !trip) {
    return (
      <div className="app-layout travel-dashboard">
        <Navbar />
        <div className="dashboard-layout">
          <Sidebar />
          <main className="dashboard-content">
            <p className="error-message">
              {error || "Trip not found."}
            </p>
            <Link to="/">Back to Dashboard</Link>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="app-layout travel-dashboard">
      <Navbar />

      <div className="dashboard-layout">
        <Sidebar />

        <main className="dashboard-content premium-trip-details">

          {/* TRIP HERO */}
          <section className="details-hero">
            <div className="details-hero-content">
              <span className="eyebrow">
                <Sparkles size={15} /> YOUR TRAVEL STORY
              </span>

              <h1>{trip.tripName}</h1>

              <p className="details-destination">
                <MapPin size={18} />
                {trip.destinations?.join(", ")}
              </p>

              <p className="details-dates">
                <CalendarDays size={17} />
                {new Date(trip.startDate).toLocaleDateString()}
                {" — "}
                {new Date(trip.endDate).toLocaleDateString()}
              </p>

              {trip.description && (
                <p className="details-description">
                  {trip.description}
                </p>
              )}

              <button
                className="travel-create-btn share-trip-btn"
                onClick={handleShare}
                disabled={sharing}
              >
                <Share2 size={17} />
                {sharing ? "Generating..." : "Share My Trip"}
              </button>

              {shareLink && (
                <p className="share-link-text">
                  Share link: <a href={shareLink}>{shareLink}</a>
                </p>
              )}
            </div>

            <div className="details-hero-decoration">
              <Plane size={85} />
              <span>EXPLORE · DISCOVER · REMEMBER</span>
            </div>
          </section>

          {/* OVERVIEW */}
          <section className="details-overview">
            <div className="details-stat-card">
              <MapPin size={27} />
              <div>
                <h2>{trip.destinations?.length || 0}</h2>
                <p>Destinations</p>
              </div>
            </div>

            <div className="details-stat-card">
              <Compass size={27} />
              <div>
                <h2>{activities.length}</h2>
                <p>Activities</p>
              </div>
            </div>

            <div className="details-stat-card">
              <BookOpen size={27} />
              <div>
                <h2>{notes.length}</h2>
                <p>Journal Notes</p>
              </div>
            </div>

            <div className="details-stat-card">
              <Camera size={27} />
              <div>
                <h2>{media.length}</h2>
                <p>Travel Photos</p>
              </div>
            </div>
          </section>

          {/* ACTIVITY PLANNER */}
          <section className="details-section">
            <div className="details-section-heading">
              <div>
                <span className="eyebrow">MAKE EVERY DAY SPECIAL</span>
                <h2>Plan Your Activities</h2>
                <p>Organize the experiences you don't want to miss.</p>
              </div>
              <Compass size={30} />
            </div>

            <form
              className="trip-form premium-trip-form"
              onSubmit={handleAddActivity}
            >
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
                  placeholder="Describe your activity..."
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

              <div className="form-row">
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
              </div>

              <button
                type="submit"
                className="travel-create-btn"
                disabled={addingActivity}
              >
                <Plus size={17} />
                {addingActivity ? "Adding..." : "Add Activity"}
              </button>
            </form>

            <div className="planned-activities">
              <h3>Planned Activities</h3>

              {activities.length === 0 ? (
                <div className="details-empty">
                  <Compass size={30} />
                  <p>No activities added yet.</p>
                </div>
              ) : (
                <div className="activity-grid">
                  {activities.map((activity) => (
                    <article
                      key={activity._id}
                      className="activity-item-card"
                    >
                      <div className="activity-item-top">
                        <span>{activity.category}</span>
                        <button
                          type="button"
                          className="activity-delete-btn"
                          onClick={() =>
                            handleDeleteActivity(activity._id)
                          }
                          aria-label="Delete activity"
                        >
                          <Trash2 size={17} />
                        </button>
                      </div>

                      <h3>{activity.title}</h3>

                      {activity.description && (
                        <p>{activity.description}</p>
                      )}

                      {activity.location && (
                        <small>
                          <MapPin size={14} /> {activity.location}
                        </small>
                      )}

                      <small>
                        <CalendarDays size={14} />
                        {activity.date?.slice(0, 10)}
                        {activity.time && ` · ${activity.time}`}
                      </small>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* WEATHER */}
          <section className="details-section">
            <div className="details-section-heading">
              <div>
                <span className="eyebrow">CHECK BEFORE YOU GO</span>
                <h2>Destination Weather</h2>
                <p>Stay prepared for your travel plans.</p>
              </div>
              <span className="details-heading-emoji">🌤️</span>
            </div>

            <WeatherCard
              destination={trip.destinations?.[0]}
            />
          </section>

          {/* TIMELINE */}
          <section className="details-section">
            <div className="details-section-heading">
              <div>
                <span className="eyebrow">YOUR JOURNEY AT A GLANCE</span>
                <h2>Travel Timeline</h2>
                <p>Your journey, organized day by day.</p>
              </div>
              <Clock size={30} />
            </div>

            <Timeline
              trip={trip}
              bookings={bookings}
              activities={activities}
              notes={notes}
              media={media}
            />
          </section>

          {/* PHOTO GALLERY */}
          <section className="details-section">
            <div className="details-section-heading">
              <div>
                <span className="eyebrow">CAPTURE THE MOMENTS</span>
                <h2>Travel Memories</h2>
                <p>Keep your favourite travel moments together.</p>
              </div>
              <Camera size={30} />
            </div>

            <PhotoUpload
              tripId={tripId}
              activities={activities}
              onUpload={async () => {
                const data = await getMedia(tripId);
                setMedia(data.media || data);
              }}
            />

                   {/* SUCCESS MESSAGE */}
          {successMessage && (
            <div className="success-message">
              <span>✓</span>
              {successMessage}
            </div>
          )}

          {/* PHOTO GALLERY */}
          <PhotoGallery
            media={media}
            onDelete={handleDeleteMedia}
          />

        </section>

        {/* FOOTER */}
        <footer className="travel-footer">
          Every journey becomes a beautiful memory ✨
        </footer>

      </main>
    </div>
  </div>
);
};

export default TripDetails;