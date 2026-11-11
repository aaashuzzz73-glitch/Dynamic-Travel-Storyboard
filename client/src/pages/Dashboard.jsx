
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getAllTrips,
  deleteTrip,
} from "../services/tripService";
import { getBookings } from "../services/bookingservice";

import TripCard from "../components/TripCard";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import WeatherCard from "../components/WeatherCard";

import {
  Plane,
  Train,
  Bus,
  Hotel,
  CalendarDays,
  ArrowUpRight,
} from "lucide-react";

const bookingIcons = {
  Flight: Plane,
  Train: Train,
  Bus: Bus,
  Hotel: Hotel,
};

const Dashboard = () => {
  const [trips, setTrips] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getAllTrips();
      const tripList = data.trips || data;

      setTrips(tripList);

      const results = await Promise.allSettled(
        tripList.map(async (trip) => {
          const response = await getBookings(trip._id);
          const list = response.bookings || response;

          return list.map((booking) => ({
            ...booking,
            tripName: trip.tripName,
            tripId: trip._id,
          }));
        })
      );

      const allBookings = results
        .filter((result) => result.status === "fulfilled")
        .flatMap((result) => result.value);

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const upcoming = allBookings
        .filter((booking) => {
          if (!booking.bookingDate) return false;

          const date = new Date(booking.bookingDate);
          return !Number.isNaN(date.getTime()) && date >= today;
        })
        .sort(
          (a, b) =>
            new Date(a.bookingDate) - new Date(b.bookingDate)
        );

      setBookings(upcoming);
    } catch (err) {
      setError("Unable to load dashboard data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const handleDelete = async (tripId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this trip?"
    );

    if (!confirmDelete) return;

    try {
      await deleteTrip(tripId);
      setTrips((prev) =>
        prev.filter((trip) => trip._id !== tripId)
      );
      fetchDashboard();
    } catch (err) {
      setError("Failed to delete trip.");
    }
  };

  const destination =
    trips[0]?.destinations?.[0] || "";

  return (
    <div className="app-layout travel-dashboard">
      <Navbar />

      <div className="dashboard-layout">
        <Sidebar />

        <main className="dashboard-content premium-dashboard">

          <section className="welcome-panel">
            <div className="welcome-text">
              <span className="eyebrow">
                YOUR PERSONAL TRAVEL SPACE
              </span>

              <h1>Every journey tells a story.</h1>

              <p>
                Plan your next adventure, organize your trips
                and keep your favourite memories together.
              </p>

              <Link
                to="/create-trip"
                className="travel-create-btn"
              >
                + Plan a New Trip
              </Link>
            </div>

            <div className="welcome-decoration">
              <span>✈</span>
              <span>EXPLORE · DISCOVER · REMEMBER</span>
            </div>
          </section>

          <section className="travel-stats">
            <div className="stat-card">
              <span className="stat-icon">✈️</span>
              <div>
                <h2>{trips.length}</h2>
                <p>Total Trips</p>
              </div>
            </div>

            <div className="stat-card">
              <span className="stat-icon">🌍</span>
              <div>
                <h2>{bookings.length}</h2>
                <p>Upcoming Bookings</p>
              </div>
            </div>

            <div className="stat-card">
              <span className="stat-icon">📸</span>
              <div>
                <h2>Memories</h2>
                <p>Your travel stories</p>
              </div>
            </div>
          </section>

          {/* WEATHER AND BOOKINGS */}
          <section className="dashboard-widgets">

            <div className="dashboard-widget">
              <div className="widget-heading">
                <div>
                  <span className="eyebrow">DESTINATION WEATHER</span>
                  <h2>Weather Forecast</h2>
                </div>
                <span className="widget-heading-icon">🌤️</span>
              </div>

              {destination ? (
                <WeatherCard destination={destination} />
              ) : (
                <p>Create a trip to see destination weather.</p>
              )}
            </div>

            <div className="dashboard-widget">
              <div className="widget-heading">
                <div>
                  <span className="eyebrow">YOUR RESERVATIONS</span>
                  <h2>Upcoming Bookings</h2>
                </div>
                <span className="widget-heading-icon">✈️</span>
              </div>

              {loading ? (
                <p>Loading bookings...</p>
              ) : bookings.length === 0 ? (
                <div className="widget-empty">
                  <span>🧳</span>
                  <p>No upcoming bookings yet.</p>
                  <Link to="/bookings">Add a booking</Link>
                </div>
              ) : (
                <div className="upcoming-booking-list">
                  {bookings.slice(0, 4).map((booking) => {
                    const Icon =
                      bookingIcons[booking.bookingType] || Plane;

                    return (
                      <div
                        className="upcoming-booking-item"
                        key={`${booking.tripId}-${booking._id}`}
                      >
                        <div className="upcoming-booking-icon">
                          <Icon size={20} />
                        </div>

                        <div className="upcoming-booking-info">
                          <h3>{booking.title}</h3>
                          <p>{booking.tripName}</p>
                          <small>
                            <CalendarDays size={13} />
                            {new Date(
                              booking.bookingDate
                            ).toLocaleDateString()}
                          </small>
                        </div>
                      </div>
                    );
                  })}

                  <Link
                    to="/bookings"
                    className="all-bookings-link"
                  >
                    View All Bookings
                    <ArrowUpRight size={16} />
                  </Link>
                </div>
              )}
            </div>

          </section>

          <section className="my-trips-section">
            <div className="trips-section-header">
              <div>
                <span className="eyebrow">YOUR COLLECTION</span>
                <h2>My Travel Stories</h2>
                <p>All your adventures, in one beautiful place.</p>
              </div>

              <Link
                to="/create-trip"
                className="explore-btn"
              >
                + Create Trip
              </Link>
            </div>

            {loading ? (
              <div className="travel-message">
                <span>✈️</span>
                <p>Preparing your travel stories...</p>
              </div>
            ) : error ? (
              <p className="error-message">{error}</p>
            ) : trips.length === 0 ? (
              <div className="travel-empty-state">
                <span className="empty-icon">🌄</span>
                <h2>Your next adventure awaits!</h2>
                <p>
                  You haven't created a trip yet.
                  Start planning your first journey.
                </p>
                <Link
                  to="/create-trip"
                  className="travel-create-btn"
                >
                  Create Your First Trip
                </Link>
              </div>
            ) : (
              <div className="premium-trip-grid">
                {trips.map((trip) => (
                  <TripCard
                    key={trip._id}
                    trip={trip}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            )}
          </section>

          <footer className="travel-footer">
            Made for your journeys and memories ✨
          </footer>

        </main>
      </div>
    </div>
  );
};

export default Dashboard;
