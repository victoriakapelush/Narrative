const express = require("express");
const router = express.Router();
const { verifyJWT } = require('../controllers/loginController')
const { getAllPosts, getAllIndiidualPosts } = require('../controllers/allController');
const { addComment, getAllComments } = require('../controllers/addCommentController');

router.get("/", getAllPosts, getAllComments);
router.get("/:id", getAllIndiidualPosts, addComment);

module.exports = router;