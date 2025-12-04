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

router.get("/", getEvents);

router.get("/:id", getEvent);

router.post("/", authenticateJWT, authorizeRoles("admin"), createEvent);

router.put("/:id", authenticateJWT, authorizeRoles("admin"), updateEvent);

router.delete("/:id", authenticateJWT, authorizeRoles("admin"), deleteEvent);

module.exports = router;
