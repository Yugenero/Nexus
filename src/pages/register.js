import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, IconButton, InputAdornment } from '@material-ui/core';
import { Box } from '@material-ui/core';
import { RegistrationFailedPop } from "./components/popOvers";
import { nexusMouseOver, nexusMouseOff } from "./animations/registrationLoginAnimations";
import axios from 'axios';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import './styles/register.css';

function RegistrationField({onUsernameChange, onEmailChange, onPasswordChange, onFocus}) {
	const [showPassword, setShowPassword] = useState(false);
	const handleClickShowPassword = () => {
		setShowPassword(!showPassword);
	};
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
				onFocus={onFocus}
				onChange={(event) => onUsernameChange(event.target.value)} 
				color="secondary"/>
			</Box> <Box mb={2}>
			<TextField className="registration_text_field" label="Email" variant="outlined" 
				style={{width: '400px'}}
				onFocus={onFocus}
				onChange={(event) => onEmailChange(event.target.value)} 
				color="secondary"/>
			</Box> <Box mb={2}>
			<TextField className="registration_text_field" label="Password" variant="outlined" type={showPassword ? "text" : "password"}
				style={{width: '400px'}}
				onFocus={onFocus}
				InputProps={{
					endAdornment: (
					  <InputAdornment position="end">
						<IconButton onClick={handleClickShowPassword}>
						  {showPassword ? <Visibility /> : <VisibilityOff />}
						</IconButton>
					  </InputAdornment> ),
				}}
				onChange={(event) => onPasswordChange(event.target.value)}
				color="secondary" />
			</Box>
    	</Box>
	)
}

function Register() {

	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [open, setOpen] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');


	const handleClose = () => {
		setOpen(false);
	}

	// navigation routes
	const navigate = useNavigate();
	const goBack = () => {
		navigate('/');
	};

	const handleFocus = () => {
		const visual = document.querySelector('.registration_visual');
		const text = document.querySelector('.nexus_text');
		const nexus = document.querySelector('.nexus');
		nexusMouseOver(visual, text, nexus);
	}


	// event handler for the form submission
	/**
	 * Connect to server (server.js) register a new user
	 * @param {event} event 
	 */
	const handleSubmit = (event) => {
		event.preventDefault();

		// connect to server (server.js) to register a user
		if (!username || !email || !password) {
			console.error('Missing username, email, or password');
			setErrorMessage('Missing username, email, or password');
			setOpen(true);
			return;
		}
		if (username.length > 15 || username.length < 3) {
			console.error('Username must be between 3 and 15 characters');
			setErrorMessage('Username must be between 3 and 15 characters');
			setOpen(true);
			return;
		} 
		if (password.length < 6) {
			console.error('Password must be at least 6 characters');
			setErrorMessage('Password must be at least 6 characters');
			setOpen(true);
			return;
		}
		let gmailRegex = /^[^\s@]+@(gmail|googlemail)\.com$/;
		if (!gmailRegex.test(email)) {
			console.error('Invalid gmail');
			setErrorMessage('Invalid gmail');
			setOpen(true);
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
			}
		})
		.catch(error => {
			if (error.response && error.response.status === 400) {
				console.error('Username already taken or email already taken');
				setErrorMessage('Username already taken or email already taken');
			} else {
				console.error('Error creating user: ', error);
				setErrorMessage('Error creating user: ' + error);
			}
			setOpen(true);
		});
	}

	// this interesting code is going to be uninteresting soon

	useEffect(() => {
        const registrationVisual = document.querySelector('.registration_visual');
		const nexus_text = document.querySelector('.nexus_text');
		const nexus = document.querySelector('.nexus');
		const originalColor = getComputedStyle(registrationVisual).backgroundColor;

        document.querySelector('.nexus').addEventListener('mouseenter', () => {
            nexusMouseOver(registrationVisual, nexus_text, nexus);
        });
        document.querySelector('.nexus').addEventListener('mouseleave', () => {
            nexusMouseOff(registrationVisual, nexus_text, originalColor, nexus);
        });
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

				<RegistrationFailedPop open={open} handleClose={handleClose} errorMessage={errorMessage}/>
				
				{/** registration request */}
				<p className="form_container_text"> Sign In </p>
					<RegistrationField 
						onUsernameChange={setUsername}
						onEmailChange={setEmail}
						onPasswordChange={setPassword}
						onFocus={handleFocus}
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
						onClick={goBack}>
						Back
					</Button> 
				</Box>

				<Link className="login" to={'/login'}> 
					<p className="login_text">Or click here to Log In </p>
				</Link>
			</div>
		</div>
		</div>


	);
}

// finding out the nature of the universe

export default Register;