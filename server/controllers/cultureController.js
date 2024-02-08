const Post = require('../models/Post');

const getCulturePosts = (req, res) => {
  Post.find({ tag: "Culture" })
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({ nopostsfound: 'No posts found' }));
};

const getAllIndiidualPosts = (req, res) => {
  Post.findById(req.params.id)
  .then(post => res.json(post))
  .catch(err => res.status(404).json({ nopostsfound: 'No post found' }));
};

module.exports = { getCulturePosts, getAllIndiidualPosts };