
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import TravelIntro from "./components/TravelIntro";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CreateTrip from "./pages/CreateTrip";
import TripDetails from "./pages/TripDetails";
import Bookings from "./pages/Bookings";
import Journal from "./pages/Journal";
import SharedTrip from "./pages/SharedTrips";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ExploreTrips from "./pages/ExploreTrips";
import DestinationDetails from "./pages/DestinationDetails";
import Profile from "./pages/Profile";

function App() {
  const [showIntro, setShowIntro] = useState(() => {
    const hasSeenIntro = sessionStorage.getItem("travelIntroShown");

    if (hasSeenIntro) {
      return false;
    }

    sessionStorage.setItem("travelIntroShown", "true");
    return true;
  });

  useEffect(() => {
    if (!showIntro) return;

    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, [showIntro]);

  return (
    <BrowserRouter>
      <AuthProvider>
        {showIntro ? (
          <TravelIntro />
        ) : (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/share/:shareToken" element={<SharedTrip />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />

            <Route path="/explore-trips" element={<ExploreTrips />} />
            <Route
              path="/explore-trips/:region/:destination"
              element={<DestinationDetails />}
            />

            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/create-trip" element={<CreateTrip />} />
              <Route path="/trips/:tripId" element={<TripDetails />} />
              <Route path="/bookings" element={<Bookings />} />
              <Route path="/journal" element={<Journal />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Routes>
        )}
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
