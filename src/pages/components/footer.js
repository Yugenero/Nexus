import React from "react";
import { AppBar, Toolbar, Typography, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import '../styles/home.css';

/**
 * Footer component that utilizes material ui styling
 * @returns Footer component with material ui styling
 */

const useStyles = makeStyles({
	footer: {
		display: 'flex',
		position: 'absolute',
		backgroundColor: '#333',
		bottom: 0,
		width:'100vm',
	},
});

function Footer() {
	
	const classes = useStyles();

	return (
		<AppBar className={classes.footer} position="static">
			<Toolbar>
			<Typography variant="h6" color="inherit">
				Footer
			</Typography>
			<Link color="inherit" href="#">
				Link 1
			</Link>
			<Link color="inherit" href="#">
				Link 2
			</Link>
			{/* Add more links as needed */}
			</Toolbar>
  		</AppBar>
	);
}

export default Footer;