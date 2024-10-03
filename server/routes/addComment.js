var express = require('express');
var router = express.Router();
const { verifyJWT } = require('../controllers/loginController');
const { addComment, getAllComments, deleteComment } = require('../controllers/addCommentController');

router.get('/:id', verifyJWT, getAllComments);
router.post('/:id', verifyJWT, addComment);
router.delete('/:id', verifyJWT, deleteComment);

module.exports = router;
