import "../styles/Footer.css";
import {
  FaLinkedin,
  FaTelegramPlane,
  FaTwitter,
  FaFacebook,
} from "react-icons/fa";

const Footer = () => (
  <footer className="footer">
    <div className="footer-container">
      <div className="footer-left">
        <img src="/src/assets/logo.png" className="footer-icon" alt="Logo" />
        <h3>EventBooking</h3>
        <p>
          <em>Your trusted platform for managing and booking events.</em>
        </p>
      </div>

      <div className="footer-links">
        <a href="/events">Events</a>
        <a href="/login">Login</a>
        <a href="/signup">Signup</a>
      </div>

      <div className="footer-social">
        <a
          href="https://linkedin.com/in/esuk"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin size={24} />
        </a>
        <a
          href="https://telegram.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaTelegramPlane size={24} />
        </a>
        <a
          href="https://x.com/Esubalew_1"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaTwitter size={24} />
        </a>
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaFacebook size={24} />
        </a>
      </div>
    </div>

    <p className="footer-bottom">
      © {new Date().getFullYear()} EventBooking — All rights reserved.
    </p>
  </footer>
);

export default Footer;
