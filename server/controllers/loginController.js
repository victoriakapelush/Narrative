const passport = require('passport');

// Function to get users
function getUsers(req, res, next) {
    res.json({ username: req.body.username });
}

const authenticateLogin = passport.authenticate('local', {
  successRedirect: '/all',
  failureRedirect: '/',
});

const isAuthenticated = (req, res, next) => {
  if (req.session.user) {
    // User is authenticated, allow access to the next middleware
    next();
  } else {
    // User is not authenticated, return an error or redirect to login page
    res.status(401).json({ error: 'Unauthorized' });
  }
};

module.exports = { getUsers, authenticateLogin, isAuthenticated };

  