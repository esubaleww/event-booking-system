import "../styles/Hero.css";

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <img src="/src/assets/hero-icon.png" className="hero-icon" />
        <h1>Book Events Effortlessly</h1>
        <p>Your gateway to seamless event booking and management.</p>
        <a href="/signup" className="hero-btn">
          Get Started
        </a>
      </div>
    </section>
  );
};

export default Hero;
