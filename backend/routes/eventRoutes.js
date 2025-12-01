const express = require("express");
const router = express.Router();
const {
  createEvent,
  getEvents,
  getEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/eventController");

const {
  authenticateJWT,
  authorizeRoles,
} = require("../middleware/authMiddleware");

// Public: Get all events
router.get("/", getEvents);

// Public: Get single event
router.get("/:id", getEvent);

// Admin only: Create event
router.post("/", authenticateJWT, authorizeRoles("admin"), createEvent);

// Admin only: Update event
router.put("/:id", authenticateJWT, authorizeRoles("admin"), updateEvent);

// Admin only: Delete event
router.delete("/:id", authenticateJWT, authorizeRoles("admin"), deleteEvent);

module.exports = router;
