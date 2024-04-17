import React from "react";
import { useNavigate } from 'react-router-dom';

/**
 * Blog post skeleton for individual blog posts
 * @param {post} param0 
 * @returns 
 */
function BlogPost({ post }) {
	// react expects program to be single element so wrap all elements in a div
	return (
		<div className="blog_post">
			<h2>{post.title}</h2>
			<h4>{post.category}</h4>
			<h4>{post.author}</h4>
			<h4>{post.date}</h4>

			<p>{post.excerpt}</p>
			<p>{post.body}</p>
		</div>
	);
};
export default BlogPost;