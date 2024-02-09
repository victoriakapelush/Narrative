const express = require('express');
const Comment = require('../models/Comment')

const getAllComments = (req, res) => {
    Comment.find()
      .then(comments => res.json(comments))
      .catch(err => res.status(404).json({ nocommentsfound: 'No comments found' }));
  };

const addComment = async (req, res) => {
  const { text, user } = req.body;
  try {
      const newComment = new Comment({
          text,
          user
      });
      await newComment.save();
      res.status(201).send('Comment created successfully');
      console.log(text, user)
  } catch (error) {
      console.error('Error adding comment:', error);
      res.status(500).send('Internal Server Error');
  }
};

module.exports = { addComment, getAllComments };