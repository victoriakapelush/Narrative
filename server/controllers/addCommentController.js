const Comment = require('../models/Comment');
const Post = require('../models/Post');
const User = require('../models/user');

const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find().populate('user');
    const posts = await Post.find().populate('comments').sort({ createdAt: -1 });
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

const addComment = async (req, res) => {
  const { text, user } = req.body;
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

module.exports = { addComment, getAllComments };