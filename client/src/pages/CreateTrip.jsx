
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { createTrip } from "../services/tripService";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import TripForm from "../components/TripForm";

const CreateTrip = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreateTrip = async (tripData) => {
    try {
      setError("");
      setLoading(true);

      await createTrip(tripData);

      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to create trip."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-layout">
      <Navbar />

      <div className="dashboard-layout">
        <Sidebar />

        <main className="dashboard-content">
          <h1>Create New Trip</h1>
          <p>Start planning your next adventure!</p>

          {error && (
            <p className="error-message">{error}</p>
          )}

          <TripForm
            onSubmit={handleCreateTrip}
            loading={loading}
          />
        </main>
      </div>
    </div>
  );
};

export default CreateTrip;
