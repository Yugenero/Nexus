/**
 * Routes for blog functionality
 */

const mongoose = require('mongoose');
const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

/**
 * SCHEMAS
 */
const CommentSchema = new mongoose.Schema({
	username: String,
	text: String,
	date: Date
})

const BlogPostSchema = new mongoose.Schema({
	id: String,
	title: String,
	author: String,
	likes: { type: Number, default: 0},
	comments: [CommentSchema], // array of comment schema documents
});
const BlogPost = mongoose.model('BlogPost', BlogPostSchema);

/**
 * GET METHODS
 */
router.get('/getPost', async(req, res) => {
	try {
		const post = await BlogPost.findById(req.query.id);
		res.status(200).json(post);
	} catch { 
		res.status(500).json('Error retrieving post');
	}
})

router.get('/getComments', async(req, res) => {
    try {
        console.log("Getting comments: " + req.query.id);
        const postId = req.query.id;
        if (!mongoose.Types.ObjectId.isValid(postId)) {
            return res.status(400).json('Invalid post ID');
        }
        const post = await BlogPost.findById(postId);
        res.status(200).json(post.comments);
    } catch {
        res.status(500).json('Error retrieving comments');
    }
})

/**
 * POST METHODS
*/
router.post('/importPosts', async(req, res) => {
	try {
		const filePath = path.join(__dirname, '..', 'pages', 'data', 'posts.json');
		const data = fs.readFileSync(filePath, 'utf8');
		const blogPosts = JSON.parse(data); // array of blog post objects

		for (const post of blogPosts) {
			// check for existing post
			const existingPost = await BlogPost.findOne({ id: post.id })
			if (existingPost) {
				continue;
			}
			const newPost = new BlogPost(post);
			await newPost.save();
		}

		res.status(200).json({message: 'Posts imported successfully'});
	} catch {
		console.log("Error importing blog posts: " + error);
		res.status(500).json({message: 'Error importing blog posts'})
	}
})

router.post('/deleteAllPosts', async(req, res) => {
	try {
		await mongoose.connection.db.collection('blogposts').drop();
		res.status(200).json({message: 'Blogposts collection dropped successfully'});
	} catch (error) {
		res.status(500).json({message: 'Error dropping blogposts collection'});
	}
})

/*router.post('/likePost',  async (req, res) => {
	try {
	  const postId = req.body.id;
	  const post = await BlogPost.findById(postId);
	  post.likes += 1;
	  await post.save();
	  res.status(200).json(post);
	} catch {
	  res.status(500).json('Error liking post');
	}
});

router.post('/comment', async(req, res) => {
	try {
		const postId = req.body.id;	
		const comment = {
			username: req.body.username,
			text: req.body.text,
			date: new Date()
		};
		const post = await BlogPost.findById(postId);
		post.comments.push(comment);
		await post.save();
		res.status(200).json(post);
	} catch {
		res.status(500).json('Error commenting on post');
	}
});*/

module.exports = { BlogPost, router } ;
