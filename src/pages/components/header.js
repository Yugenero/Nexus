import React from "react";
import { useNavigate } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import ArchiveIcon from '@material-ui/icons/Archive';
import InfoIcon from '@material-ui/icons/Info';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { makeStyles } from '@material-ui/core/styles';
import '../styles/home.css';

// makeStyles hook for custom header styling
const headerStyles = makeStyles((theme) => ({
	header_nav_item: {
		borderRadius: '10%',
		color: 'var(--primary-color)',
		'&:hover' : {
		},
	},
	tooltip: {
		color: 'var(--background-color)',
		backgroundColor: 'var(--primary-color)',
		fontFamily: 'var(--font-family-text)',
		fontSize: '0.8rem', // relative to the root element font size
		border: 'none',
		borderRadius: '10px',
	}
}));

// create header component to return to the home.js file
function Header() {

	const classes = headerStyles();
	const navigate = useNavigate();
	const navigateToHome = () => navigate('/');
	const navigateToRegister = () => navigate('/register');
	const navigateToBlogs = () => navigate('/archive');
	const navigateToAbout = () => navigate('/about');


	return (
		<div className="header">	
			<a className="header_logo" onClick={navigateToHome}>DevBlog</a>
			<div className="header_nav">
			<Tooltip title="Archive" classes={{ tooltip: classes.tooltip }}>
				<IconButton className={classes.header_nav_item} onClick={navigateToBlogs}>
					<ArchiveIcon />
				</IconButton>
			</Tooltip>
			<Tooltip title="About" classes={{ tooltip: classes.tooltip }}>
				<IconButton className={classes.header_nav_item} onClick={navigateToAbout}>
					<InfoIcon />
				</IconButton>
			</Tooltip>
			<Tooltip title="Account" classes={{ tooltip: classes.tooltip }}>
				<IconButton className={classes.header_nav_item} onClick={navigateToRegister}>
					<AccountCircleIcon />
				</IconButton>
        	</Tooltip>
			</div> 
		</div>
	);
}

export default Header;