const express = require('express');
const router = express.Router();
const Post = require('../models/post');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); 

router.get('/', (req, res) => {
  res.render('addNew', { title: 'Add new product' }); 
});

router.post('/', upload.single('image'), async (req, res) => {
  const { title, text } = req.body;

  try {
    const newPost = new Post({
      title,
      image: req.file.filename,
      text
    });

    const savedProduct = await newPost.save();
    res.redirect('/');
  } catch (error) {
    console.error('Error adding post:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;