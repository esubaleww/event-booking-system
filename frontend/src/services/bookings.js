import API, { setAuthToken } from "./api";

// Create booking
export const createBooking = async (eventId, token) => {
  setAuthToken(token);
  const res = await API.post("/bookings", { eventId });
  return res.data;
};

// Get user's own bookings
export const getUserBookings = async (token) => {
  setAuthToken(token);
  const res = await API.get("/bookings/my");
  return res.data;
};

// Get all bookings (admin)
export const getAllBookings = async (token) => {
  setAuthToken(token);
  const res = await API.get("/bookings");
  return res.data;
};

// Admin: Update booking status
export const updateBookingStatus = async (bookingId, data, token) => {
  setAuthToken(token);
  const res = await API.put(`/bookings/${bookingId}/status`, data);
  return res.data;
};
