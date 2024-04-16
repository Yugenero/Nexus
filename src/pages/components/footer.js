import React from "react";
import { useNavigate } from 'react-router-dom';
import '../styles/home.css';

// create header component to return to the home.js file
function Footer() {

	return (
		<div className="footer">	
			<div className="footer_nav">
				<a className="footer_link" href=""> Archive </a>
				<a className="footer_link" href=""> Membership </a>
				<a className="footer_link" href=""> About </a>
				<a className="footer_link" href=""> Account </a>
			</div>
		</div>
	);
}

export default Footer;