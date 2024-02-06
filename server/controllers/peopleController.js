const Post = require('../models/Post');

const getPeoplePosts = (req, res) => {
  Post.find({ tag: "People" })
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({ nopostsfound: 'No posts found' }));
};

module.exports = {
  getPeoplePosts,
};