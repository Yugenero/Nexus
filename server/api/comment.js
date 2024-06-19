const mongoose = require('mongoose');
const BlogPost = require('../models/blogpost');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

mongoose.connect(process.env.MONGO_CLIENT_ID, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = async (req, res) => {
  try {
    const { id, username, text } = req.body;
    console.log('Received payload:', req.body);

    if (!id || !username || !text) {
      console.log('Validation failed: Missing id, username, or text');
      return res.status(400).json({ error: 'Post ID, username, and text are required' });
    }
    const post = await BlogPost.findOne({ id });
    if (!post) {
      console.log('Post not found for ID:', id);
      return res.status(404).json({ error: 'Post not found' });
    }

    const comment = {
      username,
      text,
      date: new Date()
    };

    // console.logs for debugging
    post.comments.push(comment);
    await post.save();
    res.status(200).json(post.comments);

  } catch (error) {
    console.error('Error commenting on post:', error);
    res.status(500).json({ error: 'Error commenting on post' });
  }
};
