import React from "react";
import { Link } from "react-router-dom";

/**
 * create blog post list with posts as parameter
 * @param {posts} param0 
 * @returns list of blog posts
 */
function BlogPostList( {posts} ) {
	return (
		
		<div className="blog_post_list">
			{/** create an array of link components */}
			{posts.map(post => (
				<>
				<Link className="blog_post_list_link" key={post.id} to={`/p/${post.id}`}>
					{/**alt incase user cant see img */}
					<div className="blog_post_list_link_text">
						<p className="bpl_title">{post.title}</p>
						<p className="bpl_excerpt">{post.excerpt}</p>
						<p className="bpl_footer">{post.date} • <span>{post.author}</span></p>
					</div>
					<img className="blog_post_list_link_img" src={post.imgURL} alt={post.title} /> 
					
				</Link>
				<div className="line_break"></div>
			</>
			))}
		</div>
	);
};

export default BlogPostList;