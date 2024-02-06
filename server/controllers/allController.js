const Post = require('../models/Post');

const getAllPosts = (req, res) => {
  Post.find()
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({ nopostsfound: 'No posts found' }));
};

module.exports = {
  getAllPosts,
};