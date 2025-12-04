import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { getEvents } from "../services/events";
import EventCard from "../components/EventCard";

import "../styles/Home.css";

const Home = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const allEvents = await getEvents();
      setEvents(allEvents);
    } catch (err) {
      console.error(err);
      setEvents([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleGuestRedirect = () => {
    navigate("/login");
  };

  if (loading)
    return (
      <div className="loading-overlay">
        <img
          src="/src/assets/loading.svg"
          className="loading-icon"
          alt="Loading..."
        />
      </div>
    );

  return (
    <div className="home-page">
      <section className="events-section">
        <h1 className="section-title">Upcoming Events</h1>
        {events.length === 0 ? (
          <p className="empty-msg">No events available</p>
        ) : (
          <div className="home-event-cardd">
            <div className="events-grid">
              {events.map((event) => (
                <EventCard key={event._id} event={event}>
                  {!user && (
                    <button className="book-btn" onClick={handleGuestRedirect}>
                      Book Now
                    </button>
                  )}
                </EventCard>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
