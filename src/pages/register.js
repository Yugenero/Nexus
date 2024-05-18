import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Button, TextField } from '@material-ui/core';
import { Box } from '@material-ui/core';
import { nexusMouseOver, nexusMouseOff } from "./animations/registrationLoginAnimations";
import axios from 'axios';
import './styles/register.css';

function RegistrationField({onUsernameChange, onEmailChange, onPasswordChange}) {
	return(
		<Box
			component="form"
			sx={{
				'& > :not(style)': { m: 1, width: '400px' },
			}}
			noValidate
			autoComplete="off">
			
			<Box mb={2} >
			<TextField className="registration_text_field" label="Username" variant="outlined"
				style={{width: '400px'}}
				onChange={(event) => onUsernameChange(event.target.value)} 
				color="secondary"/>
			</Box> <Box mb={2}>
			<TextField className="registration_text_field" label="Email" variant="outlined" 
				style={{width: '400px'}}
				onChange={(event) => onEmailChange(event.target.value)} 
				color="secondary"/>
			</Box> <Box mb={2}>
			<TextField className="registration_text_field" label="Password" variant="outlined" 
				style={{width: '400px'}}
				onChange={(event) => onPasswordChange(event.target.value)}
				color="secondary" />
			</Box>
    	</Box>
	)
}

function Register(props) {

	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	// navigation routes
	const navigate = useNavigate();
	const goBack = () => {
		navigate('/');
	};

	// event handler for the form submission
	/**
	 * Connect to server (server.js) register a new user
	 * @param {event} event 
	 */
	const handleSubmit = (event) => {
		event.preventDefault();

		// connect to server (server.js) to register a user
		if (!username || !email || !password) {
			console.error('Missing username, or password');
			return;
		}
		if (username.length > 15 || username.length < 3) {
			console.error('Username must be between 3 and 15 characters');
			return;
		}

		axios.post('http://localhost:3000/register', {
			username: username,
			email: email,
			password: password
		})
		.then(response => {
			if (response.data === 'User created successfully') {
				console.log('User ' + username + ' created successfully');
				navigate('/login');
			} else if (response.status === 400) {
				console.error('Missing username or password');
			}
		})
		.catch(error => {
			console.error('Error creating user: ', error);
		});
	}

	// this interesting code is going to be uninteresting soon

	useEffect(() => {
        const registrationVisual = document.querySelector('.registration_visual');
		const nexus_text = document.querySelector('.nexus_text');
		const textField = document.querySelector('.registration_text_field');
		const originalColor = getComputedStyle(registrationVisual).backgroundColor;

        document.querySelector('.nexus').addEventListener('mouseenter', () => {
            nexusMouseOver(registrationVisual, nexus_text);
        });
        document.querySelector('.nexus').addEventListener('mouseleave', () => {
            nexusMouseOff(registrationVisual, nexus_text, originalColor);
        });
		textField.addEventListener('focus', () => {
			nexusMouseOver(registrationVisual, nexus_text);
		})
    }, []);

	return (
		<div className="registration_container">
		<div className="registration_visual">

			<div className="registration_visual_overlay">
				<h1 className="nexus">Nexus</h1>
				<p className="nexus_text">
					A Personal and Developer Blog
					<p>© 2024 Nelson Rodriguez</p>
				</p>
			</div>

		</div>
		<div className="registration_elements">
			<div className="registration_form_container">
				
				{/** registration request */}
				<p className="form_container_text"> Sign In </p>
					<RegistrationField 
						onUsernameChange={setUsername}
						onEmailChange={setEmail}
						onPasswordChange={setPassword}
						/>
					<Button 
					style={{color: 'var(--accent-color-darkblue)'}}
					type="submit" variant="outlined" onClick={handleSubmit}>
						Create An Account
					</Button>

				{/** buttons */}
				<Box mt={1}>
					<Button 
						variant="outlined" 
						className="back_button"
						style={{width: '400px', color: 'var(--accent-color-darkred)'}}
						onClick={goBack}
						>
						Back
					</Button> 
				</Box>

				<Link className="login" to={'/login'}> 
					Or click here to Log In 
				</Link>
			</div>
		</div>
		</div>


	);
}

// finding out the nature of the universe

export default Register;