'use strict';

(function() {
	const enterCode = 13;//Enter на клавиатуре
	const escCode = 27;//Esc на клавиатуре
	
	window.utils = {
		//Если нажата кнопка Enter
		isEnterPress: function(event, action) {
			if (event.keyCode == enterCode) {
				action();
			}
		},
		isEscPress: function(event, action) {
			if (event.keyCode == escCode) {
				action();
			}
		}
	}
})();

