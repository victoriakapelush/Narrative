const Comment = require('../models/Comment');
const Post = require('../models/Post');

// Fetch all comments by user
const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find().populate('user');
    // Fetch a post with all related comments sorted in descending order
    const posts = await Post.find().populate('comments').sort({ time: -1 });
    return res.status(200).json(posts.map(post => ({
      ...post.toObject(),
      comments: post.comments,
      commentsUser: comments.filter(comment => comment.postId.equals(post._id))
    })));
  } catch (err) {
    console.error(err);
    return res.sendStatus(500);
  }
};

// Add a comment to a certain post
const addComment = async (req, res) => {
  const { text, user } = req.body;
  console.log(req.user)
  const post = await Post.findById(req.params.id);
  try {
    const newComment = new Comment({
      text,
      user
    }); 
    await newComment.save();
    post.comments.push(newComment.text, newComment.user);
    await post.save();
    res.status(201).json({ success: true, message: 'Comment added successfully', comment: newComment });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to add comment', error: error.message });
  }
};

// Delete a comment under a certain post
const deleteComment = async (req, res) => {
  console.log(req.user)

  try {
    const { content } = req.body;
    const post = await Post.findById(req.params.id);
    if (!post || !post.comments) {
      return res.status(404).json({ error: 'No comments found for this post' });
    }
    const commentIndex = post.comments.findIndex(comment => comment.includes(content));
    if (commentIndex === -1) {
      return res.status(404).json({ error: 'No such comment found' });
    }
    post.comments.splice(commentIndex, 2);
    await post.save();
    res.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    console.error('Error deleting comment:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { addComment, getAllComments, deleteComment };