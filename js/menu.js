'use strict';

(function() {
	const mainNav = document.querySelector('.main-nav');
	const navToggle = document.querySelector('.page-logo__toggle');
	const pageLogo = document.querySelector('.page-logo');

	mainNav.classList.remove('main-nav--nojs');
	pageLogo.classList.remove('page-logo--nojs');

	navToggle.addEventListener('click', function(event) {
		if (mainNav.classList.contains('main-nav--closed')) {
			mainNav.classList.remove('main-nav--closed');
			//mainNav.classList.remove('main-nav--to-close');
			mainNav.classList.add('main-nav--opened');
			pageLogo.classList.remove('page-logo--closed');
			pageLogo.classList.add('page-logo--opened');
		} else {
			mainNav.classList.remove('main-nav--opened');
			mainNav.classList.add('main-nav--closed');
			pageLogo.classList.remove('page-logo--opened');
			pageLogo.classList.add('page-logo--closed');
		}
	});
})();