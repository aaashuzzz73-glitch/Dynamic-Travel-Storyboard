import api from "./api";

// Get all uploaded photos
export const getMedia = async (tripId) => {
  const response = await api.get(`/trips/${tripId}/media`);
  return response.data;
};

// Upload a photo
export const uploadMedia = async (tripId, photoData) => {
  const response = await api.post(
    `/trips/${tripId}/media`,
    photoData
  );
  return response.data;
};

// Delete a photo
export const deleteMedia = async (tripId, mediaId) => {
  const response = await api.delete(
    `/trips/${tripId}/media/${mediaId}`
  );
  return response.data;
};