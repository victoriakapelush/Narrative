const Post = require('../models/Post')

// Add a post
const addPost = async (req, res) => {
  const { title, text, description, tag } = req.body;
  const userId = req.user.id;
  try {
    
      let imagePath;
      if (req.file) {
          imagePath = req.file.filename;
      }

        // Check if the text field is empty
  if (!text || text.trim() === '') {
    return res.status(400).json({ error: 'Text field is required' });
  }

      const newPost = new Post({
          title,
          description,
          image: imagePath,
          text,
          tag,
          user: userId
      });
      await newPost.save();

      // Fetch the post again, populating the `user` field
    const populatedPost = await Post.findById(newPost._id).populate('user');

    res.status(201).json({
      success: true,
      message: 'Post created successfully',
      post: populatedPost
    });
  } catch (error) {
    console.error('Error adding post:', error);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = { addPost };