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
 * visual representation of the data model on page
 * -------------
 * username - date
 * text
 * -------------
 */
const CommentSchema = new mongoose.Schema({
    username: { type: String, required: true },
    text: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

const BlogPostSchema = new mongoose.Schema({
	id: String,
	title: String,
	author: String,
	likes: { type: Number, default: 0},
	comments: [CommentSchema], // array of comment schema documents
});

const BlogPost = mongoose.model('BlogPost', BlogPostSchema);
const Comment = mongoose.model('Comment', CommentSchema);

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

router.get('/getComments', async (req, res) => {
    try {
		/**
		 * Client: await axios.get('http://localhost:3000/getComments', 
		 * 				{ params: { id: postId }});
		 * postId is passed as a query parameter and is accessed via req.query.id
		 */
		console.log('/getComments called with postId: ', req.query.id);
        const postId = req.query.id;
        const post = await BlogPost.findOne({id : postId});
        if (!post) {
            return res.status(404).json('Post not found');
        }
        res.status(200).json(post.comments);
    } catch (error) {
        console.error('Error retrieving comments:', error);
        res.status(500).json('Error retrieving comments');
    }
});

/**
 * POST METHODS
 * remember that importing the posts will not overwrite the existing posts
 * so if you import the posts you will have duplicates
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

/**
 * All data associated with post is deleted
 */
router.post('/deleteAllPosts', async(req, res) => {
	try {
		await mongoose.connection.db.collection('blogposts').drop();
		res.status(200).json({message: 'Blogposts collection dropped successfully'});
	} catch (error) {
		res.status(500).json({message: 'Error dropping blogposts collection'});
	}
})

router.post('/comment', async (req, res) => {
    try {
        const { id, username, text } = req.body;
        console.log('Received payload:', req.body);

        if (!id || !username || !text) {
            console.log('Validation failed: Missing id, username, or text');
            return res.status(400).json({ error: 'Post ID, username, and text are required' });
        }
        const post = await BlogPost.findOne({id});
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
});


router.post('/likePost',  async (req, res) => {
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


module.exports = { BlogPost, Comment, router } ;
