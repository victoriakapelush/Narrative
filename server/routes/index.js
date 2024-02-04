var express = require('express');
var router = express.Router();
const path = require('path');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); 
const Post = require('../models/post');
const User = require('../models/user');

router.get('/', (req, res) => {
  Post.find()
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({ nopostsfound: 'No posts found' }));
});

router.get('/signup', (req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(404).json({ nousersfound: 'No users found' }));
});

router.post('/signup', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!password || typeof password !== 'string') {
      return res.status(400).json({ message: "Invalid password format" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: 'Registration successful' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }});

router.get('/culture', (req, res) => {
  Post.find({ tag: "Culture" })
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({ nopostsfound: 'No posts found' }));
});

router.get('/technology', (req, res) => {
  Post.find({ tag: "Technology" })
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({ nopostsfound: 'No posts found' }));
});

router.get('/people', (req, res) => {
  Post.find({ tag: "People" })
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({ nopostsfound: 'No posts found' }));
});

router.get('/lifestyle', (req, res) => {
  Post.find({ tag: "Lifestyle" })
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({ nopostsfound: 'No posts found' }));
});

router.get('/:id', (req, res) => {
  Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err => res.status(404).json({ nopostsfound: 'No post found' }));
});

router.post('/', upload.single('image'), async (req, res) => {
  try {
      // Create a new post instance using data from the request body
      const newPost = new Post({
          title: req.body.title,
          image: req.file.filename,
          description: req.body.description,
          text: req.body.text
      });

      // Save the new post to the database
      const savedPost = await newPost.save();

      res.status(201).json(savedPost); // Respond with the saved post
  } catch (error) {
      console.error('Error saving post:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.put('/:id', (req, res) => {
  Post.findByIdAndUpdate(req.params.id, req.body)
    .then(post => res.json({ msg: 'Updated successfully' }))
    .catch(err =>
      res.status(400).json({ error: 'Unable to update the Database' })
    );
});

router.delete('/:id', (req, res) => {
  Post.findByIdAndDelete(req.params.id)
    .then(post => res.json({ mgs: 'Post deleted successfully' }))
    .catch(err => res.status(404).json({ error: 'No such a post' }));
});

module.exports = router;
