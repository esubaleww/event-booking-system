import { createContext, useState, useEffect } from "react";
import { loginUser, registerUser } from "../services/auth";
import { setAuthToken } from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (user?.token) {
      setAuthToken(user.token);
    }
  }, [user]);

  const login = async (email, password) => {
    const data = await loginUser(email, password);
    const userWithToken = { ...data.user, token: data.token };
    setUser(userWithToken);
    localStorage.setItem("user", JSON.stringify(userWithToken));
    setAuthToken(data.token);
  };

  const signup = async (name, email, password) => {
    const data = await registerUser(name, email, password);
    const userWithToken = { ...data.user, token: data.token };
    setUser(userWithToken);
    localStorage.setItem("user", JSON.stringify(userWithToken));
    setAuthToken(data.token);
  };

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
