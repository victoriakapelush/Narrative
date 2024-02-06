const express = require("express");
const router = express.Router();
const { getCulturePosts } = require('../controllers/cultureController');

router.get("/", getCulturePosts);

module.exports = router;