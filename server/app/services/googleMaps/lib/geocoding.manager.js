'use strict';

const request = require('request');
const Promise = require('bluebird');


class GeocodingManager {

    /**
     * Gets the Geocoding informatino (Lat and Long) for an address
     *
     * @param locationAddress
     * @returns {*}
     */
    static getGeocodesForLocation(locationAddress) {
        if (!locationAddress) {
            return Promise.reject('Invalid or blank location address');
        }

        if (global.config.GoogleMaps &&  global.config.GoogleMaps.GeoLocation.AddressURL) {
            var parsedUrl = global.config.GoogleMaps.GeoLocation.AddressURL.replace('##',encodeURIComponent(locationAddress)),
                options   = {
                    url: parsedUrl
                };

            return new Promise((resolve, reject) => {
                try {
                    request(options, function(err, res) {
                        if (err || res.statusCode !== 200) {
                            reject(err);
                        } else {
                            var response = JSON.parse(res.body);
                            if (response && response.results && response.results.length > 0) {
                                resolve(response.results[0].geometry.location);
                            }   
                            else {
                                var errorMsg = (response.error) ? response.error : 'Location co-ordinates not found for address';
                                reject(new Error(errorMsg));
                            }
                        }
                    });
                } catch(err) {
                    reject(new Error(err.message));
                }
            });
        }
        else {
            return Promise.reject(new Error('No Configuration found for Google Maps API'));
        }
    }

}

module.exports = GeocodingManager;