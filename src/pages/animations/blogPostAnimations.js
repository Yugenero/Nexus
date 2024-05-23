import anime from 'animejs';

function heartScale() {
	anime({
		targets: '.heart_icon',
		scale: [1, 1.3],
		duration: 500,
		direction: 'alternate',
		loop: 1
	})
}

export {heartScale};