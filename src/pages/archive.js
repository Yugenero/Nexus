import React, { useState, useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom';
import Header from './components/header';
import postList from "./data/posts.json";
import Footer from "./components/footer";
import { blogNavPop, blogPostListScale, blogPostListReset } from "./animations/archiveAnimations";
import { blogListPop, spanScale, spanReset } from "./animations/archiveAnimations";
import axios from "axios";
import './styles/archive.css';

/**
 * create blog post list with posts as parameter
 * @param {posts} param0 
 * @returns list of blog posts
 */
function BlogPostList({ posts, filterCategory }) {

	useEffect(() => {
		blogListPop();	
	});

	const filteredPosts = posts
		.filter(post => filterCategory ? post.category === filterCategory : true)
		.sort((a, b) => b.id - a.id);	
	blogListPop();	

	return (	
		<div className="blog_post_list">
			{/** create an array of link components */}
			{filteredPosts.map(post => (
				<>
				<Link className="blog_post_list_link" key={post.id} to={`/p/${post.id}`} 
					onMouseEnter={blogPostListScale}
					onMouseLeave={blogPostListReset}>
					{/**alt incase user cant see img */}
					<img className="blog_post_list_link_img" src={post.imgURL} alt={post.title} /> 
					<div className="blog_post_list_link_text">
						<p className="bpl_title">{post.title}</p>
						<p className="bpl_excerpt">{post.excerpt}</p>
						<p className="bpl_footer">{post.date} • <span>{post.author}</span></p>
					</div>
					
				</Link>
				<div className="line_break"></div>
			</>
			))}
		</div>
	);
};


function Archive( {status, user }) {

	const [category, setCategory] = useState(null);

	const navigateToAll = () => setCategory(null);
	const navigateToDev = () => setCategory('Dev');
	const navigateToTech = () => setCategory('Tech');
	const navigateToLifestyle= () => setCategory('Lifestyle');
	const navigateToFitness = () => setCategory('Fitness');

	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [username, setUsername] = useState('');
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
		blogNavPop();
	}, [])
	useEffect(() => {
		checkLoginStatus();
	}, []);
	
	if (loading) {
		// return blank page (or loading animation)
		return <div></div>
	}

	return (
		<div>
		<div className="blogs_ui">
			<Header isLoggedIn={isLoggedIn} username={username}/> 				
				<div className="blog_nav">
					<a className="blog_nav_topic" onClick={navigateToAll}
						onMouseEnter={spanScale}
						onMouseLeave={spanReset}>
						<span className="nav_topic">All</span></a>
					<a className="blog_nav_topic" onClick={navigateToDev}
						onMouseEnter={spanScale}
						onMouseLeave={spanReset}>
						<span className="nav_topic">Dev</span></a>
					<a className="blog_nav_topic" onClick={navigateToTech}
						onMouseEnter={spanScale}
						onMouseLeave={spanReset}>
						<span className="nav_topic">Tech</span></a>
					<a className="blog_nav_topic" onClick={navigateToFitness}
						onMouseEnter={spanScale}
						onMouseLeave={spanReset}>
						<span className="nav_topic">Fitness</span></a>
					<a className="blog_nav_topic" onClick={navigateToLifestyle}
						onMouseEnter={spanScale}
						onMouseLeave={spanReset}>
						<span className="nav_topic">Lifestyle</span></a>
				</div>
			<BlogPostList posts={postList} className="bpl" filterCategory={category}/>
			<Footer/>
		</div>
		</div>
	);
};

export default Archive;