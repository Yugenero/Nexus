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
	const hcRecent = document.querySelector('.hc_recent');
	hcRecent.style.pointerEvents = 'none';
	anime ({
		targets: hcRecent,
		translateX: ['-100%', '0%'],
		duration: 800,
		complete: function() {
			hcRecent.style.pointerEvents = 'auto';
		}
	});
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
