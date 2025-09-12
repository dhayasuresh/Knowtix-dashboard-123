import React, { createContext, useContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [loading, setLoading] = useState(false);

  const signup = async ({ name, email, grade, password }) => {
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/register", { name, email, grade, password });
      localStorage.setItem("userId", res.data.userId);
      setUserId(res.data.userId);
      return { success: true };
    } catch (err) {
      console.log("Signup error:", err.response?.data);
      return { success: false, message: err.response?.data.error || "Signup failed" };
    } finally { setLoading(false); }
  };

  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/login", { email, password });
      localStorage.setItem("userId", res.data.userId);
      setUserId(res.data.userId);
      return { success: true };
    } catch (err) {
      console.log("Login error:", err.response?.data);
      return { success: false, message: err.response?.data.message || "Login failed" };
    } finally { setLoading(false); }
  };

  const logout = () => {
    localStorage.removeItem("userId");
    setUserId(null);
  };

  const isAuthenticated = !!userId;

  return (
    <AuthContext.Provider value={{ userId, signup, login, logout, isAuthenticated, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
