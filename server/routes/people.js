const express = require("express");
const router = express.Router();
const { verifyJWT } = require('../controllers/loginController')
const { getPeoplePosts, getAllIndiidualPosts } = require('../controllers/peopleController');

router.get("/", verifyJWT, getPeoplePosts);
router.get("/:id", verifyJWT, getAllIndiidualPosts);

module.exports = router;