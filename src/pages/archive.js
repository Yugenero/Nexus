import React, { useEffect } from "react";
import './styles/blogs.css';
import Header from './components/header';
import anime from 'animejs';


function Archive() {
	return (
		<div className="blogs_ui">
			<div className="blogs_header">
				<a className="blogs_header_topiclink">link</a>
				<a className="blogs_header_topiclink">link</a>
				<a className="blogs_header_topiclink">link</a>
				<a className="blogs_header_topiclink">link</a>
			</div>
			<Header/>
			<div className="blogs_body">
				
			</div>
		</div>
	);
};

export default Archive;