import api from "./api";

// Get all notes
export const getNotes = async (tripId) => {
  const response = await api.get(`/trips/${tripId}/notes`);
  return response.data;
};

// Create a note
export const createNote = async (tripId, noteData) => {
  const response = await api.post(
    `/trips/${tripId}/notes`,
    noteData
  );
  return response.data;
};

// Update a note
export const updateNote = async (tripId, noteId, noteData) => {
  const response = await api.put(
    `/trips/${tripId}/notes/${noteId}`,
    noteData
  );
  return response.data;
};

// Delete a note
export const deleteNote = async (tripId, noteId) => {
  const response = await api.delete(
    `/trips/${tripId}/notes/${noteId}`
  );
  return response.data;
};