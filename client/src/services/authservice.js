import api from "./api";

// Register new user
export const registerUser = async (userData) => {
  const response = await api.post("/auth/register", userData);
  return response.data;
};

// Login user
export const loginUser = async (userData) => {
  const response = await api.post("/auth/login", userData);
  return response.data;
};

// Get logged-in user
export const getCurrentUser = async () => {
  const response = await api.get("/auth/me");
  return response.data;
};

// Update logged-in user's profile
export const updateUserProfile = async (profileData) => {
  const response = await api.put("/auth/me", profileData);
  return response.data;
};
