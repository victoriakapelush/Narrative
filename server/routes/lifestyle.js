const express = require("express");
const router = express.Router();
const { getLifestylePosts } = require('../controllers/lifestyleController');

router.get("/", getLifestylePosts);

module.exports = router;