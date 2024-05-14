import anime from 'animejs';

function nexusMouseOver(registrationVisual, nexus_text) {
	anime({
		targets: registrationVisual,
		backgroundColor: '#ffffff',
		duration: 500,
		easing: 'linear'
	});
	anime({
		targets: nexus_text,
		color: '#000000',
		duration: 500,
		easing: 'linear'
	});
}

function nexusMouseOff(registrationVisual, nexus_text, originalColor) {
	anime({
		targets: registrationVisual,
		backgroundColor: originalColor, // reset to original color
		duration: 500,
		easing: 'linear'
	});
	anime({
		targets: nexus_text,
		color: '#ffffff',
		duration: 500,
		easing: 'linear'
	});
}


function loading() {
	anime({
	  targets: '.loading',
	  rotate: '1turn',
	  loop: true,
	  easing: 'linear',
	});
  }

export { nexusMouseOver, nexusMouseOff, loading };

