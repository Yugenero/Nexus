import anime from 'animejs/lib/anime.es.js';


/**
 * Blog Navigation
 */
function blogNavPop() {
	anime ({
		targets: '.blog_nav_container',
		translateX: ['-100%', '20%'],
		duration: 800,
	});
};

function spanScale(event) {
	anime({
		targets: event.currentTarget.querySelector('.nav_topic'),
		scale: 1.2,
		duration: 200,
		easing: 'easeInOutQuad',
	})
}

function spanReset(event) {
	anime({
		targets: event.currentTarget.querySelector('.nav_topic'),
		scale: 1,
		duration: 200,
		easing: 'easeInOutQuad',
	})
}

/**
 * Blog Post List
 */
function blogListPop() {
	anime({
		targets: '.blog_post_list',
		translateY: ['100%', '0%'],
		duration: 800,
	});
};

/**
 * @param {event} event 
 * scale event for selected target
 */
function blogPostListScale(event) {
	anime({
		targets: event.currentTarget.querySelector('.blog_post_list_link_img'),
		scale: 1.1,
		duration: 200,
		easing: 'easeInOutQuad',
	})
} function blogPostListReset(event) {
	anime({	
		targets: event.currentTarget.querySelector('.blog_post_list_link_img'),
		scale: 1,
		duration: 200,
		easing: 'easeInOutQuad',
	})
}

export { blogNavPop, spanScale, spanReset }; 
export { blogListPop, blogPostListScale, blogPostListReset };