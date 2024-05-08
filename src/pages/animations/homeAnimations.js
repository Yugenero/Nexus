import anime from 'animejs/lib/anime.es.js';

function animateImage() {
	anime ({
		targets: '.hc_recent',
		scale: 1.1,
		
	})
} function resetAnimateImage() {
	anime ({
		targets: '.hc_recent',
		scale: 1,
	})
}

export { animateImage, resetAnimateImage };
