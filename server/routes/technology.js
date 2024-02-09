const express = require("express");
const router = express.Router();
const { verifyJWT } = require('../controllers/loginController');
const { getTechnologyPosts, getAllIndiidualPosts } = require('../controllers/technologyController');

router.get("/", verifyJWT, getTechnologyPosts);
router.get("/:id", getAllIndiidualPosts);

module.exports = router;