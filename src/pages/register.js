import React, { useEffect } from "react";
import anime from 'animejs/lib/anime.es.js';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Button, TextField } from '@material-ui/core';
import { Box } from '@material-ui/core';
import { nexusMouseOver, nexusMouseOff } from "./animations/registrationAnimations";
import axios from 'axios';
import './styles/register.css';

const clientID = "1003989541364-doeegiq0q8s8q56heqj862ipmfqtqlhn.apps.googleusercontent.com";

function RegistrationField(onUsernameChange, onEmailChange, onPasswordChange) {
	return(
		<Box
			component="form"
			sx={{
				'& > :not(style)': { m: 1, width: '400px' },
			}}
			noValidate
			autoComplete="off">
			
			<Box mb={2} >
			<TextField id="registration_text_field" label="Username" variant="outlined"
				style={{width: '400px'}}
				onSubmit={(event) => onUsernameChange(event.target.value)} 
				color="secondary"/>
			</Box> <Box mb={2}>
			<TextField id="registration_text_field" label="Email" variant="outlined" 
				style={{width: '400px'}}
				onSubmit={(event) => onEmailChange(event.target.value)} 
				color="secondary"/>
			</Box> <Box mb={2}>
			<TextField id="registration_text_field" label="Password" variant="outlined" 
				style={{width: '400px'}}
				onSubmit={(event) => onPasswordChange(event.target.value)}
				color="secondary" />
			</Box>
    	</Box>
	)
}

function Register() {

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

	useEffect(() => {
        const registrationVisual = document.querySelector('.registration_visual');
		const nexus_text = document.querySelector('.nexus_text');
		const originalColor = getComputedStyle(registrationVisual).backgroundColor;

        document.querySelector('.nexus').addEventListener('mouseenter', () => {
            nexusMouseOver(registrationVisual, nexus_text);
        });

        document.querySelector('.nexus').addEventListener('mouseleave', () => {
            nexusMouseOff(registrationVisual, nexus_text, originalColor);
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
				<p className="form_container_text"> Sign In </p>
				<RegistrationField 
					onUsernameChange={setUsername}
					onEmailChange={setEmail}
					onPasswordChange={setPassword}
					/>
				<Button variant="outlined" 
					onClick={handleSubmit}>
					Create An Account
				</Button>
				<Box mt={1}>
					<Button 
						variant="outlined" 
						className="back_button"
						style={{width: '400px'}}
						onClick={goBack}
						>
						Back
					</Button> 
				</Box>
			</div>
		</div>
		</div>
	);
}

export default Register;