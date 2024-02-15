const Comment = require('../models/Comment');
const Post = require('../models/Post');

  const getAllComments = async (req, res) => {
    try {
      const posts = await Post.find().populate('comments').sort({ createdAt: -1 });
      const updatedPosts = posts.map(post => {
        return {
          ...post.toObject(),
          comments: post.comments.map(comment => comment._id)
        };
      });
      return res.status(200).json(updatedPosts);
    } catch (err) {
      console.error(err);
      return res.sendStatus(500);
    }
  };

const addComment = async (req, res) => {
  const post = await Post.findById(req.params.id);
  try {
    const newComment = new Comment({
      text: req.body.text
    }); 
    await newComment.save();
    post.comments.push(newComment.text);
    await post.save();
    res.status(201).json({ success: true, message: 'Comment added successfully', comment: newComment });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to add comment', error: error.message });
  }
};

module.exports = { addComment, getAllComments };