'use strict';

(function() {
	const form = document.querySelector('.interview-form');
	const popupSuccess = document.querySelector('.popup--success');
	const popupFailed = document.querySelector('.popup--failed');
	const overlay = document.querySelector('.overlay');
	const formBtn = form.querySelector('.post-form__button');
	const popupSuccessCloseBtn = document.querySelector('.button--success-close');
	const popupFailedCloseBtn = document.querySelector('.button--failed-close');
	const inputTel = document.querySelector('input[name="telephone"]');
	const inputMail = document.querySelector('input[name="mail"]');
	const inputTextTel = document.querySelectorAll('.contacts-form-section__text-for-input--tel');
	const inputTextMail = document.querySelectorAll('.contacts-form-section__text-for-input--mail');

	
	const toInput = function(inputText, className) {
		inputText.forEach(function(it) {
			it.classList.add(className);
		});

		if (event.target.value == '') {
			inputText.forEach(function(it) {
				it.classList.remove(className);
			});		
		}
	};

	inputTel.addEventListener('input', function(event) {
		toInput(inputTextTel, 'contacts-form-section__text-for-input--changed');
	});

	inputMail.addEventListener('input', function(event) {
		toInput(inputTextMail, 'contacts-form-section__text-for-input--changed');
	});


	
	const onPopupPressEsc = function(event) {
		window.utils.isEscPress(event, toClosePopup);
	}

	const onPopupCloseBtnClick = function(event) {
		toClosePopup();
	};

	const toClosePopup = function() {
		if (popupSuccess.classList.contains('popup--show')) {
			popupSuccess.classList.remove('popup--show');
			popupSuccessCloseBtn.removeEventListener('click', onPopupCloseBtnClick);
			document.removeEventListener('keydown', onPopupPressEsc);
		} else {
			popupFailed.classList.remove('popup--show');
			popupFailedCloseBtn.removeEventListener('click', onPopupCloseBtnClick);
			document.removeEventListener('keydown', onPopupPressEsc);	
		}

		overlay.classList.remove('overlay--show');
	}

	const toOpenPopup = function(popup, btn) {
		popup.classList.add('popup--show');
		overlay.classList.add('overlay--show');
		btn.addEventListener('click', onPopupCloseBtnClick);
		document.addEventListener('keydown', onPopupPressEsc);
	};


	formBtn.addEventListener('click', function(event) {
		event.preventDefault();

		if (form.checkValidity()) {
			form.classList.remove('interview-form--validation-error'); 
			window.upload(new FormData(form), toOpenPopup, toOpenPopup);
		} else {
			form.classList.add('interview-form--validation-error');
			toOpenPopup(popupFailed, popupFailedCloseBtn);
		}
	});
})();
