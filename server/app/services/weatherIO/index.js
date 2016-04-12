'use strict';

const WeatherManager = require('./lib/weather.manager');

class WeatherService {

    /**
     * Exposes the weather.io Manager
     *
     * @returns {WeatherManager}
     */
    static get WeatherManager() {
        return WeatherManager;
    }

}

module.exports = WeatherService;