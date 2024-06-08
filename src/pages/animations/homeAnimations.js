import anime from 'animejs/lib/anime.es.js';
import '../styles/home.css';

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

function linkSlideIn() {
	window.onload = function() {
		const hcRecent = document.querySelector('.hc_recent');
		if (hcRecent) {
			hcRecent.style.pointerEvents = 'none';
			anime({
				targets: hcRecent,
				translateX: ['-100%', '0%'],
				rotate: [90, 0],
				duration: 1000,
				complete: function() {
					hcRecent.style.pointerEvents = 'auto';
				}
			});
		}
	}

	}

function scaleRecent(selector) {
    const element = document.querySelector(selector);
    anime({
        targets: element,
        scale: 1.1,
    });
}

function resetRecent(selector) {
    const element = document.querySelector(selector);
    anime({
        targets: element,
        scale: 1,
    });
}

export { animateImage, resetAnimateImage, linkSlideIn };
export { scaleRecent, resetRecent };
