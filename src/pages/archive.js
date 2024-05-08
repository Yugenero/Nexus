import React, { useState, useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom';
import Header from './components/header';
import postList from "./data/posts.json";
import Footer from "./components/footer";
import { blogNavPop, blogPostListScale, blogPostListReset } from "./animations/archiveAnimations";
import { blogListPop } from "./animations/archiveAnimations";
import './styles/archive.css';

/**
 * create blog post list with posts as parameter
 * @param {posts} param0 
 * @returns list of blog posts
 */
function BlogPostList({ posts, filterCategory }) {

	useEffect(() => {
		blogListPop();	
	})

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


function Archive() {

	const [category, setCategory] = useState(null);

	const navigateToAll = () => setCategory(null);
	const navigateToCS = () => setCategory('CS');
	const navigateToTech = () => setCategory('Tech');
	const navigateToLifestyle= () => setCategory('Lifestyle');
	const navigateToFitness = () => setCategory('Fitness');

	useEffect(() => {
		blogNavPop();
	}, [])

	return (
		<div>
		<div className="blogs_ui">
			<Header/>
			<div className="blog_nav_container">
				<div className="blog_nav">
	
					<a className="blog_nav_topic" onClick={navigateToAll}>
						<span className="nav_topic">All</span></a>
					<a className="blog_nav_topic" onClick={navigateToCS}>
						<span className="nav_topic">CS</span></a>
					<a className="blog_nav_topic" onClick={navigateToTech}>
						<span className="nav_topic">Tech</span></a>
					<a className="blog_nav_topic" onClick={navigateToLifestyle}>
						<span className="nav_topic">Lifestyle</span></a>
					<a className="blog_nav_topic" onClick={navigateToFitness}>
						<span className="nav_topic">Fitness</span></a>
				</div>
			</div>
			<div className="blogs_break"></div>
			<BlogPostList posts={postList} className="bpl" filterCategory={category}/>
			<Footer/>
		</div>
		</div>
	);
};

export default Archive;