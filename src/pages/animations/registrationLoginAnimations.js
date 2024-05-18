import anime from 'animejs';


/**
 * Registration animations
 */
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

/**
 * Login animations
 */

function loginLoadingAnimation() {
	anime({
		targets: '.login_loading',
		rotate: '1turn',
		loop: true,
		easing: 'linear',
		duration: 1000
	})
}

function registrationLoadingAnimation() {
	anime({
		targets: '.registration_loading',
	})
}

export { nexusMouseOver, nexusMouseOff, registrationLoadingAnimation };
export { loginLoadingAnimation }


