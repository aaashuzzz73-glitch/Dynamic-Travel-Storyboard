
import { useEffect, useState } from "react";

import { getAllTrips } from "../services/tripservice";
import {
  getBookings,
  createBooking,
  deleteBooking,
  updateBooking,
} from "../services/bookingservice";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import BookingCard from "../components/BookingCard";
import ConfirmModal from "../components/ConfirmModal";

const initialForm = {
  tripId: "",
  bookingType: "Flight",
  title: "",
  bookingDate: "",
  bookingTime: "",
  location: "",
  bookingReference: "",
  notes: "",
};

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [editingBooking, setEditingBooking] = useState(null);

  const [form, setForm] = useState(initialForm);

  const [pendingDelete, setPendingDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const fetchBookings = async () => {
    try {
      const tripData = await getAllTrips();
      const tripList = tripData.trips || tripData;

      setTrips(tripList);

      const results = await Promise.all(
        tripList.map(async (trip) => {
          const data = await getBookings(trip._id);
          const list = data.bookings || data;

          return list.map((booking) => ({
            ...booking,
            tripId: trip._id,
            tripName: trip.tripName,
          }));
        })
      );

      setBookings(results.flat());
    } catch (err) {
      setError("Unable to load bookings.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // EDIT BOOKING
  const handleEdit = (booking) => {
    setEditingBooking(booking);

    setForm({
      tripId: booking.tripId,
      bookingType: booking.bookingType || "Flight",
      title: booking.title || "",
      bookingDate: booking.bookingDate
        ? String(booking.bookingDate).slice(0, 10)
        : "",
      bookingTime: booking.bookingTime || "",
      location: booking.location || "",
      bookingReference: booking.bookingReference || "",
      notes: booking.notes || "",
    });

    setError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // CANCEL EDIT
  const handleCancelEdit = () => {
    setEditingBooking(null);
    setForm(initialForm);
    setError("");
  };

  // ADD / UPDATE BOOKING
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.tripId) {
      setError("Please select a trip.");
      return;
    }

    try {
      setSaving(true);
      setError("");

      const { tripId, ...bookingData } = form;

      if (editingBooking) {
        await updateBooking(
          tripId,
          editingBooking._id,
          bookingData
        );
      } else {
        await createBooking(tripId, bookingData);
      }

      setEditingBooking(null);
      setForm(initialForm);

      await fetchBookings();
    } catch (err) {
      console.error(err);
      setError(
        editingBooking
          ? "Unable to update booking. Please try again."
          : "Unable to add booking. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };

  // OPEN DELETE CONFIRMATION
  const handleDelete = (booking) => {
    setPendingDelete(booking);
  };

  // CONFIRM DELETE
  const confirmDelete = async () => {
    if (!pendingDelete || deleting) return;

    try {
      setDeleting(true);
      setError("");

      await deleteBooking(
        pendingDelete.tripId,
        pendingDelete._id
      );

      setBookings((prev) =>
        prev.filter((item) => item._id !== pendingDelete._id)
      );

      if (editingBooking?._id === pendingDelete._id) {
        handleCancelEdit();
      }

      setPendingDelete(null);
    } catch (err) {
      console.error(err);
      setError("Unable to delete booking.");
      setPendingDelete(null);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="app-layout travel-dashboard">
      <Navbar />

      <div className="dashboard-layout">
        <Sidebar />

        <main className="dashboard-content bookings-page">
          <h1>My Bookings</h1>
          <p>Manage all your travel reservations in one place.</p>

          <section className="details-section">
            <h2>
              {editingBooking ? "Edit Booking" : "Add New Booking"}
            </h2>

            <form
              className="premium-trip-form booking-form"
              onSubmit={handleSubmit}
            >
              <div className="form-group">
                <label>Select Trip</label>
                <select
                  name="tripId"
                  value={form.tripId}
                  onChange={handleChange}
                  required
                >
                  <option value="">Choose a trip</option>

                  {trips.map((trip) => (
                    <option key={trip._id} value={trip._id}>
                      {trip.tripName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Booking Type</label>
                <select
                  name="bookingType"
                  value={form.bookingType}
                  onChange={handleChange}
                >
                  <option>Flight</option>
                  <option>Train</option>
                  <option>Bus</option>
                  <option>Hotel</option>
                </select>
              </div>

              <div className="form-group">
                <label>Title</label>
                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Eg: Kochi to Delhi"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Date</label>
                  <input
                    type="date"
                    name="bookingDate"
                    value={form.bookingDate}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label>Time</label>
                  <input
                    type="time"
                    name="bookingTime"
                    value={form.bookingTime}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Location</label>
                <input
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  placeholder="Enter location"
                />
              </div>

              <div className="form-group">
                <label>Booking Reference</label>
                <input
                  name="bookingReference"
                  value={form.bookingReference}
                  onChange={handleChange}
                  placeholder="Booking ID / PNR"
                />
              </div>

              <div className="form-group">
                <label>Notes</label>
                <textarea
                  name="notes"
                  value={form.notes}
                  onChange={handleChange}
                  placeholder="Additional details..."
                />
              </div>

              <button type="submit" disabled={saving}>
                {saving
                  ? "Please wait..."
                  : editingBooking
                  ? "Update Booking"
                  : "Add Booking"}
              </button>

              {editingBooking && (
                <button
                  type="button"
                  className="secondary"
                  onClick={handleCancelEdit}
                >
                  Cancel Edit
                </button>
              )}
            </form>
          </section>

          {error && (
            <p className="error-message">{error}</p>
          )}

          <section className="details-section">
            <h2>My Reservations</h2>

            {loading ? (
              <p>Loading bookings...</p>
            ) : bookings.length === 0 ? (
              <div className="empty-state">
                <h3>No bookings yet!</h3>
                <p>Your travel reservations will appear here.</p>
              </div>
            ) : (
              <div className="booking-list">
                {bookings.map((booking) => (
                  <div key={booking._id}>
                    <p>Trip: {booking.tripName}</p>

                    <BookingCard
                      booking={booking}
                      onEdit={handleEdit}
                      onDelete={() => handleDelete(booking)}
                    />
                  </div>
                ))}
              </div>
            )}
          </section>
        </main>
      </div>

      <ConfirmModal
        isOpen={Boolean(pendingDelete)}
        title="Delete Booking?"
        message={
          pendingDelete
            ? `Are you sure you want to delete "${pendingDelete.title}"? This action cannot be undone.`
            : ""
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

export default Bookings;
