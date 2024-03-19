import React from "react";
import { useState } from "react";
import './styles/register.css';

function Register() {
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = (event) => {
		event.preventDefault();

		fetch('http://localhost:3002/api/register', {
			method: 'POST',
			headers: {
			  'Content-Type': 'application/json',
			},
			body: JSON.stringify({username, email, password}),
		  })
		  .then(response => {
			// Check if the response was successful
			if (!response.ok) {
			  // If the response was not ok, throw an error
			  throw new Error('Network response was not ok');
			}
		  
			// Otherwise, parse the response as JSON
			return response.json();
		  })
		  .then(data => {
			// handle response
		  })
		  .catch((error) => {
			console.error('Error:', error);
		  });
	};

	return (
		<div>
		<p className="registration_text">Register with email</p>
		<form className='registration_field' onSubmit={handleSubmit}>
			<input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
			<input type ="email" value={email} onChange ={(e) => setEmail(e.target.value)} placeholder="Email " />
			<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
			<button className="registration_button" type="submit">Login</button>
		</form>
		</div>
	);
}

export default Register;