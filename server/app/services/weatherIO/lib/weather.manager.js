'use strict';

const request = require('request');
const Promise = require('bluebird');


class WeatherManager {

    /**
     * Gets the Geocoding informatino Lat and Long for an address filtered by Time
     *
     * @param latitude
     * @param longitude
     * @param dateValue
     * @returns {*}
     */
    static getWeatherForLocationAndTime(latitude, longitude, dateValue) {
        if (!latitude || !longitude) {
            return Promise.reject('Invalid or blank location co-ordinates');
        }

        if (global.config.WeatherIO &&  global.config.WeatherIO.LocationURL &&  global.config.WeatherIO.LocationTimeURL) {
        	var weatherUrl = (dateValue) ? global.config.WeatherIO.LocationTimeURL : global.config.WeatherIO.LocationURL;
            var parsedUrl  = weatherUrl.replace('LATITUDE',latitude);
            parsedUrl      = parsedUrl.replace('LONGITUDE',longitude);
            if (dateValue) {
            	parsedUrl  = parsedUrl.replace('TIME',dateValue);
            }
            var options    = {
                url: parsedUrl
            };

            return new Promise((resolve, reject) => {
            	try {
	                request(options, function(err, res) {
	                    if (err || res.statusCode !== 200) {
	                        reject(err);
	                    } else {
	                        resolve(JSON.parse(res.body));
	                    }
	                });
            	} catch (err) {
            		reject(new Error(err.message));
            	}
            });
        }
        else {
            return Promise.reject(new Error('No Configuration found for Weather.io API'));
        }
    }

}

module.exports = WeatherManager;