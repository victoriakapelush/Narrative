const express = require("express");
const router = express.Router();
const session = require('express-session');
const passport = require('passport');
const { verifyJWT } = require('../controllers/loginController')
const { getCulturePosts, getAllIndiidualPosts } = require('../controllers/cultureController');

router.get("/", verifyJWT, getCulturePosts);
router.get("/:id", verifyJWT, getAllIndiidualPosts);

module.exports = router;