import React from "react";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import './styles/register.css';
import GLogin from './components/glogin';
import axios from 'axios';

const clientID = "1003989541364-doeegiq0q8s8q56heqj862ipmfqtqlhn.apps.googleusercontent.com";

function Register() {
	// const [currentState, setState] = initialState; 
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	// event handler for the form submission
	const handleSubmit = (event) => {
		event.preventDefault();
		axios.post('http://localhost:3000/users', {username, email, password})
		.then(result => console.log(result))
		.catch(error => console.log(error))
	}; 

	// navigation routes
	const navigate = useNavigate();
	const goBack = () => {
		navigate('/');
	};

	return (
		<div>
			<button className="registration_navigation_back" onClick={goBack}>
				BACK
			</button>

			<div className="registration">
				<p className="registration_text">Sign In</p>
				<p className="registration_text_terms">
					By creating an account, you agree to our&nbsp; 
					<a className="registration_link" href=""> Terms of Service </a>&nbsp;and&nbsp; 
					<a className="registration_link" href="">Privacy Policy</a>
				</p>
			
				<form className='registration_field' onSubmit={handleSubmit}>
					{/** onChange(arrow methods to set input field) */}
					<input
					type="text" 
					value={username} 
					onChange={(e) => setUsername(e.target.value)} 
					placeholder="Username" />
					<input
					type ="email" 
					value={email} 
					onChange ={(e) => setEmail(e.target.value)} 
					placeholder="Email" />
					<input
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					placeholder="Password" />
					<button className="registration_button" type="submit">Create Account</button>
				</form>
				<hr className="registration_break" />
				<GLogin />
			</div>
		</div>
	);
}

export default Register;