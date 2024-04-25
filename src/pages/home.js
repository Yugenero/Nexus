import React, { useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Link, IconButton } from '@material-ui/core';
import Header from "./components/header";
import Footer from "./components/footer";
import posts from "./components/blogPostData";
import anime from 'animejs';
import './styles/home.css';

const styles = makeStyles(() => ({
	hc_text_title: {
		alignItems: 'center',
		margin: '0',
		padding: '12px',
		fontSize: '1.5em',
	},
	hc_text_excerpt: {
		margin: '0',
		padding: '12px',
		fontWeight: 'normal',
	},
	hc_text_data: {
		margin: '0',
		padding: '12px',
		fontSize: '0.6em',
		fontWeight: 'normal',
		color: 'var(--primary-color-light)'
	},
	hc_me : {	
		fontWeight: 'bold',
		color: 'var(--primary-color-light)',
		fontWeight: 'normal',
		textDecoration: 'none',
		'&:hover': {
			textDecoration: 'underline',
		},
	}, 
	break: {
		width: '100%',
		border: '0.001em solid var(--break-color)',
		margin: '30px 0',
	},
}));

function Home() {

	// get the styles
	const classes = styles();
	// get most recent blog post data
	const recentPost = posts[posts.length - 1];

	// navigation routes
	const navigate = useNavigate();
	const navigateToRegister = () => navigate('/register');
	const footerRef = useRef(null);
	const scrollToFooter = () => footerRef.current.scrollIntoView({behavior: 'smooth'});

	/**
	 * recall that useEffect is used for operations that dont normally fit the
	 * render and return cycle: only play the animation once
	 */
	useEffect(() => {
		anime({
			targets: '.hc',
			translateY: ['200%', '0%'],
			duration: 1000,
			// determine speed of animation at different points
			easing: 'easeOutElastic(1, .5)',
		});
	});


	//  return the home ui component
	return (
		<div>
			<Header/>
			<div className="home_ui_container">
				<div className="hc">
				<div className="hc_recent">
					<img className="hc_recent_img" src={recentPost.imgUrl}/>
					<div className="hc_recent_text">
						<p className={classes.hc_text_title}>
							{recentPost.title}
						</p>
						<p className={classes.hc_text_excerpt}>
							{recentPost.excerpt}
						</p>
						<p className={classes.hc_text_data}>
							{recentPost.date} • <a className={classes.hc_me} href="">{recentPost.author} </a>
						</p>
					</div>
				</div>
				<div className={classes.break}></div>
				<div className="hc_recent_links">
				</div>
				</div>

	
				{/*<img className="home_img" src="/images/CS_flow.jpeg" alt="home_img" />*/}
			</div>
			<Footer/>
		</div>
	);
}
export default Home;