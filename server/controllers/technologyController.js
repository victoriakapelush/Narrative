const Post = require('../models/Post');

const getTechnologyPosts = (req, res) => {
  Post.find({ tag: "Technology" })
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({ nopostsfound: 'No posts found' }));
};

module.exports = {
  getTechnologyPosts,
};