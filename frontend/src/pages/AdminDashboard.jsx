import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { promoteUser } from "../services/auth";
import { getUsers } from "../services/auth";

import {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} from "../services/events";

import { getAllBookings, updateBookingStatus } from "../services/bookings";

import EventCard from "../components/EventCard";
import "../styles/AdminDashboard.css";

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);

  const [allUsers, setAllUsers] = useState([]);
  const [events, setEvents] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
  });
  const [editingEvent, setEditingEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const eventsData = await getEvents(user?.token);
      const bookingsData = await getAllBookings(user?.token);
      const usersRes = await getUsers();
      setAllUsers(usersRes.filter((u) => u._id !== user._id));
      setEvents(eventsData);
      setBookings(bookingsData);
    } catch (err) {
      console.error("Error loading admin data:", err);
      setMessage("Failed to load data.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...newEvent };
      if (payload.date) payload.date = new Date(payload.date).toISOString();

      await createEvent(payload, user?.token);
      setMessage("Event created successfully!");
      setNewEvent({ title: "", description: "", date: "", location: "" });
      fetchData();
    } catch (err) {
      console.error(err);
      setMessage("Failed to create event.");
    }
  };

  const handleDeleteEvent = async (eventId) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;

    try {
      await deleteEvent(eventId, user?.token);
      setMessage("Event deleted successfully.");
      fetchData();
    } catch (err) {
      console.error(err);
      setMessage("Failed to delete event.");
    }
  };

  const openEditModal = (event) => {
    const e = { ...event };
    if (e.date) e.date = new Date(e.date).toISOString().slice(0, 16);
    setEditingEvent(e);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setEditingEvent(null);
    setIsModalOpen(false);
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...editingEvent };
      if (payload.date) payload.date = new Date(payload.date).toISOString();

      await updateEvent(payload._id, payload, user?.token);
      closeModal();
      setMessage("Event updated successfully!");
      fetchData();
    } catch (err) {
      console.error(err);
      setMessage("Failed to save changes.");
    }
  };

  const handleUpdateBooking = async (bookingId, status) => {
    try {
      await updateBookingStatus(bookingId, { status }, user?.token);
      fetchData();
    } catch (err) {
      console.error(err);
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
    <div className="admin-dashboard">
      <header className="dashboard-header">
        <h1>Admin Dashboard</h1>
        {message && <p className="dashboard-message">{message}</p>}
      </header>

      <section className="create-section">
        <h2>Create New Event</h2>
        <form onSubmit={handleCreateEvent} className="create-form">
          <input
            type="text"
            placeholder="Title"
            value={newEvent.title}
            onChange={(e) =>
              setNewEvent({ ...newEvent, title: e.target.value })
            }
            required
          />
          <textarea
            placeholder="Description"
            value={newEvent.description}
            onChange={(e) =>
              setNewEvent({ ...newEvent, description: e.target.value })
            }
            required
          ></textarea>
          <input
            type="datetime-local"
            value={newEvent.date}
            onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Location"
            value={newEvent.location}
            onChange={(e) =>
              setNewEvent({ ...newEvent, location: e.target.value })
            }
            required
          />
          <div className="button-row">
            <button type="submit" className="btn-primary">
              Create Event
            </button>
            <button
              type="button"
              className="btn-secondary"
              onClick={() =>
                setNewEvent({
                  title: "",
                  description: "",
                  date: "",
                  location: "",
                })
              }
            >
              Clear
            </button>
          </div>
        </form>
      </section>

      <section className="events-section">
        <h2>All Events</h2>
        {loading ? (
          <p>Loading events...</p>
        ) : events.length === 0 ? (
          <p>No events found.</p>
        ) : (
          <div className="events-grid">
            {events.map((event) => (
              <EventCard
                key={event._id}
                event={event}
                onDelete={handleDeleteEvent}
                onEdit={openEditModal}
                isAdmin={true}
              />
            ))}
          </div>
        )}
      </section>

      <section className="bookings-section">
        <h2>All Bookings</h2>
        {bookings.length === 0 ? (
          <p>No bookings yet.</p>
        ) : (
          <div className="table-wrapper">
            <table className="bookings-table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Event</th>
                  <th>Status</th>
                  <th>Change Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b) => (
                  <tr key={b._id}>
                    <td>{b.user?.name || "Unknown"}</td>
                    <td>{b.event?.title || "Unknown"}</td>
                    <td>{b.status}</td>
                    <td>
                      <select
                        value={b.status}
                        onChange={(e) =>
                          handleUpdateBooking(b._id, e.target.value)
                        }
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
      <section className="users-section">
        <h2>All Users</h2>
        {allUsers.length === 0 ? (
          <p>No users found.</p>
        ) : (
          <div className="table-wrapper">
            <table className="users-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Promote</th>
                </tr>
              </thead>
              <tbody>
                {allUsers.map((u) => (
                  <tr key={u._id}>
                    <td>{u.name}</td>
                    <td>{u.email}</td>
                    <td>{u.role}</td>
                    <td>
                      {u.role !== "admin" && (
                        <button
                          className="btn-primary"
                          onClick={async () => {
                            try {
                              const res = await promoteUser(u._id);
                              setMessage(res.message);
                              fetchData();
                            } catch (err) {
                              console.error(err);
                              setMessage("Failed to promote user.");
                            }
                          }}
                        >
                          Promote
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {isModalOpen && editingEvent && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Edit Event</h2>
              <button className="close-btn" onClick={closeModal}>
                ✖
              </button>
            </div>
            <form onSubmit={handleSaveEdit} className="modal-form">
              <input
                type="text"
                value={editingEvent.title}
                onChange={(e) =>
                  setEditingEvent({ ...editingEvent, title: e.target.value })
                }
                required
              />
              <input
                type="text"
                value={editingEvent.description}
                onChange={(e) =>
                  setEditingEvent({
                    ...editingEvent,
                    description: e.target.value,
                  })
                }
                required
              />
              <input
                type="datetime-local"
                value={editingEvent.date}
                onChange={(e) =>
                  setEditingEvent({ ...editingEvent, date: e.target.value })
                }
                required
              />
              <input
                type="text"
                value={editingEvent.location}
                onChange={(e) =>
                  setEditingEvent({ ...editingEvent, location: e.target.value })
                }
                required
              />
              <div className="button-row">
                <button type="submit" className="btn-primary">
                  Save Changes
                </button>
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={closeModal}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
