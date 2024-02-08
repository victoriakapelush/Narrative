const Post = require('../models/Post');

const getTechnologyPosts = (req, res) => {
  Post.find({ tag: "Technology" })
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({ nopostsfound: 'No posts found' }));
};

const getAllIndiidualPosts = (req, res) => {
  Post.findById(req.params.id)
  .then(post => res.json(post))
  .catch(err => res.status(404).json({ nopostsfound: 'No post found' }));
};

module.exports = { getTechnologyPosts, getAllIndiidualPosts };