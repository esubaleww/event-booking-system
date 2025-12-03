import "../styles/Footer.css";

const Footer = () => (
  <footer className="footer">
    <div className="footer-container">
      <div className="footer-left">
        <img src="/src/assets/logo.png" className="footer-icon" />
        <h3>EventBooking</h3>
        <p>Your trusted platform for managing and booking events.</p>
      </div>

      <div className="footer-links">
        <a href="/">Home</a>
        <a href="/events">Events</a>
        <a href="/login">Login</a>
        <a href="/signup">Signup</a>
      </div>

      <div className="footer-social">
        <a href="#">🌐</a>
        <a href="#">🐦</a>
        <a href="#">📘</a>
      </div>
    </div>

    <p className="footer-bottom">
      © {new Date().getFullYear()} EventBooking — All rights reserved.
    </p>
  </footer>
);

export default Footer;
