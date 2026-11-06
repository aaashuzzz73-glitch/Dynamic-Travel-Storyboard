import api from "./api";

// Get all activities
export const getActivities = async (tripId) => {
  const response = await api.get(`/trips/${tripId}/activities`);
  return response.data;
};

// Create activity
export const createActivity = async (tripId, activityData) => {
  const response = await api.post(
    `/trips/${tripId}/activities`,
    activityData
  );
  return response.data;
};

// Update activity
export const updateActivity = async (tripId, activityId, activityData) => {
  const response = await api.put(
    `/trips/${tripId}/activities/${activityId}`,
    activityData
  );
  return response.data;
};

// Delete activity
export const deleteActivity = async (tripId, activityId) => {
  const response = await api.delete(
    `/trips/${tripId}/activities/${activityId}`
  );
  return response.data;
};