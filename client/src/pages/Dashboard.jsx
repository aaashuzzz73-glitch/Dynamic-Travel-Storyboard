import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllTrips, deleteTrip } from "../services/tripService";
import TripCard from "../components/TripCard";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchTrips = async () => {
    try {
      const data = await getAllTrips();
      setTrips(data.trips || data);
    } catch (err) {
      setError("Unable to load trips.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrips();
  }, []);

  const handleDelete = async (tripId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this trip?"
    );

    if (!confirmDelete) return;

    try {
      await deleteTrip(tripId);
      setTrips((prev) => prev.filter((trip) => trip._id !== tripId));
    } catch (err) {
      setError("Failed to delete trip.");
    }
  };

  return (
    <div className="app-layout">
      <Navbar />

      <div className="dashboard-layout">
        <Sidebar />

        <main className="dashboard-content">
          <div className="dashboard-header">
            <div>
              <h1>My Travel Stories</h1>
              <p>Plan, organize and relive your journeys.</p>
            </div>

            <Link to="/create-trip" className="primary-btn">
              + Create New Trip
            </Link>
          </div>

          {loading ? (
            <p>Loading your trips...</p>
          ) : error ? (
            <p className="error-message">{error}</p>
          ) : trips.length === 0 ? (
            <div className="empty-state">
              <h2>No trips yet!</h2>
              <p>Start creating your first travel story.</p>
              <Link to="/create-trip" className="primary-btn">
                Create Your First Trip
              </Link>
            </div>
          ) : (
            <div className="trip-grid">
              {trips.map((trip) => (
                <TripCard
                  key={trip._id}
                  trip={trip}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;