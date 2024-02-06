const express = require("express");
const router = express.Router();
const { getTechnologyPosts } = require('../controllers/technologyController');

router.get("/", getTechnologyPosts);

module.exports = router;