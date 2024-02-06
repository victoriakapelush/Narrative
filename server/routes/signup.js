const express = require('express');
const router = express.Router();
const { signupGet, signupPost } = require('../controllers/signupController');

router.get('/', signupGet)
router.post('/', signupPost)

module.exports = router;
