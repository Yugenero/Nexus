import React from "react";
import { useState } from "react";
import './styles/home.css';

function Home() {
	return (
		<div className="home_ui">
			<p className="home_text">Welcome to the Home Page</p>
			<button className="home_registration" type="submit">Login</button>
		</div>

	);
}

export default Home;