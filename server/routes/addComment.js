var express = require('express');
var router = express.Router();
const { addComment, getAllComments, deleteComment } = require('../controllers/addCommentController');

router.get('/:id', getAllComments);
router.post('/:id', addComment);
router.delete('/:id', deleteComment);

module.exports = router;
