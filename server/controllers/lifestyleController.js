const Post = require('../models/Post');

const getLifestylePosts = (req, res) => {
  Post.find({ tag: "Lifestyle" })
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({ nopostsfound: 'No posts found' }));
};

module.exports = {
  getLifestylePosts,
};