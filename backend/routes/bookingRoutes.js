const express = require("express");
const router = express.Router();
const {
  createBooking,
  getUserBookings,
  getAllBookings,
  updateBookingStatus,
} = require("../controllers/bookingController");

const {
  authenticateJWT,
  authorizeRoles,
} = require("../middleware/authMiddleware");

// User: create booking
router.post("/", authenticateJWT, createBooking);

// User: get own bookings
router.get("/my", authenticateJWT, getUserBookings);

// Admin: get all bookings
router.get("/", authenticateJWT, authorizeRoles("admin"), getAllBookings);

// Admin: update booking status
router.put(
  "/:id",
  authenticateJWT,
  authorizeRoles("admin"),
  updateBookingStatus
);

module.exports = router;
