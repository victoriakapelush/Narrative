var express = require('express');
var router = express.Router();
const { verifyJWT } = require('../controllers/loginController')
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); 
const { addPost } = require('../controllers/addPostController');

router.post('/', upload.single("image"), addPost);

module.exports = router;
