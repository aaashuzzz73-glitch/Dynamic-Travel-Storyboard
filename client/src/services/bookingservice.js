import api from "./api";

// Get all bookings of a trip
export const getBookings = async (tripId) => {
  const response = await api.get(`/trips/${tripId}/bookings`);
  return response.data;
};

// Add a new booking
export const createBooking = async (tripId, bookingData) => {
  const response = await api.post(
    `/trips/${tripId}/bookings`,
    bookingData
  );
  return response.data;
};

// Update booking
export const updateBooking = async (tripId, bookingId, bookingData) => {
  const response = await api.put(
    `/trips/${tripId}/bookings/${bookingId}`,
    bookingData
  );
  return response.data;
};

// Delete booking
export const deleteBooking = async (tripId, bookingId) => {
  const response = await api.delete(
    `/trips/${tripId}/bookings/${bookingId}`
  );
  return response.data;
};