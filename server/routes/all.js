const express = require("express");
const router = express.Router();
const { verifyJWT } = require('../controllers/loginController')
const { getAllPosts, getAllIndiidualPosts } = require('../controllers/allController');

router.get("/", getAllPosts);
router.get("/:id", getAllIndiidualPosts);

module.exports = router;