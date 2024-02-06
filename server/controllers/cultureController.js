const Post = require('../models/Post');

const getCulturePosts = (req, res) => {
  Post.find({ tag: "Culture" })
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({ nopostsfound: 'No posts found' }));
};

module.exports = {
  getCulturePosts,
};