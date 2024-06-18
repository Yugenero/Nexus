const mongoose = require('mongoose');
const CommentSchema = require('./Comment').schema;

const BlogPostSchema = new mongoose.Schema({
    id: String,
    title: String,
    author: String,
    likes: { type: Number, default: 0 },
    comments: [CommentSchema], // array of comment schema documents
});

module.exports = mongoose.model('BlogPost', BlogPostSchema);
