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

router.post("/", authenticateJWT, createBooking);

router.get("/my", authenticateJWT, getUserBookings);

router.get("/", authenticateJWT, authorizeRoles("admin"), getAllBookings);

router.put(
  "/:id/status",
  authenticateJWT,
  authorizeRoles("admin"),
  updateBookingStatus
);

module.exports = router;
