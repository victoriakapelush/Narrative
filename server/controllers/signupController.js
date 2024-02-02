const User = require('../models/user');
const bcrypt = require('bcryptjs');

const signupController = (req, res, next) => {
  res.render('signup', { title: "Sign Up" });
};

const authenticatedUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (typeof password !== 'string') {
      return res.status(400).json({ message: "Invalid password format" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username: req.body.username,
      password: hashedPassword
    });

    // Save the new user
    const result = await newUser.save();
    console.log('Save result:', result);

    // Log in the new user
    req.login(newUser, (err) => {
      if (err) {
        return next(err);
      }
      return res.redirect('/');
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
  
module.exports = { signupController, authenticatedUser };