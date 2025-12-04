import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import "../styles/AuthPages.css";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState(""); // <-- track errors

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const success = await login(form.email, form.password);
      if (success) {
        navigate("/");
      } else {
        setError("Invalid email or password"); // show message
      }
    } catch (err) {
      setError("An error occurred. Please try again."); // fallback
      console.error(err);
    }
  };

  return (
    <div className="auth-page">
      <h1>Login</h1>
      {error && <p className="auth-error">{error}</p>}
      <form onSubmit={handleSubmit} className="auth-form">
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        <button type="submit" className="btn-primary">
          Login
        </button>
      </form>
      <p className="auth-link">
        Don't have an account? <Link to="/signup">Signup here</Link>
      </p>
    </div>
  );
};

export default Login;
