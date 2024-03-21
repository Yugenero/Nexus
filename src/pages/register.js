import React from "react";
import { useState } from "react";
import './styles/register.css';
import axios from 'axios';

function Register() {
	// const [currentState, setState] = initialState; 
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	// event handler for the form submission
	const handleSubmit = (event) => {
		event.preventDefault();
		axios.post('http://localhost:3001/users', {username, email, password})
		.then(result => console.log(result))
		.catch(error => console.log(error))
	}; 
	

	return (
		<div>
		<p className="registration_text">Register with email</p>
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
			 placeholder="Email " />
			<input
			 type="password"
			 value={password}
			 onChange={(e) => setPassword(e.target.value)}
			 placeholder="Password" />
			<button className="registration_button" type="submit">Login</button>
		</form>
		</div>
	);
}

export default Register;