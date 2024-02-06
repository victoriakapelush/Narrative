const express = require("express");
const router = express.Router();
const { getPeoplePosts } = require('../controllers/peopleController');

router.get("/", getPeoplePosts);

module.exports = router;