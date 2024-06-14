import { useState, useEffect } from 'react';
import { loginLoadingAnimation } from './animations/registrationLoginAnimations';
import { LoginFailedPop } from './components/popOvers';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, IconButton, InputAdornment } from '@material-ui/core';
import { Box } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import axios from 'axios';
import './styles/login.css';

function LoginField() {
	
	const navigate = useNavigate();
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');
	const [isLoading, setIsLoading] = useState(false); // loading animation
	const [open, setOpen] = useState(false); // login pop ups
	const [errorMessage, setErrorMessage] = useState(''); // error message for pop up
	const [showPassword, setShowPassword] = useState(false);

	const handleClickShowPassword = () => {
		setShowPassword(!showPassword);
	}
	
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
		

		axios.post('http://localhost:3000/login', { username, password }, { withCredentials: true })
			.then(response => {
				if (response.status === 200) {
					setErrorMessage('Login successful');
					setOpen(true);
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

	useEffect(() => {
		axios.get('http://localhost:3000/isLoggedIn', { withCredentials: true })
		.then(response => {
			if (response.data.isLoggedIn) {
				console.log(response.data.username + ' is already logged in');
				setErrorMessage('Seems like you\'re already logged in!');
				setOpen(true);
				return;
			}
		})
	}, [])

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
					type={showPassword ? 'text' : 'password'} // Add this line
					style={{color: 'var(--accent-color-darkred)', width: '400px'}}
					InputProps={{
					  endAdornment: (
						<InputAdornment position="end">
						  <IconButton onClick={handleClickShowPassword}>
							{showPassword ? <Visibility /> : <VisibilityOff />}
						  </IconButton>
						</InputAdornment>
					  ),
					}}
					onChange={(event => setPassword(event.target.value))}
					color='secondary'
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


function Logout( {username} ) {

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
				console.log("returning logout status " + false);
				setErrorMessage('You have been logged out');
				navigate('/', { state: { loggedIn: false }});
			}
		})
		.catch(error => {
			console.log("Error destroying session/No active session found)" + error);
			setErrorMessage("Error destroying session/No active session found")
		})
	}
	return (
		<div>
		<LoginFailedPop open={open} handleClose={handleClose} errorMessage={errorMessage}/>
			<h1 className="lo_nexus">Nexus</h1>
			<Button onClick={handleLogout} variant='text'
				style={{
					fontWeight: "600", 
					color: 'var(--accent-color-darkblue)', 
					width: '250px',
					fontFamily: 'var(--font-family-text-gt)'
				}}>
				
				Logout of {username}
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

function Login() {

	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [username, setUsername] = useState('');

	useEffect(() => {
		axios.get('http://localhost:3000/isLoggedIn', { withCredentials: true })
		.then(response => {
			response.data.isLoggedIn ? setIsLoggedIn(true) : setIsLoggedIn(false);
			setUsername(response.data.username);
			setIsLoading(false);
		})
	}, []) // empty array means useEffect only runs once

	if (isLoading) return (
		<div>
			Loading...
		</div>
	)

	return (
		<div className='login_ui'>
			{!isLoggedIn ? (<div> <LoginField/> </div>) :
			(<div> <Logout username={username}/> </div>)}
		</div>
	)
}


export default Login;