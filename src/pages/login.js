import { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Box } from '@material-ui/core';
import anime from 'animejs';

function Login() {

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');

	const handleSubmit = (event) => {
		event.preventDefault();
		console.log(username + " " + password + " " + email);
	
	}

	return (
		<div className='login_container'>
			<div className='form_submission_container'>
				<Box>
					<TextField className="login_field" variant='outlined' />
					<TextField className="login_field" variant='outlined' />
					<TextField className="login_field" variant='outlined' />
						

					<Button onClick={handleSubmit}> Login </Button>
				</Box>
			</div>
		</div>
	)	
};

export default Login;