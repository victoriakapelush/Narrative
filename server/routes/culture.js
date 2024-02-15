const express = require("express");
const router = express.Router();
const session = require('express-session');
const passport = require('passport');
const { verifyJWT } = require('../controllers/loginController')
const { getCulturePosts, getAllIndiidualPosts } = require('../controllers/cultureController');

router.get("/", getCulturePosts);
router.get("/:id", getAllIndiidualPosts);

module.exports = router;