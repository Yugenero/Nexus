import React, {useEffect, useState }from "react";
import { Link, useParams } from 'react-router-dom';
import posts from "./components/blogPostData";
import Footer from "./components/footer";
import Header from "./components/header";
import './styles/blogPost.css';
import ReactMarkdown from "react-markdown";
import anime from "animejs";

/**
 * Blog post skeleton for individual blog posts
 * @param {post} param0 
 * @returns 
*/

function BlogPost() {
	const { id } = useParams();
	const [post, setPost] = useState(null);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);

  
	/** Use static data, this does not fetch data from an api */

	/**
	 * [id] part of a dependency array, this means that the effect will run whenever the 
	 * id changes. General rule of thumb is to add all variables that are used in the effect
	 * and if the variables is defined outside of the useEffect, add it to the dependency array
	 */
	useEffect(() => {
		const postData = posts.find((post) => post.id === parseInt(id));
		setPost(postData);
		setLoading(false);
	}, [id]); 

	useEffect(() => {
		anime({
			targets: '.post_img',
		})
	})


	/** if loading is false, and post is null, then the post was not found
	 * Otherwise, render post details */

	if (loading) {
		return <div className="loading">Loading...</div>;
  	}
	if (!post || post == null) {
		return <div className="post_not_found">Post not found</div>;
	}
	if (error) return <div className="error">An error occurred: {error.message}</div>;

	return (
		<div className="blog_page_ui">

			<Header/>
			<div className="blog_post_container">
				<div className="post_header">
					<p className="post_title">{post.title}</p>
					<div className="post_subtitle">
						<Link to={"https://substack.com/@nelsonrodriguez1?utm_source=user-menu"}>
							<img className="post_substack_link" 
							src="https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ff9bfdfbf-ac5c-4bb4-99f7-a616cc0ca0cb_2448x3264.png" />
						</Link>
						<div className="subtitle_info">
							<p className="name">{post.author}</p>
							<p className="date">{post.date}</p>
						</div>

					</div>
				</div>
				<div className="post_break"></div>

				<article className="post_body">
					<img className="post_img" src={post.imgUrl} alt={post.title} />

					<h2> paragraph title </h2>
					<ReactMarkdown 
					className="post_content"
					components={{

					}}
					>{post.body}</ReactMarkdown>
				</article>

			</div>
			<Footer/>

		</div>

	);
  }
  
  export default BlogPost;