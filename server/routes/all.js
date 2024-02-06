const express = require("express");
const router = express.Router();
const { getAllPosts } = require('../controllers/allController');
const { isAuthenticated } = require('../controllers/loginController');

router.get("/", isAuthenticated, getAllPosts);

module.exports = router;