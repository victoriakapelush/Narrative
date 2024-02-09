var express = require('express');
var router = express.Router();
const { verifyJWT } = require('../controllers/loginController')
const { addComment, getAllComments } = require('../controllers/addCommentController');

router.get("/", getAllComments);
router.post('/', addComment);

module.exports = router;
