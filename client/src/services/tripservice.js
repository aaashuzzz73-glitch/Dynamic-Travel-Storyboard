import api from "./api";

// Get all trips
export const getAllTrips = async () => {
  const response = await api.get("/trips");
  return response.data;
};

// Get single trip
export const getTripById = async (tripId) => {
  const response = await api.get(`/trips/${tripId}`);
  return response.data;
};

// Create trip
export const createTrip = async (tripData) => {
  const response = await api.post("/trips", tripData);
  return response.data;
};

// Update trip
export const updateTrip = async (tripId, tripData) => {
  const response = await api.put(`/trips/${tripId}`, tripData);
  return response.data;
};

// Delete trip
export const deleteTrip = async (tripId) => {
  const response = await api.delete(`/trips/${tripId}`);
  return response.data;
};

// Enable or disable trip sharing
export const updateTripSharing = async (tripId, isPublic) => {
  const response = await api.patch(`/trips/${tripId}/sharing`, {
    isPublic,
  });
  return response.data;
};