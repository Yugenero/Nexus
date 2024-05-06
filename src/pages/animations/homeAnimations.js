import anime from 'animejs/lib/anime.es.js';

function animateImage() {
	anime ({
		targets: '.hc_recent_img',
		rotate: 360,
		translateY: 60,
		scale: 2.2,
		
	})
} function resetAnimateImage() {
	anime ({
		targets: '.hc_recent_img',
		rotate: 0,
		translateY: 0,
		scale: 1,
	})
}

export { animateImage, resetAnimateImage };
