const express = require("express");
const router = express.Router();
const {
  register,
  login,
  getAllUsers,
  promoteToAdmin,
} = require("../controllers/authController");

const {
  authenticateJWT,
  authorizeRoles,
} = require("../middleware/authMiddleware");

router.post("/register", register);

router.post("/login", login);

router.put(
  "/promote/:userId",
  authenticateJWT,
  authorizeRoles("admin"),
  promoteToAdmin
);

router.get("/users", authenticateJWT, authorizeRoles("admin"), getAllUsers);
module.exports = router;
