const express = require("express");
const router = express.Router();
const { getLifestylePosts, getAllIndiidualPosts } = require('../controllers/lifestyleController');
const { verifyJWT } = require('../controllers/loginController')

router.get("/", getLifestylePosts);
router.get("/:id", getAllIndiidualPosts);

module.exports = router;