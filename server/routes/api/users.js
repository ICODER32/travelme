const express = require("express");
const router = express.Router();
const { signToken, authMiddleware } = require("../../utils/auth");

const User = require("../../models/User");

// Sign up
router.post("/signup", require("../../controllers/api/users").Signup);
//login
router.post("/login", require("../../controllers/api/users").Login);
// get user
router.get("/:id", require("../../controllers/api/users").GetUser);

module.exports = router;
