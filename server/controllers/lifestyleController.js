const Post = require('../models/Post');

const getLifestylePosts = (req, res) => {
  Post.find({ tag: "Lifestyle" })
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({ nopostsfound: 'No posts found' }));
};

const getAllIndiidualPosts = (req, res) => {
  Post.findById(req.params.id)
  .then(post => res.json(post))
  .catch(err => res.status(404).json({ nopostsfound: 'No post found' }));
};

module.exports = { getLifestylePosts, getAllIndiidualPosts };