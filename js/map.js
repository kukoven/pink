'use strict';

(function() {
	ymaps.ready(function () {
		const myMap = new ymaps.Map('map' , {
			center: [60.000992, 30.251791],
			zoom: 16,
			controls: []
		}, {
			superMapOpenBlock: true
		}, {
			searchControlProvider: 'yandex#search'
		}),
		myPlacemark = new ymaps.Placemark(([60.000992, 30.251791]), {

		}, {
			//Опции
			//Тип макета
			iconLayout: 'default#image',
			//Своё изображение
			iconImageHref: 'img-min/place-mark.svg',
			//Размеры метки
			iconImageSize: [36, 36],
			//Смещение левого верхнего угла иконки относительно точки привязки
			iconImageOffset: [0, 0]
		});
		myMap.geoObjects.add(myPlacemark);
	  myMap.controls.remove('rulerControl');
	  myMap.controls.remove('searchControl');
	  myMap.controls.remove('trafficControl');
	  myMap.controls.remove('typeSelector');
	  myMap.controls.remove('zoomControl');
	  myMap.controls.remove('geolocationControl');
	  myMap.controls.remove('routeEditor');
	});
})();

