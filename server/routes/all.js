const express = require("express");
const router = express.Router();
const { getAllPosts } = require('../controllers/allController');

router.get("/", getAllPosts);

module.exports = router;