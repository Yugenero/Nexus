const mongoose = require('mongoose');
const BlogPost = require('../models/blogpost');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

mongoose.connect(process.env.MONGO_CLIENT_ID, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = async (req, res) => {
  try {
    const postId = req.query.id;
    const post = await BlogPost.findOne({ id: postId });
    if (!post) {
      return res.status(404).json('Post not found');
    }
    res.status(200).json(post.comments);
  } catch (error) {
    console.error('Error retrieving comments:', error);
    res.status(500).json('Error retrieving comments: ' + error.message);
  }
};
