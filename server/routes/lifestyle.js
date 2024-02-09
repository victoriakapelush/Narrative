const express = require("express");
const router = express.Router();
const { getLifestylePosts, getAllIndiidualPosts } = require('../controllers/lifestyleController');
const { verifyJWT } = require('../controllers/loginController')

router.get("/", verifyJWT, getLifestylePosts);
router.get("/:id", verifyJWT, getAllIndiidualPosts);

module.exports = router;