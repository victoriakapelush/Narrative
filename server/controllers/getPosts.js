const Post = require('../models/Post');

// Display all existing posts for a page "All"
const getAllPosts = (req, res) => {
  Post.find()
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({ nopostsfound: 'No posts found' }));
};

// Display a certain post based on ID
const getAllIndividualPosts = (req, res) => {
  Post.findById(req.params.id)
  .then(post => res.json(post))
  .catch(err => res.status(404).json({ nopostsfound: 'No post found' }));
};

// Display all posts under a certain category
const getPostsByCategory = (req, res) => {
  const { category } = req.params;
  
  // Perform a case-insensitive search using regex
  Post.find({ tag: { $regex: new RegExp(category, 'i') } }) 
    .then(posts => {
      if (posts.length === 0) {
        return res.status(404).json({ nopostsfound: 'No posts found under this category' });
      }
      return res.json(posts);
    })
    .catch(err => res.status(500).json({ error: 'Server error' }));
};


module.exports = { getAllPosts, getAllIndividualPosts, getPostsByCategory };