import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../styles/Navbar.css";

const Navbar = ({ darkMode, setDarkMode }) => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
    setMenuOpen(false); // close mobile menu
  };

  return (
    <header className="navbar">
      <div className="nav-inner">
        {/* Left section: Logo + Dark Mode */}
        <div className="nav-left">
          <img src="/src/assets/logo.png" className="nav-icon" />
          <Link to="/" className="logo">
            EventBooking
          </Link>

          {/* Dark Mode Toggle */}
          <button
            className="theme-toggle"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? "🌙" : "☀️"}
          </button>
        </div>

        {/* Desktop Links */}
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
        </nav>

        {/* Mobile Hamburger */}
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>

        {/* Mobile Menu */}
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
        </div>
      </div>
    </header>
  );
};

export default Navbar;
