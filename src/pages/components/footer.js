import React from "react";
import { AppBar, Toolbar, Typography, Link, IconButton } from '@material-ui/core';
import InstagramIcon from '@material-ui/icons/Instagram';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import EmailIcon from '@material-ui/icons/Email';
import GitHubIcon from '@material-ui/icons/GitHub';
import { makeStyles } from '@material-ui/core/styles';
import '../styles/home.css';

/**
 * Footer component that utilizes material ui styling
 * @returns Footer component
 */

const useStyles = makeStyles({
	footer: {
		display: 'flex',
		flexDirection: 'row',
		position: 'static',
		fontFamily: 'var(--font-family-text)',
		width:'100vw',
		backgroundColor: 'var(--background-color)',
		justifyContent: 'space-between',
	},
	footerSocialButton: {
		borderRadius: '20%',
	},
	
	socialLinkI: {
		color: 'var(--primary-color)',
		transition: '0.2s',
		'&:hover': {
			color: 'rgb(252, 175, 69)',
			transform: 'translateY(-5px)',
		},
	},socialLinkL: {
		color: 'var(--primary-color)',
		transition: '0.2s',
		'&:hover': {
			color: 'rgb(10, 102, 194)',
			transform: 'translateY(-5px)',
		},
	},socialLinkM: {
		color: 'var(--primary-color)',
		transition: '0.2s',
		'&:hover': {
			color: 'rgb(199, 22, 16)',
			transform: 'translateY(-5px)',
		},
	},socialLinkG: {
		color: 'var(--primary-color)',
		transition: '0.2s',
		'&:hover': {
			color: 'rgb(45, 186, 78)',
			transform: 'translateY(-5px)',
		},
	},
	footerSocialText: {
		userSelect: 'none',
		color: 'var(--primary-color)',
		fontSize: '0.6rem',
		margin: '0',
	},
});

function Footer() {
	const classes = useStyles();
	
	return (
		<AppBar className={classes.footer} position="static">
			<Toolbar className={classes.footer}>
				<div className="footer_logo_container">
				<Typography className="footer_logo" variant="a">DevBlog </Typography>
					<Typography className="footer_logo_text" variant="a"> © 2024 Nelson Rodriguez. All Rights Reserved.
				</Typography>
				</div>
				<div className="footer_socials_container">
					<div className="footer_socials">
						<IconButton className={classes.footerSocialButton}> 
							<Link href="https://www.instagram.com/nero.yugen/" target="_blank" className={classes.socialLinkI}>
								<InstagramIcon />
							</Link>
						</IconButton>
						<IconButton className={classes.footerSocialButton}>
							<Link href="https://www.linkedin.com/in/nelson-rodriguez13/" target="_blank" className={classes.socialLinkL}>
								<LinkedInIcon />
							</Link>
						</IconButton>
						<IconButton className={classes.footerSocialButton}>
							<Link href="mailto:neroxv1313@gmail.com" className={classes.socialLinkM}>
								<EmailIcon />
							</Link>
						</IconButton>
						<IconButton className={classes.footerSocialButton}>
							<Link href="https://github.com/Yugenero" target="_blank" className={classes.socialLinkG}>
								<GitHubIcon />
							</Link>
						</IconButton>
					</div>
					<p className={classes.footerSocialText}>Get in touch with me :)</p>
				</div>
			</Toolbar>
		</AppBar>
	);
}

export default Footer;