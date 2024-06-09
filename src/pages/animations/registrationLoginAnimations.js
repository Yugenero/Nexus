import anime from 'animejs';

/**
 * Registration animations
 */
function nexusMouseOver(registrationVisual, nexus_text, nexus) {
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
	anime({
		targets: nexus,
		color: '#A80000',
		duration: 200,
		easing: 'easeInOutSine'
	}) 
}

function nexusMouseOff(registrationVisual, nexus_text, originalColor, nexus) {
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
	anime({
		targets: nexus,
		color: '#ffffff',
		duration: 200,
		easing: 'easeInOutSine'
	}) 
}

/**
 * Login animations
 */

function loginLoadingAnimation() {
	anime({
	  targets: '.login_loading',
      scale: [1, 1.3], // Scale up to 120% then back to 100%
	  rotate: 360, // Rotate a full 360 degrees
      duration: 2000, // Half a second for each pulse
      direction: 'alternate',
      loop: true, // Keep repeating the animation
      easing: 'easeInOutSine' 
	})
	anime({
		targets: '.login_loading_2',
		rotate: 360,
		duration: 1000,
		loop: true,
		easing: 'easeInOutSine',
		endDelay: 1000
	})
}

function registrationLoadingAnimation() {
	anime({
		targets: '.registration_loading',
	})
}

export { nexusMouseOver, nexusMouseOff, registrationLoadingAnimation };
export { loginLoadingAnimation }


