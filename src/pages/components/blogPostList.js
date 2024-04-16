import React from "react";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";

/**
 * create blog post list with posts as parameter
 * @param {posts} param0 
 * @returns array of blog posts or a map that will be passed to the component 
 * that will render the blog post list and be displayed as a list of blog posts
 * such that when the user clicks on the link, they will be taken to the blog
 * post page
 */
function BlogPostList( {posts} ) {
	return (
		<div className="blog_post_list">
			{posts.map(post => (
				<Link className="blog_post_list_link "key={posts.id} to={`/blog/${post.id}`}>
					{/**alt incase user cant see img */}
					<img src={post.imageUrl} alt={post.title} /> 
					<h2>{post.title}</h2>
					<h4>{post.category}</h4>
					<h4>{post.author}</h4>
					<h4>{post.date}</h4>
				</Link>
			))};
		</div>

	);
};

export default BlogPostList;