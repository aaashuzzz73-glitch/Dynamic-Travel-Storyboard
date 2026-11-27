
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
  Pencil,
  X,
} from "lucide-react";

import {
  getTripById,
  updateTripSharing,
} from "../services/tripservice";

import { getBookings } from "../services/bookingservice";
import { getNotes } from "../services/noteservice";
import {
  getMedia,
  deleteMedia,
} from "../services/mediaservice";

import {
  getActivities,
  createActivity,
  updateActivity,
  deleteActivity,
} from "../services/activityservice";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Timeline from "../components/Timeline";
import WeatherCard from "../components/WeatherCard";
import PhotoGallery from "../components/PhotoGallery";
import PhotoUpload from "../components/PhotoUpload";
import ConfirmModal from "../components/ConfirmModal";

const initialActivityForm = {
  title: "",
  description: "",
  date: "",
  time: "",
  location: "",
  category: "Other",
};

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
  const [editingActivityId, setEditingActivityId] = useState(null);
  const [pendingDelete, setPendingDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [activityForm, setActivityForm] = useState(initialActivityForm);

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

  const resetActivityForm = () => {
    setActivityForm(initialActivityForm);
    setEditingActivityId(null);
  };

  const handleEditActivity = (activity) => {
    setEditingActivityId(activity._id);

    setActivityForm({
      title: activity.title || "",
      description: activity.description || "",
      date: activity.date ? String(activity.date).slice(0, 10) : "",
      time: activity.time || "",
      location: activity.location || "",
      category: activity.category || "Other",
    });

    document
      .getElementById("activity-planner-form")
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const handleAddActivity = async (e) => {
    e.preventDefault();

    try {
      setAddingActivity(true);

      if (editingActivityId) {
        const response = await updateActivity(
          tripId,
          editingActivityId,
          activityForm
        );

        const updatedActivity = response.activity || response;

        setActivities((prev) =>
          prev.map((item) =>
            item._id === editingActivityId
              ? updatedActivity
              : item
          )
        );

        alert("Activity updated successfully!");
      } else {
        const response = await createActivity(tripId, activityForm);
        const newActivity = response.activity || response;

        setActivities((prev) => [...prev, newActivity]);

        alert("Activity added successfully!");
      }

      resetActivityForm();
    } catch (err) {
      alert(
        err.response?.data?.message ||
          (editingActivityId
            ? "Unable to update activity."
            : "Unable to add activity.")
      );
    } finally {
      setAddingActivity(false);
    }
  };

  const handleDeleteActivity = (activityId) => {
    setPendingDelete({
      type: "activity",
      id: activityId,
    });
  };

  // DELETE PHOTO
  const handleDeleteMedia = (mediaId) => {
    setPendingDelete({
      type: "photo",
      id: mediaId,
    });
  };

  // CONFIRM DELETE
  const confirmDelete = async () => {
    if (!pendingDelete || deleting) return;

    try {
      setDeleting(true);
      setError("");

      if (pendingDelete.type === "activity") {
        await deleteActivity(tripId, pendingDelete.id);

        setActivities((prev) =>
          prev.filter((item) => item._id !== pendingDelete.id)
        );

        if (editingActivityId === pendingDelete.id) {
          resetActivityForm();
        }
      } else {
        await deleteMedia(tripId, pendingDelete.id);

        setMedia((prev) =>
          prev.filter((item) => item._id !== pendingDelete.id)
        );

        setSuccessMessage("Photo deleted successfully!");

        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);
      }

      setPendingDelete(null);
    } catch (err) {
      console.error("Delete error:", err);
      setError(
        pendingDelete.type === "activity"
          ? "Unable to delete activity."
          : "Unable to delete photo."
      );
      setPendingDelete(null);
    } finally {
      setDeleting(false);
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
            <Link to="/dashboard">Back to Dashboard</Link>
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
              id="activity-planner-form"
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
                {editingActivityId ? (
                  <Pencil size={17} />
                ) : (
                  <Plus size={17} />
                )}

                {addingActivity
                  ? editingActivityId
                    ? "Updating..."
                    : "Adding..."
                  : editingActivityId
                    ? "Update Activity"
                    : "Add Activity"}
              </button>

              {editingActivityId && (
                <button
                  type="button"
                  className="travel-create-btn"
                  onClick={resetActivityForm}
                  disabled={addingActivity}
                >
                  <X size={17} />
                  Cancel Edit
                </button>
              )}
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

                        <div>
                          <button
                            type="button"
                            className="activity-delete-btn"
                            onClick={() => handleEditActivity(activity)}
                            aria-label="Edit activity"
                            title="Edit activity"
                          >
                            <Pencil size={17} />
                          </button>

                          <button
                            type="button"
                            className="activity-delete-btn"
                            onClick={() =>
                              handleDeleteActivity(activity._id)
                            }
                            aria-label="Delete activity"
                            title="Delete activity"
                          >
                            <Trash2 size={17} />
                          </button>
                        </div>
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

      <ConfirmModal
        isOpen={Boolean(pendingDelete)}
        title={
          pendingDelete?.type === "activity"
            ? "Delete Activity?"
            : "Delete Photo?"
        }
        message={
          pendingDelete?.type === "activity"
            ? "Are you sure you want to delete this activity?"
            : "Are you sure you want to delete this photo?"
        }
        confirmText={deleting ? "Deleting..." : "Yes, Delete"}
        cancelText="Cancel"
        onConfirm={confirmDelete}
        onCancel={() => {
          if (!deleting) setPendingDelete(null);
        }}
      />
    </div>
  );
};

export default TripDetails;
