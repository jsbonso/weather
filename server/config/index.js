'use strict';

var config = {
	host: 'localhost',
	port: 3000,
	is_server_https: false,
	GoogleMaps: {
		GeoLocation: {
			ApiKey: 'AIzaSyD6TVyMsRKLu-plFD-FC8Bxi7njAiu_xdw',
			AddressURL: 'https://maps.googleapis.com/maps/api/geocode/json?address=##&key=AIzaSyD6TVyMsRKLu-plFD-FC8Bxi7njAiu_xdw'
		}
	},
	WeatherIO: {
		ApiKey: '6c4b7dcfd7f4c836897f961ac5bf0f43',
		LocationURL: 'https://api.forecast.io/forecast/6c4b7dcfd7f4c836897f961ac5bf0f43/LATITUDE,LONGITUDE',
		LocationTimeURL: 'https://api.forecast.io/forecast/6c4b7dcfd7f4c836897f961ac5bf0f43/LATITUDE,LONGITUDE,TIME'
	}
};

module.exports = config;