import { createContext, useState, useEffect } from "react";
import {
  getCurrentUser,
  loginUser,
  registerUser,
} from "../services/authService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("dts_token");

    if (token) {
      getCurrentUser()
        .then((data) => setUser(data.user))
        .catch(() => {
          localStorage.removeItem("dts_token");
          localStorage.removeItem("dts_user");
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (userData) => {
    const data = await loginUser(userData);

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

  const logout = () => {
    localStorage.removeItem("dts_token");
    localStorage.removeItem("dts_user");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};