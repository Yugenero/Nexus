import React, { useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Link, IconButton } from '@material-ui/core';
import BlogPostRecent from "./components/blogPostRecent";
import Header from "./components/header";
import Footer from "./components/footer";
import posts from "./components/blogPostData";
import anime from 'animejs';
import './styles/home.css';
import { LinkSharp } from "@material-ui/icons";
import { Cursor } from "mongoose";

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
	v_break: {
		height: '100%',
		borderRight: '1px solid var(--break-color)',
		margin: '0 15px',
	},
	view_all: {
		fontSize: '0.8em',
		fontWeight: 'normal',
		'&:hover': {
			cursor: 'pointer',
			textDecoration: 'underline',
		},
	},
}));

function Home() {

	// get the styles
	const classes = styles();
	// get most recent blog post data
	const recentPost0 = posts[posts.length - 1];
	const recentPost1 = posts[posts.length - 2];
	const recentPost2 = posts[posts.length - 3];
	const recentPost3 = posts[posts.length - 4];

	// navigation routes
	const navigate = useNavigate();
	const navigateToRegister = () => navigate('/register');
	const navigateToBlogs = () => navigate('/archive');
	const footerRef = useRef(null);
	const scrollToFooter = () => footerRef.current.scrollIntoView({behavior: 'smooth'});

	/**
	 * recall that useEffect is used for operations that dont normally fit the
	 * render and return cycle: only play the animation once
	 */
	useEffect(() => {
		anime({
			targets: '.hc',
			translateY: ['100%', '0%'],
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

				<Link className="hc_recent" href="" style={{textDecoration: 'none'}}>
					<img className="hc_recent_img" src={recentPost0.imgUrl}/>
					<div className="hc_recent_text">
						<p className={classes.hc_text_title}> {recentPost0.title} </p>
						<p className={classes.hc_text_excerpt}> {recentPost0.excerpt} </p>
						<p className={classes.hc_text_data}> {recentPost0.date} • <a className={classes.hc_me} href=""> {recentPost0.author} </a> </p>
					</div>
				</Link>

				<div className={classes.break}> </div>

				<div className="hc_recent_container">
					<div className="hc_recent_title">
						<p> Most Recent 
							<a className={classes.view_all} onClick={navigateToBlogs}>View All</a> 
						</p> 
					</div>
					<div className="hc_recent_links">
						<BlogPostRecent recentPost={recentPost1} />
						<div className={classes.v_break}></div>
						<BlogPostRecent recentPost={recentPost2} />
						<div className={classes.v_break}></div>
						<BlogPostRecent recentPost={recentPost3} />
					</div>
				</div>
				</div>
			</div>

			<Footer/>

		</div>
	);
}
export default Home;