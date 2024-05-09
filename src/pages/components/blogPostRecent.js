import { makeStyles } from '@material-ui/core/styles';
import { scaleRecent, resetRecent } from '../animations/homeAnimations';
import { Link } from 'react-router-dom';

const styles = makeStyles(() => ({
	hc_container:{
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: '100%',
		height: '80px',
		textDecoration: 'none',
		fontFamily: 'var(--font-family-design)',
		'&:visited': {
			color: 'var(--primary-color)',
		}
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
		fontSize: '0.55em',
	},
	hc_text_data: {
		textAlign: 'left',
		alignSelf: 'flex-start',
		margin: '0',
		fontSize: '0.4em',
		fontWeight: 'normal',
		color: 'var(--primary-color-light)',
		fontFamily: 'var(--font-family-design)',
	},
	hc_img: {
		width: '80px',
		height: '80px',
		borderRadius: '10%',
		objectFit: 'cover',
		margin: '0',
	},
	hc_me: {	
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


function BlogPostRecent({ recentPost }) {
    const classes = styles();
    const id = `hc_container_${recentPost.id}`; // unique id for each BlogPostRecent

    return (
        <Link id={id} className={classes.hc_container} to={`/p/${recentPost.id}`} 
            onMouseEnter={() => scaleRecent(`#${id}`)}
            onMouseLeave={() => resetRecent(`#${id}`)}>
            <div className={classes.hc_container_text}>
                <p className={classes.hc_text_title}> {recentPost.title} </p>
                <p className={classes.hc_text_data}> {recentPost.date} • <a className={classes.hc_me} href="">{recentPost.author} </a> </p>
            </div>
            <img className={classes.hc_img} src={recentPost.imgURL} />
        </Link>
    );
};

export default BlogPostRecent;