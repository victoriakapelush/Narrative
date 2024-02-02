const express = require("express");
const router = express.Router();
const { signupController, authenticatedUser } = require("../controllers/signupController");

router.get("/", signupController);

router.post("/", authenticatedUser);

module.exports = router;