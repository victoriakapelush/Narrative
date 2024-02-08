const express = require('express');
const router = express.Router();
const Post = require('../models/Post')

const addPost = async (req, res) => {
  const { title, text, description } = req.body;
  try {
      let imagePath;
      if (req.file) {
          imagePath = req.file.filename;
      }
      const newPost = new Post({
          title,
          description,
          image: imagePath,
          text
      });
      await newPost.save();
      res.status(201).send('Post created successfully');
  } catch (error) {
      console.error('Error adding post:', error);
      res.status(500).send('Internal Server Error');
  }
};

module.exports = { addPost };