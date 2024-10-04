const Post = require("../models/Post");

// Display all existing posts for a page "All"
const getAllPosts = (req, res) => {
  Post.find()
    .populate({
      path: "comments", // Populate the comments field
      populate: {
        path: "user", // Populate the user field in each comment
      },
    })
    .populate("user") // Populate the user field in the post
    .then((posts) => res.json(posts))
    .catch((err) => {
      console.error(err); // Log the error for debugging
      res.status(500).json({ error: "Server error" });
    });
};

// Display a certain post based on ID
const getAllIndividualPosts = (req, res) => {
  Post.findById(req.params.id)
    .populate("user") // Populate the user field in the post
    .populate({
      path: "comments", // Populate the comments field
      populate: {
        path: "user", // Populate the user field in each comment
      },
    })
    .then((post) => {
      if (!post) {
        return res.status(404).json({ nopostfound: "No post found" });
      }
      res.json(post);
    })
    .catch((err) => {
      console.error(err); // Log the error for debugging
      res.status(500).json({ error: "Server error" });
    });
};

// Display all posts under a certain category
const getPostsByCategory = (req, res) => {
  const { category } = req.params;

  // Perform a case-insensitive search using regex
  Post.find({ tag: { $regex: new RegExp(category, "i") } })
    .populate("user") // Populate the user field in the post
    .populate({
      path: "comments", // Populate the comments field
      populate: {
        path: "user", // Populate the user field in each comment
      },
    })
    .then((posts) => {
      if (posts.length === 0) {
        return res
          .status(404)
          .json({ nopostsfound: "No posts found under this category" });
      }
      return res.json(posts);
    })
    .catch((err) => {
      console.error(err); // Log the error for debugging
      res.status(500).json({ error: "Server error" });
    });
};

module.exports = { getAllPosts, getAllIndividualPosts, getPostsByCategory };
