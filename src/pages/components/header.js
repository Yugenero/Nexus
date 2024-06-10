import React from "react";
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { useState, useEffect }	from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LoggedInStatus from "./LoggedInStatus";
import '../styles/home.css';

const useStyles = makeStyles((theme) => ({
	header: {
		backgroundColor: 'var(--background-color)',
	},
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
	backgroundColor: 'var(--background-color)',
  },
  nav: {
    display: 'flex',
    gap: theme.spacing(2),
  },
  logo: {
    cursor: 'pointer',
  },
}));

function Header( { isLoggedIn, username } ) {

	const navigate = useNavigate();
	const navigateToHome = () => navigate('/');
	const navigateToRegister = () => navigate('/register');
	const navigateToBlogs = () => navigate('/archive');
	const navigateToAbout = () => navigate('/about'); 
	const classes = useStyles();

	return (
	<AppBar className={classes.header} elevation={5}>	
	<Toolbar className={classes.toolbar}>
		<a className="header_logo" onClick={navigateToHome}>Nexus</a>
		<div className="header_nav">
			<a className="header_nav_item" onClick={navigateToBlogs}>
				Archive
			</a>
			<a className="header_nav_item" onClick={navigateToAbout}>
				About
			</a>
			<a className="header_nav_item" onClick={navigateToRegister}>
				Account
			</a>
			<LoggedInStatus status={isLoggedIn} user={username}/>
		</div>
	</Toolbar>
	</AppBar>
	);
}

export default Header;