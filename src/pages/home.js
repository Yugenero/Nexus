import React, { useEffect } from "react";
import anime from 'animejs';
import { useNavigate } from 'react-router-dom';
import Header from "./components/header";
import './styles/home.css';

function Home() {

	// navigation routes
	const navigate = useNavigate();
	const navigateToRegister = () => navigate('/register');

	/**
	 * recall that useEffect is used for operations that dont normally fit the
	 * render and return cycle: only play the animation once
	 */
	useEffect(() => {
		anime({
			targets: '.home_text',
			translatey: -250,
		});
	});


	//  return the home ui component
	return (
		<div>
			<Header/>
			<div className="home_ui">
				<p className="home_text">Stay Connected</p>
				<div className="home_break"></div>
			</div>
		</div>
	);
}
export default Home;