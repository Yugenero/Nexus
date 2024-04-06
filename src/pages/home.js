import React from "react";
import { useNavigate } from 'react-router-dom';
import './styles/home.css';
import Register from "./register";
import Header from "./components/header";


function Home() {

	const navigate = useNavigate();
	const navigateToRegister = () => navigate('/register');

	return (
		<div>
			<Header/>
			<div className="home_ui">
				<p className="home_text">BLGR</p>
				<button className="registration_button" onClick={navigateToRegister}>Register</button>
				<button className="login_button" type="submit">Login</button>
			</div>
		</div>
	);
}
export default Home;