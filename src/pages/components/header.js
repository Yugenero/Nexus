import React from "react";
import { useNavigate } from 'react-router-dom';
import '../styles/home.css';

// create header component to return to the home.js file
function Header() {

	const navigate = useNavigate();
	const navigateToHome = () => navigate('/');
	const navigateToRegister = () => navigate('/register');
	const navigateToBlogs = () => navigate('/archive');
	const navigateToAbout = () => navigate('/about');
	const navigateToMembership = () => navigate('/membership');

	return (
		<div className="header">	
			<a className="header_logo" onClick={navigateToHome}>BLGR</a>
			<div className="header_nav">
				<a className="header_link" onClick={navigateToBlogs}> Archive </a>
				<a className="header_link" onClick={navigateToMembership}> Membership </a>
				<a className="header_link" onClick={navigateToAbout}> About </a>
				<a className="header_link" onClick={navigateToRegister}> Account </a>
			</div> {/**the interesting thing about the nature of the universe */}
		</div>
	);
}

export default Header;