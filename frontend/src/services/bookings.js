import API, { setAuthToken } from "./api";

export const createBooking = async (eventId, token) => {
  setAuthToken(token);
  const res = await API.post("/bookings", { eventId });
  return res.data;
};

export const getUserBookings = async (token) => {
  setAuthToken(token);
  const res = await API.get("/bookings/my");
  return res.data;
};

export const getAllBookings = async (token) => {
  setAuthToken(token);
  const res = await API.get("/bookings");
  return res.data;
};

export const updateBookingStatus = async (bookingId, data, token) => {
  setAuthToken(token);
  const res = await API.put(`/bookings/${bookingId}/status`, data);
  return res.data;
};
