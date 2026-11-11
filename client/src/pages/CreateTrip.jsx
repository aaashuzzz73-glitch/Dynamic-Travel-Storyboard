
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plane, MapPin, Sparkles } from "lucide-react";

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
    <div className="app-layout travel-dashboard">
      <Navbar />

      <div className="dashboard-layout">
        <Sidebar />

        <main className="dashboard-content create-trip-page">

          <section className="create-trip-hero">
            <div>
              <span className="eyebrow">
                <Sparkles size={15} /> YOUR NEXT ADVENTURE STARTS HERE
              </span>

              <h1>Let's plan your journey.</h1>

              <p>
                Every great journey begins with a plan.
                Create your trip and keep everything organized.
              </p>
            </div>

            <div className="create-trip-plane">
              <Plane size={75} />
            </div>
          </section>

          <section className="create-trip-container">
            <div className="create-trip-heading">
              <span className="create-trip-icon">
                <MapPin size={23} />
              </span>

              <div>
                <h2>Trip Details</h2>
                <p>Tell us about your upcoming adventure.</p>
              </div>
            </div>

            {error && (
              <p className="error-message">{error}</p>
            )}

            <TripForm
              onSubmit={handleCreateTrip}
              loading={loading}
            />
          </section>

          <footer className="travel-footer">
            Made for your journeys and memories ✨
          </footer>

        </main>
      </div>
    </div>
  );
};

export default CreateTrip;
