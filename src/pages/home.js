import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import BlogPostRecent from "./components/blogPostRecent";
import Header from "./components/header";
import Footer from "./components/footer";
import postList from "./data/posts.json";
import { animateImage, resetAnimateImage } from "./animations/homeAnimations";
import { linkSlideIn } from "./animations/homeAnimations";
import axios from 'axios';
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
		color: 'var(--primary-color-light)',
		fontFamily: 'var(--font-family-text)',
	},
	hc_me : {	
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
	// navigation routes
	const navigate = useNavigate();
	const navigateToBlogs = () => navigate('/archive');
	const classes = styles();

	// get most recent blog post data
	const recentPost0 = postList[postList.length - 1];
	const recentPost1 = postList[postList.length - 2];
	const recentPost2 = postList[postList.length - 3];
	const recentPost3 = postList[postList.length - 4];

	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [username, setUsername] = useState('');
  	const [loading, setLoading] = useState(true);

	const checkLoginStatus = async () => {
		try {
			const response = await axios.get('http://localhost:3000/isLoggedIn');
			setIsLoggedIn(response.data.isLoggedIn);
			setUsername(response.data.username);
			setLoading(false);
		} catch (error) {
			console.error('Error checking login status:', error);
			setLoading(false);
		}
	};
	
	useEffect(() => {
		checkLoginStatus();
	}, []);

	useEffect(() => {
		linkSlideIn();
	}, [])
	
	if (loading) {
		// return blank page (or loading animation)
		return <div></div>
	}
	
	return (
		<div>
			<Header isLoggedIn={isLoggedIn} username={username}/>
			<div className="home_ui_container">
				<div className="hc">

				<Link className="hc_recent" to={`/p/${recentPost0.id}`}
				onMouseEnter={animateImage}
				onMouseLeave={resetAnimateImage}
				style={{textDecoration: 'none'}}> 
					<img className="hc_recent_img" src={recentPost0.imgURL} />
					<div className="hc_recent_text">
						<p className={classes.hc_text_title}> {recentPost0.title} </p>
						<p className={classes.hc_text_excerpt}> {recentPost0.excerpt} </p>
						<p className={classes.hc_text_data}> {recentPost0.date} • <span className={classes.hc_me} href=""> {recentPost0.author} </span> </p>
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