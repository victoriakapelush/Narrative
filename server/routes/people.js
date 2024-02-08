const express = require("express");
const router = express.Router();
const { getPeoplePosts, getAllIndiidualPosts } = require('../controllers/peopleController');

router.get("/", getPeoplePosts);
router.get("/:id", getAllIndiidualPosts);

module.exports = router;