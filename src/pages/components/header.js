import React from "react";
import { useNavigate } from 'react-router-dom';
import { useState, useEffect }	from 'react';
import LoggedInStatus from "./LoggedInStatus";
import axios from 'axios';
import '../styles/home.css';

function Header( { isLoggedIn, username } ) {

	const navigate = useNavigate();
	const navigateToHome = () => navigate('/');
	const navigateToRegister = () => navigate('/register');
	const navigateToBlogs = () => navigate('/archive');
	const navigateToAbout = () => navigate('/about'); 

	return (
		<div className="header">	
			<a className="header_logo" onClick={navigateToHome}>Nexus</a>
			<div className="header_nav">
				<a className="header_nav_item" onClick={navigateToBlogs}>
					Archive
				</a>
				<a className="header_nav_item" onClick={navigateToAbout}>
					About
				</a>
				<a className="header_nav_item" onClick={navigateToRegister}>
					Account
				</a>
				<LoggedInStatus status={isLoggedIn} user={username}/>
			</div>
		</div>
	);
}

export default Header;