const express = require("express");
const router = express.Router();
const { verifyJWT } = require("../controllers/loginController");
const {
  getAllPosts,
  getAllIndividualPosts,
  getPostsByCategory,
} = require("../controllers/getPosts");

router.get("/:category/:id", verifyJWT, getAllIndividualPosts); // For fetching an individual post by category and ID

router.get("/:category", verifyJWT, getPostsByCategory); // For fetching all posts under a specific category

// General route for all posts
router.get("/", verifyJWT, getAllPosts);

module.exports = router;
