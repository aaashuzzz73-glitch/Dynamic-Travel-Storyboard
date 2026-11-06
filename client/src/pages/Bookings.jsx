
import { useEffect, useState } from "react";

import { getAllTrips } from "../services/tripService";
import {
  getBookings,
  createBooking,
  deleteBooking,
} from "../services/bookingService";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import BookingCard from "../components/BookingCard";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    tripId: "",
    bookingType: "Flight",
    title: "",
    bookingDate: "",
    bookingTime: "",
    location: "",
    bookingReference: "",
    notes: "",
  });

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
    setForm({ ...form, [e.target.name]: e.target.value });
  };

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

      await createBooking(tripId, bookingData);

      setForm({
        tripId: "",
        bookingType: "Flight",
        title: "",
        bookingDate: "",
        bookingTime: "",
        location: "",
        bookingReference: "",
        notes: "",
      });

      await fetchBookings();
    } catch (err) {
      setError("Unable to add booking. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (booking) => {
    if (!window.confirm("Delete this booking?")) return;

    try {
      await deleteBooking(booking.tripId, booking._id);
      setBookings((prev) =>
        prev.filter((item) => item._id !== booking._id)
      );
    } catch (err) {
      setError("Unable to delete booking.");
    }
  };

  return (
    <div className="app-layout">
      <Navbar />

      <div className="dashboard-layout">
        <Sidebar />

        <main className="dashboard-content">
          <h1>My Bookings</h1>
          <p>Manage all your travel reservations in one place.</p>

          <section className="trip-section">
            <h2>Add New Booking</h2>

            <form className="trip-form" onSubmit={handleSubmit}>
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
                {saving ? "Adding..." : "Add Booking"}
              </button>
            </form>
          </section>

          {error && <p className="error-message">{error}</p>}

          <section className="trip-section">
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
                    <BookingCard booking={booking} />

                    <button
                      type="button"
                      onClick={() => handleDelete(booking)}
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
};

export default Bookings;
