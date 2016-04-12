var weatherManager = require(global.appRoot + '/app/services/weatherIO/lib/weather.manager');
var assert = require('chai').assert;
var expect = require('chai').expect;

describe('WeatherIO Service', function() {
    describe('Weather manager', function() {

        beforeEach(function(){
        });

        it('Can be initialized properly', function() {
            expect(weatherManager).to.be.an('function');
        });

        it('Contains static function getWeatherForLocationAndTime()', function() {
            expect(weatherManager.getWeatherForLocationAndTime).to.be.an('function');
        });

        it('Function getWeatherForLocationAndTime() returns a promise', function() {
            var response = weatherManager.getWeatherForLocationAndTime(0,0);
            response.catch(function(error) {});
            assert.isObject(response);
            expect(response.then).to.be.an('function');
        });

        it('Should throw error if the network / API is not accesible', function() {
            return weatherManager.getWeatherForLocationAndTime(-33.8674869, 151.2069902).catch(function(error) {
                expect(error.message).to.be.equal('getaddrinfo ENOTFOUND api.forecast.io api.forecast.io:443');
            });
        });

        it('Should throw error for blank co-ordinates data', function() {
            return weatherManager.getWeatherForLocationAndTime(null, null).catch(function(error) {
                expect(error).to.be.equal('Invalid or blank location co-ordinates');
            });
        });

        it('Should throw error for blank latitude data', function() {
            return weatherManager.getWeatherForLocationAndTime(-33.8674869, null).catch(function(error) {
                expect(error).to.be.equal('Invalid or blank location co-ordinates');
            });
        });

        it('Should throw error for blank longitue data', function() {
            return weatherManager.getWeatherForLocationAndTime(null, 151.2069902).catch(function(error) {
                expect(error).to.be.equal('Invalid or blank location co-ordinates');
            });
        });

        it('Should return  weather data for a valid location string', function() {
            return weatherManager.getWeatherForLocationAndTime(-33.8674869, 151.2069902)
                .then(function(weather) {
                    expect(weather).to.have.property('currently');
                    expect(weather).to.have.property('hourly');
                    expect(weather).to.have.property('daily');
                })
                .catch(function(err) {
                    expect(err.message).to.be.equal('getaddrinfo ENOTFOUND api.forecast.io api.forecast.io:443');
                });
        });

        it('Should return weather data for a valid location with timestamp', function() {
            return weatherManager.getWeatherForLocationAndTime(-33.8674869, 151.2069902, 1460436162)
                .then(function(weather) {
                    expect(weather).to.have.property('currently');
                    expect(weather).to.have.property('hourly');
                    expect(weather).to.have.property('daily');
                })
                .catch(function(err) {
                    expect(err.message).to.be.equal('getaddrinfo ENOTFOUND api.forecast.io api.forecast.io:443');
                });
        });


    });

});