
import { createContext, useState, useEffect } from "react";

import {
  getCurrentUser,
  loginUser,
  registerUser,
  updateUserProfile,
} from "../services/authservice";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("dts_token");

    if (token) {
      getCurrentUser()
        .then((data) => {
          setUser(data.user);
          localStorage.setItem("dts_user", JSON.stringify(data.user));
        })
        .catch(() => {
          localStorage.removeItem("dts_token");
          localStorage.removeItem("dts_user");
          setUser(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (userData, password) => {
    const credentials =
      typeof userData === "string"
        ? { email: userData, password }
        : userData;

    const data = await loginUser(credentials);

    localStorage.setItem("dts_token", data.token);
    localStorage.setItem("dts_user", JSON.stringify(data.user));

    setUser(data.user);

    return data;
  };

  const register = async (userData) => {
    const data = await registerUser(userData);

    localStorage.setItem("dts_token", data.token);
    localStorage.setItem("dts_user", JSON.stringify(data.user));

    setUser(data.user);

    return data;
  };

  const updateProfile = async (profileData) => {
    const data = await updateUserProfile(profileData);

    localStorage.setItem("dts_user", JSON.stringify(data.user));
    setUser(data.user);

    return data;
  };

  const logout = () => {
    localStorage.removeItem("dts_token");
    localStorage.removeItem("dts_user");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, register, updateProfile, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
