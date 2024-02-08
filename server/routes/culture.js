const express = require("express");
const router = express.Router();
const { getCulturePosts, getAllIndiidualPosts } = require('../controllers/cultureController');

router.get("/", getCulturePosts);
router.get("/:id", getAllIndiidualPosts);

module.exports = router;