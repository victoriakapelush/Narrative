const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const signupController = require('../controllers/signupController');

router.get('/signup', signupController)
router.post('/signup', signupController)

module.exports = router;
