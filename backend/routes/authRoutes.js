const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController");

const { promoteToAdmin } = require("../controllers/authController");
const {
  authenticateJWT,
  authorizeRoles,
} = require("../middleware/authMiddleware");

router.post("/register", register);

router.post("/login", login);

// Only admins can promote users
router.put(
  "/promote/:userId",
  authenticateJWT,
  authorizeRoles("admin"),
  promoteToAdmin
);

module.exports = router;
