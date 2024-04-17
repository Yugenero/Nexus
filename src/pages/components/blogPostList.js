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
			{/** create an array of link components */}
			{posts.map(post => (
				<>
				<Link className="blog_post_list_link" key={post.id} to={`/blog/${post.id}`}>
					{/**alt incase user cant see img */}
					
					<div className="blog_post_list_link_text">
						<h2 className="bpl_title">{post.title}</h2>
						<h4 className="bpl_excerpt">{post.excerpt}</h4>
						<h4 className="bpl_footer">{post.date} - <span>{post.author}</span></h4>
					</div>

					<img className="blog_post_list_link_img" src={post.imgUrl} alt={post.title} /> 
				</Link>
				<div className="line_break"></div>
			</>
			))}
		</div>
	);
};

export default BlogPostList;