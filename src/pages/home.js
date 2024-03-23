import React from "react";
import { useHistory } from 'react-router-dom';
import { useState } from "react";
import './styles/home.css';
import Register from "./register";


function Home() {

	return (
		<div className="home_ui">
			<p className="home_text">BLGR</p>
			<a href="/src/pages/register.js">
  				<button id="registration_button">Register</button>
			</a>	
			<button className="login_button" type="submit">Login</button>
		</div>
	);
}
export default Home;