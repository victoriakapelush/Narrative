const express = require("express");
const router = express.Router();
const { verifyJWT } = require('../controllers/loginController')
const { getPeoplePosts, getAllIndiidualPosts } = require('../controllers/peopleController');

router.get("/", getPeoplePosts);
router.get("/:id", getAllIndiidualPosts);

module.exports = router;