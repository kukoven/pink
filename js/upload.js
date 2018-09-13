'use strcit';

(function () {
	const popupSuccess = document.querySelector('.popup--success');
	const popupFailed = document.querySelector('.popup--failed');
	const popupSuccessCloseBtn = document.querySelector('.button--success-close');
	const popupFailedCloseBtn = document.querySelector('.button--failed-close');

	window.upload = function(data, onSuccessUpload, onErrrorUpload) {
		const xhr = new XMLHttpRequest();
		const url = 'https://echo.htmlacademy.ru';
		xhr.responseType = 'json';

		

		xhr.addEventListener('load', function() {
			if (xhr.status == 200) {
				onSuccessUpload(popupSuccess, popupSuccessCloseBtn);
			} else {
				onErrorUpload(popupFailed, popupFailedCloseBtn);
			}
		});

		xhr.open('POST', url);
		xhr.send(data);
	}
})();