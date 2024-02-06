const express = require("express");
const router = express.Router();
const passport = require('passport');
const { authenticateLogin, getUsers } = require('../controllers/loginController');

router.get('/', getUsers);
router.post('/', authenticateLogin);

module.exports = router;