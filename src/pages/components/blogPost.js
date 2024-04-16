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
			<h1> {post.title} </h1>
			<p> {post.body} </p>
			
		</div>
	);
};
export default BlogPost;