import { useState, useEffect } from 'react';
import { loginLoadingAnimation } from './animations/registrationLoginAnimations';
import { LoginFailedPop } from './components/popOvers';
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import { useNavigate } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { Box } from '@material-ui/core';
import axios from 'axios';
import anime from 'animejs';
import './styles/login.css';
import { set } from 'mongoose';

function LoginField() {
	
	const navigate = useNavigate();
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');
	const [isLoading, setIsLoading] = useState(false); // loading animation
	const [open, setOpen] = useState(false); // login failed pop up
	const [errorMessage, setErrorMessage] = useState(''); // error message for pop up
	
	
	const handleCloseLogin = () => {
		setOpen(false);
	}

	const handleSubmit = (event) => {
		event.preventDefault();

		// handle checks for empty fields
		if (!username || !password) {
			console.error('Invalid username or password');
			setErrorMessage('Invalid username or password');
			setOpen(true);
			return;
		} 
		else if (username.length > 20 || username.length < 3) {
			console.error('Username must be between 3 and 15 characters');
			setErrorMessage('Username must be between 3 and 15 characters')
			setOpen(true);
			return;
		}

		axios.get('http://localhost:3000/isLoggedIn', { withCredentials: true })
			.then(response => {
				if (response.data.isLoggedIn) {
					console.log(response.data.username + ' is already logged in');
					setErrorMessage(response.data.username + ' is already logged in');
					setOpen(true);
					return;
				}
		})
		

		axios.post('http://localhost:3000/login', { username, password }, { withCredentials: true })
			.then(response => {
				if (response.status === 200) {
					setErrorMessage('Login successful');
					setOpen(true);
					handleCloseLogin();
					navigate('/', { state: { loggedIn: true } });
				}
			}).catch(error => {
				if (error.response && error.response.status === 409) {
					console.log('User is already logged in');
					setErrorMessage('User is already logged in');
					setOpen(true);
					return;
				} else if (error.response && error.response.status === 400) {
					console.log('Cannot find user');
					setErrorMessage('Cannot find user');
					setOpen(true);
					return;
				} else if (error.response && error.response.status === 401) {
					console.log('Password is incorrect');
					setErrorMessage('Password is incorrect');
					setOpen(true);
					return;
				}	
				console.log("Error finding user in the database");
				setErrorMessage('User not found');
				setIsLoading(false);
			});
	}

	useEffect(() => {
		if (isLoading) {
			loginLoadingAnimation();
		}
	}, [isLoading]);

	return (
		<div>
		<LoginFailedPop open={open} handleClose={handleCloseLogin} errorMessage={errorMessage}/>
			
		<Box className='form_submission_container'
				component="form"
				style={{height: '100vh', width: '100vw',
					display: 'flex', flexDirection: 'column',
					justifyContent: 'center'
				}}>
					<h1 className="title_nexus">Nexus</h1>
					<p className='act'>Don't have an account?&nbsp; 
						<Link to={'/register'} className='register'>Register here!</Link>
					</p>


					{/** Form submission container component for user login */}
					<Box mb={1}>						
					<TextField className="login_field" variant='outlined' 
					style={{color: 'var(--accent-color-darkred)', width: '400px'}}
					color='secondary'
					onChange={(event => setUsername(event.target.value))}
					label="Username"/>
					</Box>

					<Box mb={1}> 
					<TextField className="login_field" variant='outlined' 
					style={{color: 'var(--accent-color-darkred)', width: '400px'}}
					color='secondary'
					onChange={(event => setEmail(event.target.value))}
					label="Email"/>
					</Box>

					<Box mb={1}>
					<TextField className="login_field" variant='outlined' 
					style={{color: 'var(--accent-color-darkred)', width: '400px'}}
					color='secondary'
					onChange={(event => setPassword(event.target.value))}
					label="Password"/>
					</Box>

					<Button onClick={handleSubmit} variant='outlined'
					style={{color: 'var(--accent-color-darkblue)', width: '400px'}}> Login </Button>
					{ isLoading && <div className='login_loading'>
						<div className='login_loading_2'></div>
					</div> }
			</Box>

		</div>

	)	
};


function Logout() {

	const [open, setOpen] = useState(false);	
	const [errorMessage, setErrorMessage] = useState('');	
	const navigate = useNavigate();
	const handleClose = () => {
		setOpen(false);
	}
	
	const handleLogout = (event) => {
		event.preventDefault();
		axios.post('http://localhost:3000/logout', {}, { withCredentials: true })
		.then(response => {
			if (response.status === 200) {
				setErrorMessage('You have been logged out');
				navigate('/');
			}
		})
		.catch(error => {
			console.log("Error destroying session/No active session found)" + error);
			setErrorMessage("Error destroying session/No active session found")
		})
	}
	return (
		<div className='Logout'>
			<LoginFailedPop open={open} handleClose={handleClose} errorMessage={errorMessage}/>
			<Button onClick={handleLogout} variant='outlined'
			style={{color: 'var(--accent-color-darkblue)', width: '400px',
				transform: 'translateY(-205px)'
			}}>
				Logout 
			</Button>
		</div>
	)

}

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
			<LoginField/>
			<Logout/>
		</div>
	)
}


export default Login;