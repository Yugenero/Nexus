import React, {useEffect, useState }from "react";
import { Link, useParams } from 'react-router-dom';
import Footer from "./components/footer";
import Header from "./components/header";
import './styles/blogPost.css';
import postList from "./data/posts.json";
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
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		console.log('id:', id);
		console.log('postList:', postList);
		const postData = postList.find((post) => post.id === id);
		console.log('postData:', postData);
		setPost(postData);
		setLoading(false);
	  }, [id]); 

	/** if loading is false, and post is null, then the post was not found
	 * Otherwise, render post details */

	if (loading) {
		return <div className="loading">Loading...</div>;
  	}
	if (!post || post == null) {
		return <div className="post_not_found">Post not found</div>;
	}

	return (
		<div className="blog_page_ui">

			<Header/>
			<div className="blog_post_container">
				<div className="post_header">
					<p className="post_title">{post.title}</p>
					<div className="post_subtitle">
						<a href={"https://substack.com/@nelsonrodriguez1?utm_source=user-menu"}>
							<img className="post_substack_link" 
							src="https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ff9bfdfbf-ac5c-4bb4-99f7-a616cc0ca0cb_2448x3264.png" />
						</a>
						<div className="subtitle_info">
							<p className="name">{post.author}</p>
							<p className="date">{post.date}</p>
						</div>
					</div>
				</div>

				<div className="post_break"></div>
				
				<article className="post_body">
					<img className="post_img" src={post.imgURL} alt={post.title} />
					{console.log(post.imgURL)}
					<ReactMarkdown>{post.content}</ReactMarkdown>
				</article>
			</div>
			<Footer/>

		</div>

	);
  }
  
  export default BlogPost;