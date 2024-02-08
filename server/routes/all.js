const express = require("express");
const router = express.Router();
const { getAllPosts, getAllIndiidualPosts } = require('../controllers/allController');

router.get("/", getAllPosts);
router.get("/:id", getAllIndiidualPosts);

module.exports = router;