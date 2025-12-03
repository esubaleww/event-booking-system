import React from "react";
import "../styles/EventCard.css";

const EventCard = ({ event, onDelete, onEdit, isAdmin }) => {
  return (
    <div className="event-card">
      <h3>{event.title}</h3>
      <p>{event.description}</p>
      <p>
        <strong>Date:</strong> {new Date(event.date).toLocaleString()}
      </p>
      <p>
        <strong>Location:</strong> {event.location}
      </p>
      {isAdmin && (
        <div className="event-actions">
          <button onClick={() => onEdit(event)} className="btn-primary">
            Edit
          </button>
          <button onClick={() => onDelete(event._id)} className="btn-secondary">
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default EventCard;
