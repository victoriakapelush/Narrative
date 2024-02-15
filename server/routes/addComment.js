var express = require('express');
var router = express.Router();
const { verifyJWT } = require('../controllers/loginController')
const { addComment, getAllComments } = require('../controllers/addCommentController');

router.get('/:id', getAllComments);
router.post('/:id', addComment);

module.exports = router;
