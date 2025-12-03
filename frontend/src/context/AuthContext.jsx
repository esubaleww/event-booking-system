import { createContext, useState, useEffect } from "react";
import { loginUser, registerUser } from "../services/auth";
import { setAuthToken } from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Initialize from localStorage
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  // Make sure token is set on app load
  useEffect(() => {
    if (user?.token) {
      setAuthToken(user.token);
    }
  }, [user]);

  // Login function
  const login = async (email, password) => {
    const data = await loginUser(email, password);
    const userWithToken = { ...data.user, token: data.token };
    setUser(userWithToken);
    localStorage.setItem("user", JSON.stringify(userWithToken));
    setAuthToken(data.token);
  };

  // Signup function
  const signup = async (name, email, password) => {
    const data = await registerUser(name, email, password);
    const userWithToken = { ...data.user, token: data.token };
    setUser(userWithToken);
    localStorage.setItem("user", JSON.stringify(userWithToken));
    setAuthToken(data.token);
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    setAuthToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
