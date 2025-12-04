import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../styles/Navbar.css";

import { FiMenu, FiX, FiSun, FiMoon } from "react-icons/fi";

const Navbar = ({ darkMode, setDarkMode }) => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
    setMenuOpen(false);
  };

  return (
    <header className="navbar">
      <div className="nav-inner">
        <div className="nav-left">
          <img src="/src/assets/logo.png" className="nav-icon" alt="Logo" />
          <Link to="/" className="logo">
            EventBooking
          </Link>
        </div>

        <nav className="nav-links">
          <Link to="/">Home</Link>
          {!user && (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </>
          )}
          {user?.role === "user" && <Link to="/dashboard">Dashboard</Link>}
          {user?.role === "admin" && <Link to="/admin">Admin</Link>}
          {user && (
            <button className="btn-logout" onClick={handleLogout}>
              Logout
            </button>
          )}

          <button
            className="theme-toggle"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? <FiMoon size={22} /> : <FiSun size={22} />}
          </button>
        </nav>

        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
        </button>

        <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
          <Link to="/" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          {!user && (
            <>
              <Link to="/login" onClick={() => setMenuOpen(false)}>
                Login
              </Link>
              <Link to="/signup" onClick={() => setMenuOpen(false)}>
                Signup
              </Link>
            </>
          )}
          {user?.role === "user" && (
            <Link to="/dashboard" onClick={() => setMenuOpen(false)}>
              Dashboard
            </Link>
          )}
          {user?.role === "admin" && (
            <Link to="/admin" onClick={() => setMenuOpen(false)}>
              Admin
            </Link>
          )}
          {user && (
            <button className="btn-logout mobile-logout" onClick={handleLogout}>
              Logout
            </button>
          )}

          <button
            className="theme-toggle mobile-toggle"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? <FiMoon size={22} /> : <FiSun size={22} />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
