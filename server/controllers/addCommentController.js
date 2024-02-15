const express = require('express');
const Comment = require('../models/Comment');
const Post = require('../models/Post');
const User = require('../models/user');

/*const getAllComments = (req, res) => {
    Comment.findById(req.params.id)
      .then(comments => res.json(comments))
      .catch(err => res.status(404).json({ nocommentsfound: 'No comments found' }));
  };*/

  /*const addComment = async (req, res) => {
    const { postId, text, user } = req.body;
    try {
      const newComment = new Comment({
        postId,
        text,
        user,
        time: new Date() // Set the current time for the comment
      });
      await newComment.save();
      res.status(201).json({ message: 'Comment created successfully', comment: newComment });
    } catch (error) {
      console.error('Error adding comment:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };*/

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

  // Controller function to add a comment under a certain post
const addComment = async (req, res) => {
  const post = await Post.findById(req.params.id);
  try {
    const newComment = new Comment({
      text: req.body.text
    }); 
    await newComment.save();
    post.comments.push(newComment.text, newComment.time);
    await post.save();
    res.status(201).json({ success: true, message: 'Comment added successfully', comment: newComment });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to add comment', error: error.message });
  }
};


/*const getAllComments = async (req, res) => {
  try {
    const id = req.params.id;
    const comments = await Comment.find({ id });
    res.status(200).json({ success: true, comments });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to get comments for post', error: error.message });
  }
};*/

  /*const addComment = async (req, res, next) => {
    try {
      const currentPost = await Post.findById();
  
      if (!currentPost) {
        return res.status(404).send('Post not found');
      }
  
      const newComment = new Comment({
        postId: currentPost._id,
        text: req.body.text,
      });
  
      await newComment.save();
     
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  };*/

module.exports = { addComment, getAllComments };