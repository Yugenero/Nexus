import { useState, useEffect } from 'react';
import { loginLoadingAnimation } from './animations/registrationLoginAnimations';
import TextField from '@material-ui/core/TextField';
import { useNavigate } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { Box } from '@material-ui/core';
import axios from 'axios';
import anime from 'animejs';
import './styles/login.css';

function LoginField() {

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const navigate = useNavigate();

	/**
	 * event handler for deleting a user from teh database
	 * figure out how to make this thing work later
	 * @param {event} event 
	 * @returns 
	 */
	const handleDelete = (event) => {
		event.preventDefault();
		if (!username) return console.log('user does not exist in the database'); 

		axios.post('http://localhost:3000/delete', {
			username: username,
			password: password
		})
		.then(response => {
			if (response.status === 200) {
				console.log('User'  + username + ' deleted successfully');
				navigate('/')
			}
		})
		.catch(error => {
			console.log("Error deleting user: " + error);
		})
	}

	const handleSubmit = (event) => {
		event.preventDefault();

		// run animation
		setIsLoading(true);

		// connect to server (server.js) to login a user
		if (!username || !password) {
			console.error('Missing username or password');
			return;
		} 
		if (username.length > 15 || username.length < 3) {
			console.error('Username must be between 3 and 15 characters');
			return;
		}
		axios.post('http://localhost:3000/login', {
			username: username,
			password: password
		})
		.then(response => {
			if (response.status === 200) {
				console.log(username + ' has been logged in')
				setIsLoading(false);
				navigate('/');
			} 
 			if (response.status === 400) console.error('Invalid username or password');
		})
		.catch(error => {
			setIsLoading(false);
			console.log('Error finding user: ', error);
		});
	}

	useEffect(() => {
		if (isLoading) {
			loginLoadingAnimation();
		}
	}, [isLoading]);

	return (
		<Box className='form_submission_container'
				component="form"
				style={{height: '100vh', width: '100vw',
					display: 'flex', flexDirection: 'column',
					justifyContent: 'center'
				}}>

					{/** Form submission container component for user login */}
					<Box mb={1}>						
					<TextField className="login_field" variant='outlined' 
					style={{color: 'var(--accent-color-darkred)', width: '400px'}}
					onChange={(event => setUsername(event.target.value))}
					label="Username"/>
					</Box>

					<Box mb={1}> 
					<TextField className="login_field" variant='outlined' 
					style={{color: 'var(--accent-color-darkred)', width: '400px'}}
					onChange={(event => setEmail(event.target.value))}
					label="Email"/>
					</Box>

					<Box mb={1}>
					<TextField className="login_field" variant='outlined' 
					style={{color: 'var(--accent-color-darkred)', width: '400px'}}
					onChange={(event => setPassword(event.target.value))}
					label="Password"/>
					</Box>

					<Button onClick={handleSubmit}> Login </Button>
					{isLoading && <div className='login_loading'></div>}
			</Box>
	)	
};

/**
 * Note to myself: A bit on prop destructuring
 * Properties is just another word for parameter, they are a proper subset of 
 * parameters that are passed to a function. Passing in props with a curly braces
 * allows you to destructure your props object and access the name of properties directly.
 * Where as passing in props without the curly braces allows you to access the
 * props obj
 * 
 * function Greeting(props) {  return <div>Hello, {props.name}</div>; }
 * 
 * function Greeting({ name }) {  return <div>Hello, {name}</div>; }
 *			is equivalent to let name = props.name
 */

function Login({props}) {


	return (
		<div className='login_ui'>
			<h1 className='title'>Re-enter Information to Login</h1>
			<LoginField/>
		</div>
	)
}


export default Login;