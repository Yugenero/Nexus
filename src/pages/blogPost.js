import React, {useEffect, useState }from "react";
import { Link, useParams } from 'react-router-dom';
import Footer from "./components/footer";
import Header from "./components/header";
import postList from "./data/posts.json";
import ReactMarkdown from "react-markdown";
import FavoriteIcon from '@material-ui/icons/Favorite';
import { IconButton } from "@material-ui/core";
import { heartScale } from "./animations/blogPostAnimations";
import axios from "axios"; // Note: React import
import './styles/blogPost.css';


/**
 * Commenting Component
 *
 */

function CommentSection({ postId, user }) {

	/*const [isLoggedIn, setIsLoggedIn] = useState(false);
  	const [loading, setLoading] = useState(true);

	const checkLoginStatus = async () => {
		try {
			const response = await axios.get('http://localhost:3000/isLoggedIn');
			setIsLoggedIn(response.data.isLoggedIn);
			setUsername(response.data.username);
			setLoading(false);
		} catch (error) {
			console.error('Error checking login status:', error);
			setLoading(false);
		}
	};
	
	useEffect(() => {
		checkLoginStatus();
	}, []);
	
	if (loading) {
		// return blank page (or loading animation)
		return <div> Log in to comment </div>
	}*/

	const[comments, setComments] = useState([]);
	const[newComment, setNewComment] = useState('');

	useEffect(() => {
		const fetchComments = async () => {
		  try {
			const response = await axios.get('http://localhost:3000/getComments', { params: { id: postId }});
			console.log(response.data);
			setComments(response.data.comments);
		  } catch (error) { console.error('Error fetching comments:', error); }
		};
		fetchComments();
	}, [postId]);


	const handleSubmit = (event) => {
		event.preventDefault();
		axios.post('http://localhost:3000/comment', { id: postId, username: user.username, text: newComment })
		.then((response) => {
			setComments(prevComments => [...prevComments, { username: user.username, text: newComment, date: new Date() }]);
			setNewComment('');
		})
		.catch(error => console.error('Error posting comment: ', error));
	}

	return (
		<div className="comment_section">
			<form onSubmit={handleSubmit}>
				<input type="text" value={newComment} onChange={e => setNewComment(e.target.value)} required/>
				<button type="submit"> Submit </button>
			</form>

			{comments.map((comment, index) => (
				<div key={index}>
					<p>{comment.username}</p>
					<p>{comment.text}</p>
				</div>
			))}
		</div>
	)
}


/**
 * Blog post skeleton for individual blog posts
 * @param {post} param0 
 * @returns 
*/

function BlogPost( { status, user }) {

	const { id } = useParams();
	const [post, setPost] = useState(null);
	const [isClick, setClick] = useState(false); // for heart animation
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [username, setUsername] = useState('');
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		console.log('Post data');
		console.log('id:', id);
		console.log('postList:', postList);
		const postData = postList.find((post) => post.id === id);
		console.log('postData:', postData);
		setPost(postData);
	  }, [id]); 

	/** if loading is false, and post is null, then the post was not found
	 * Otherwise, render post details */
	const checkLoginStatus = async () => {
		try {
			const response = await axios.get('http://localhost:3000/isLoggedIn');
			setIsLoggedIn(response.data.isLoggedIn);
			setUsername(response.data.username);
			setLoading(false);
		} catch (error) {
			console.error('Error checking login status:', error);
			setLoading(false);
		}
	};
	useEffect(() => {
		checkLoginStatus();
	}, []);
	
	if (!post || post == null) {
		return <div className="post_not_found">Post not found</div>;
	}
	if (loading) {
		// return blank page (or loading animation)
		return <div></div>
	}

	return (
		<div className="blog_page_ui">
			<Header isLoggedIn={isLoggedIn} username={username}/>
			<div className="blog_post_container">
				<div className="post_header">
					<p className="post_title">{post.title}</p>
					<div className="post_subtitle">
						<div className="left_container">
							<a href={"https://substack.com/@nelsonrodriguez1?utm_source=user-menu"}>
								<img className="post_substack_link" 
								src="https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ff9bfdfbf-ac5c-4bb4-99f7-a616cc0ca0cb_2448x3264.png" />
							</a>
							<div className="subtitle_info">
								<p className="name">{post.author}</p>
								<p className="date">{post.date}</p>
							</div>
						</div>
						{/** Like button */}
						<IconButton className="heart_button" style={{color: 'white'}}>
							<FavoriteIcon className="heart_icon" color="secondary"
							onMouseEnter={heartScale}
							onClick={() => {
								console.log('clicked');
							}}/>
						</IconButton>
					</div>
				</div>

				<div className="post_break"></div>
				
				<article className="post_body">
					{/**add missing image image */}
					<img className="post_img" src={post.imgURL} alt={post.title} />
					{console.log(post.imgURL)}
					<ReactMarkdown>{post.content}</ReactMarkdown>
				</article>
			</div>
			<CommentSection postId={id} user={user}/>
			<Footer/>
		</div>

	);
  }
  
  export default BlogPost;