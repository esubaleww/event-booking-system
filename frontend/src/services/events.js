import API, { setAuthToken } from "./api";

export const getEvents = async () => {
  const res = await API.get("/events");
  return res.data;
};

export const createEvent = async (eventData, token) => {
  setAuthToken(token);
  const res = await API.post("/events", eventData);
  return res.data;
};

export const updateEvent = async (eventId, eventData, token) => {
  setAuthToken(token);
  const res = await API.put(`/events/${eventId}`, eventData);
  return res.data;
};

export const deleteEvent = async (eventId, token) => {
  setAuthToken(token);
  const res = await API.delete(`/events/${eventId}`);
  return res.data;
};
