
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CreateTrip from "./pages/CreateTrip";
import TripDetails from "./pages/TripDetails";
import Bookings from "./pages/Bookings";
import Journal from "./pages/Journal";
import SharedTrip from "./pages/SharedTrips";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public Pages */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/share/:shareToken" element={<SharedTrip />} />

          {/* Protected Pages */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/create-trip" element={<CreateTrip />} />

            {/* Trip Details */}
            <Route path="/trips/:tripId" element={<TripDetails />} />

            <Route path="/bookings" element={<Bookings />} />
            <Route path="/journal" element={<Journal />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
