import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Header from './components/header';
import BlogPostList from "./components/blogPostList";
import postList from "./data/posts.json";
import Footer from "./components/footer";
import './styles/archive.css';


function Archive() {

	const navigate = useNavigate();
	const navigateToCS = () => navigate('/');
	const navigateToTech = () => navigate('/');
	const navigateToLifestyle= () => navigate('/');
	const navigateToFitness = () => navigate('/');

	return (
		<div>
		<div className="blogs_ui">
			<Header/>
			<div className="blogs_header">
				<a className="blogs_header_topiclink" onClick={navigateToCS}>CS & Maths</a>
				<a className="blogs_header_topiclink" onClick={navigateToTech}>Tech</a>
				<a className="blogs_header_topiclink" onClick={navigateToLifestyle}>Lifestyle</a>
				<a className="blogs_header_topiclink" onClick={navigateToFitness}>Fitness</a>
			</div>
			<div className="blogs_break"></div>
			<BlogPostList posts={postList}/>
			<Footer/>
		</div>
		</div>
	);
};

export default Archive;