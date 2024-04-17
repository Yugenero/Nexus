import React, { useEffect } from "react";
import anime from 'animejs';
import { useNavigate } from 'react-router-dom';
import Header from "./components/header";
import Footer from "./components/footer";
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
			targets: '.home_ui',
			translateY: 250,
		});
	});


	//  return the home ui component
	return (
		<div>
			<Header/>
			<div className="home_ui">
				<p className="home_text">Welcome to my blog</p>
				<div className="home_break"></div>
				<button className="home_button_register" onClick={navigateToRegister}>
					Connect with me
				</button>
			</div>
			<Footer/>
		</div>
	);
}
export default Home;