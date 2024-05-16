import { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Box } from '@material-ui/core';
import anime from 'animejs';

function LoginField() {

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

					{/** Form submission container component for user login */}
					<Box>						
					<TextField className="login_field" variant='outlined' 
					style={{color: 'var(--accent-color-darkred)', width: '400px'}}
					label="Username"/>
					</Box>

					<Box>
					<TextField className="login_field" variant='outlined' 
					style={{color: 'var(--accent-color-darkred)', width: '400px'}}
					label="Email"/>
					</Box>

					<Box>
					<TextField className="login_field" variant='outlined' 
					style={{color: 'var(--accent-color-darkred)', width: '400px'}}
					label="Password"/>
					</Box>

					<Button onClick={handleSubmit}> Login </Button>
			</div>
		</div>
	)	
};



/**
 * Note to myself: A bit on prop destructuring
 * Properties is just another word for parameter, they are a proper subset of 
 * parameters that are passed to a function.
 * 
 * function Greeting(props) {  return <div>Hello, {props.name}</div>; }
 * function Greeting({ name }) {  return <div>Hello, {name}</div>; }
 */

function Login({props}) {
	return (
		<div className='login_ui'>
			<LoginField/>
		</div>
	)
}


export default Login;