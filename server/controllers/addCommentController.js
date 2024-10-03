const Comment = require('../models/Comment');
const Post = require('../models/Post');

// Fetch all comments for a certain post
const getAllComments = async (req, res) => {
  try {
    // Fetch the post and populate the comments and their users
    const post = await Post.findById(req.params.id)
      .populate({
        path: 'comments', // Populate the comments field
        populate: { path: 'user' } // Populate the user field in each comment
      })
      .populate('user'); // Optionally populate the user for the post

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Return the post with all its populated comments
    return res.status(200).json({
      post: post,
      comments: post.comments,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Add a comment to a certain post
const addComment = async (req, res) => {
  const { text } = req.body;
  const userId = req.user.id;

  try {
    const post = await Post.findById(req.params.id);

    // Create a new comment
    const newComment = new Comment({
      text,
      user: userId // Add the user ID here
    });

    // Save the comment to the database
    await newComment.save();

    // Add the comment to the post's comments array
    if (!Array.isArray(post.comments)) {
      post.comments = [];
    }

    post.comments.push(newComment);
    await post.save();

    // Populate the user field of the new comment
    const populatedComment = await Comment.findById(newComment._id).populate('user');

    // Send back the populated comment with user data
    res.status(201).json({ 
      success: true, 
      message: 'Comment added successfully', 
      comment: populatedComment // Include populated user here
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to add comment', 
      error: error.message 
    });
  }
};


// Delete comment from a certain post
const deleteComment = async (req, res) => {
  const { commentId } = req.body;

  try {
    // Delete the comment from the Comment schema
    const comment = await Comment.findByIdAndDelete(commentId);

    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    // Update the post by pulling the comment ID from its comments array
    const post = await Post.findOneAndUpdate(
      { comments: commentId }, // Find the post containing the comment
      { $pull: { comments: commentId } }, // Remove the comment ID from the comments array
      { new: true } // Return the updated post
    );

    if (!post) {
      return res.status(404).json({ error: 'Post not found for this comment' });
    }

    res.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    console.error('Error deleting comment:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


module.exports = { addComment, getAllComments, deleteComment };