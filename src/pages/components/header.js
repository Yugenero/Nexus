import React from "react";
import '../styles/home.css';

// create header component to return to the home.js file
function Header() {
	return (
		<div className="header">	
			<a className="header_logo">BLGR</a>
			<div className="header_nav">
				<a className="header_link" href=""> About </a>
				<a className="header_link" href=""> Membership </a>
				<a className="header_link" href=""> Write </a>
				<a className="header_link" href=""> Register/Login </a>
			</div>
		</div>
	);
}

export default Header;