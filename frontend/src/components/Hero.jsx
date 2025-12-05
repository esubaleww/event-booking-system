import "../styles/Hero.css";

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <img src="/src/assets/logo.png" alt="Logo" className="hero-icon" />
        <h1>
          Book Events <strong>Effortlessly</strong>
        </h1>
        <p>
          Your gateway to <strong>seamless event booking</strong> and
          management. Discover, book, and enjoy events with just a few clicks.
        </p>
        <a href="/signup" className="hero-btn">
          Get Started
        </a>
      </div>
    </section>
  );
};

export default Hero;
