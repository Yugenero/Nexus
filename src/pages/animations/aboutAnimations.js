import anime from 'animejs/lib/anime.es.js';

function slideTitle() {
	anime ({
		targets: '.what_is_nexus',
		translateY: [-200, 0],
		duration: 500,
	});
}

function slideText() {
	anime ({
		targets: '.text_container',
		translateX: [-1000, 0],
		duration: 800,
		delay: 250,
	});
}

function slideImage() {
	anime({
		targets: '.me',
		translateY: [1000, 0],
		duration: 1000,
		delay: 500,
	})
}

function gtScale() {
	anime ({
		targets: '.gt',
		scale: [1, 0.9],
		direction: 'alternate',
		loop: 1,
	})
} function gtUnScale() {
	anime ({
		targets: '.gt',
		scale: [0.9, 1],
		duration: 1000,
		direction: 'alternate',
		loop: 1,
	})

}

export { slideTitle, slideText, slideImage, gtScale, gtUnScale };