import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles(() => ({
	hc_container:{
		display: 'flex',
		flexDirection: 'row',
		width: '100%',
	},
	hc_container_text: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
		flex: '1',
	},
	hc_text_title: {
		textAlign: 'left', // align text to the left of container
		margin: '0',
		fontSize: '0.7em',
	},
	hc_text_data: {
		alignSelf: 'flex-start',
		margin: '0',
		fontSize: '0.4em',
		fontWeight: 'normal',
		color: 'var(--primary-color-light)'
	},
	hc_img: {
		width: '90px',
		height: '100%',
		borderRadius: '10%',
		objectFit: 'cover',
		margin: '0 ',
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

function BlogPostRecent({ recentPost}) {
	const classes = styles();
	return (
		<div className={classes.hc_container}>
			<div className={classes.hc_container_text}>
				<p className={classes.hc_text_title}> {recentPost.title} </p>
				<p className={classes.hc_text_data}> {recentPost.date} • <a className={classes.hc_me} href="">{recentPost.author} </a> </p>
			</div>
			<img className={classes.hc_img} src={recentPost.imgUrl} />
		</div>
	);
};

export default BlogPostRecent;