const Post = require('../models/Post');

const getPeoplePosts = (req, res) => {
  Post.find({ tag: "People" })
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({ nopostsfound: 'No posts found' }));
};

const getAllIndiidualPosts = (req, res) => {
  Post.findById(req.params.id)
  .then(post => res.json(post))
  .catch(err => res.status(404).json({ nopostsfound: 'No post found' }));
};

module.exports = { getPeoplePosts, getAllIndiidualPosts };