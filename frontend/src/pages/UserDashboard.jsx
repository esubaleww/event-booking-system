import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { getEvents } from "../services/events";
import { getUserBookings, createBooking } from "../services/bookings";
import EventCard from "../components/EventCard";
import "../styles/UserDashboard.css";

const UserDashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const [events, setEvents] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const allEvents = await getEvents();

      if (!user?.token) {
        setEvents(allEvents);
        setBookings([]);
        return;
      }

      let bookingsData = await getUserBookings(user.token);

      bookingsData = bookingsData.filter((b) => b.event !== null);

      setBookings(bookingsData);

      const bookedEventIds = bookingsData.map((b) => b.event._id);
      const unbookedEvents = allEvents.filter(
        (event) => !bookedEventIds.includes(event._id)
      );
      setEvents(unbookedEvents);
    } catch (err) {
      console.error(err);
      alert("Failed to load events. Please try again.");
      setEvents([]);
      setBookings([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  const handleBook = async (eventId) => {
    if (!user?.token) return alert("Please login to book events!");
    try {
      await createBooking(eventId, user.token);
      alert("Booking successful!");

      setEvents(events.filter((e) => e._id !== eventId));
      setBookings([
        ...bookings,
        {
          event: events.find((e) => e._id === eventId),
          status: "booked",
          bookedAt: new Date(),
        },
      ]);
    } catch (err) {
      console.error(err);
      alert("Booking failed. Try again.");
    }
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
    <div className="user-dashboard">
      <h1>User Dashboard</h1>

      <section className="events-section">
        <h2>Available Events</h2>
        {events.length === 0 ? (
          <p className="empty-msg">No available events to book.</p>
        ) : (
          <div className="events-grid">
            {events.map((event) => (
              <EventCard key={event._id} event={event}>
                <button
                  onClick={() => handleBook(event._id)}
                  className="book-btn"
                >
                  Book Now
                </button>
              </EventCard>
            ))}
          </div>
        )}
      </section>

      <section className="bookings-section">
        <h2>My Bookings</h2>
        {bookings.length === 0 ? (
          <p className="empty-msg">No bookings yet.</p>
        ) : (
          <div className="table-wrapper">
            <table className="bookings-table">
              <thead>
                <tr>
                  <th>Event</th>
                  <th>Status</th>
                  <th>Booked At</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b) => (
                  <tr key={b._id || b.event?._id}>
                    <td>{b.event?.title || "Unknown"}</td>
                    <td>{b.status}</td>
                    <td>{new Date(b.bookedAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
};

export default UserDashboard;
