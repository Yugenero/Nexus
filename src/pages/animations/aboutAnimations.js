import anime from 'animejs/lib/anime.es.js';

function slideText() {
	anime ({
		targets: '.text_container',
		translateX: [-1000, 0],
		duration: 800,
	});
}

function slideImage() {
	anime({
		targets: '.me',
		translateY: [1000, 0],
		duration: 1000,
		delay: 250,
	})
}

function gtScale() {
	anime ({
		targets: '.gt',
		scale: [1, 0.9],
		color: '#B3A369',
		direction: 'alternate',
		loop: false,
	})
} function gtUnScale() {
	anime ({
		targets: '.gt',
		scale: [0.9, 1],
		duration: 1000,
		direction: 'alternate',
		loop: false,
	})

}

export { slideText, slideImage, gtScale, gtUnScale };