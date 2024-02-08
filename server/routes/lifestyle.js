const express = require("express");
const router = express.Router();
const { getLifestylePosts, getAllIndiidualPosts } = require('../controllers/lifestyleController');

router.get("/", getLifestylePosts);
router.get("/:id", getAllIndiidualPosts);

module.exports = router;