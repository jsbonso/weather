'use strict';

const GeocodingManager = require('./lib/geocoding.manager');

class GoogleMapsService {

    /**
     * Exposes the Google Maps Geocoding Manager
     *
     * @returns {GeocodingManager}
     */
    static get GeocodingManager() {
        return GeocodingManager;
    }

}

module.exports = GoogleMapsService;