const mongoose = require('mongoose');
const BlogPost = require('../models/blogpost');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

mongoose.connect(process.env.MONGO_CLIENT_ID, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = async (req, res) => {
  try {
    const post = await BlogPost.findById(req.query.id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json('Error retrieving post: ' + error.message);
  }
};
