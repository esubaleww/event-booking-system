import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

import { getEvents } from "../services/events";
import { getUserBookings, createBooking } from "../services/bookings";

import EventCard from "../components/EventCard";
import Hero from "../components/Hero";

import "../styles/Home.css";
import Footer from "../components/Footer";

const Home = () => {
  const { user, logout } = useContext(AuthContext);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch Events ----------------------------------------------
  const fetchEvents = async () => {
    setLoading(true);

    try {
      const allEvents = await getEvents();

      if (user?.token) {
        try {
          const bookings = await getUserBookings(user.token);
          const bookedEventIds = bookings.map((b) => b.event?._id);

          const unbookedEvents = allEvents.filter(
            (event) => !bookedEventIds.includes(event._id)
          );

          setEvents(unbookedEvents);
        } catch (err) {
          console.error("Failed to fetch bookings:", err);

          if (err.response?.status === 401) {
            alert("Session expired, please login again.");
            logout();
          }

          setEvents(allEvents); // fallback
        }
      } else {
        setEvents(allEvents);
      }
    } catch (err) {
      console.error("Failed to fetch events:", err);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchEvents();
  }, [user]);

  // Booking ---------------------------------------------------
  const handleBook = async (eventId) => {
    if (!user?.token) return alert("Please login to book events!");

    try {
      await createBooking(eventId, user.token);
      alert("Booking successful!");

      // remove event immediately
      setEvents((prev) => prev.filter((e) => e._id !== eventId));
    } catch (err) {
      console.error("Booking failed:", err);
      alert("Booking failed. Try again.");
    }
  };

  // UI --------------------------------------------------------
  if (loading) return <p className="loading">Loading events...</p>;

  return (
    <div className="home-page">
      {/* Events Section */}
      <section className="events-section">
        <h1 className="section-title">Upcoming Events</h1>

        <div className="events-grid">
          {events.length === 0 && (
            <p className="empty-msg">No events available.</p>
          )}

          {events.map((event) => (
            <div key={event._id} className="home-event-card">
              <EventCard event={event} />

              {user?.role === "user" && (
                <button
                  className="btn-primary book-btn"
                  onClick={() => handleBook(event._id)}
                >
                  Book Now
                </button>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
