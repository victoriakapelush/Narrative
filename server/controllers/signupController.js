const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/user');

router.get('/signup', (req, res) => {
    User.find()
      .then(users => res.json(users))
      .catch(err => res.status(404).json({ nousersfound: 'No users found' }));
  });

  router.post('/signup', async (req, res) => {
    try {
      const { username, password } = req.body;
      if (!password || typeof password !== 'string') {
        return res.status(400).json({ message: "Invalid password format" });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ username, password: hashedPassword });
      await user.save();
      res.status(201).json({ message: 'Registration successful' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
      }});

module.exports = router;
