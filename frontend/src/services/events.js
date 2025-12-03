import API, { setAuthToken } from "./api";

// Fetch all events
export const getEvents = async () => {
  const res = await API.get("/events");
  return res.data;
};

// Create event (admin only)
export const createEvent = async (eventData, token) => {
  setAuthToken(token);
  const res = await API.post("/events", eventData);
  return res.data;
};

// Update event (admin only)
export const updateEvent = async (eventId, eventData, token) => {
  setAuthToken(token);
  const res = await API.put(`/events/${eventId}`, eventData);
  return res.data;
};

// Delete event (admin only)
export const deleteEvent = async (eventId, token) => {
  setAuthToken(token);
  const res = await API.delete(`/events/${eventId}`);
  return res.data;
};
