var express = require("express");
var router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const { verifyJWT } = require("../controllers/loginController");
const { addPost } = require("../controllers/addPostController");

router.post("/", verifyJWT, upload.single("image"), addPost);

module.exports = router;
