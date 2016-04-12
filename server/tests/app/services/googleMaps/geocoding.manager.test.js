var geocodingManager = require(global.appRoot + '/app/services/googleMaps/lib/geocoding.manager');
var assert = require('chai').assert;
var expect = require('chai').expect;

describe('GoogleMaps Service', function() {
    describe('Geocoding manager', function() {

        beforeEach(function(){
        });

        it('Can be initialized properly', function() {
            expect(geocodingManager).to.be.an('function');
        });

        it('Contains static function getGeocodesForLocation()', function() {
            expect(geocodingManager.getGeocodesForLocation).to.be.an('function');
        });

        it('Function getGeocodesForLocation() returns a promise', function() {
            var response = geocodingManager.getGeocodesForLocation('Sydney');
            response.catch(function(error) {});
            assert.isObject(response);
            expect(response.then).to.be.an('function');
        });

        it('Should throw error if the network / API is not accesible', function() {
            return geocodingManager.getGeocodesForLocation('Sydney').catch(function(error) {
                expect(error.message).to.be.equal('getaddrinfo ENOTFOUND maps.googleapis.com maps.googleapis.com:443');
            });
        });

        it('Should throw error for blank location data', function() {
            return geocodingManager.getGeocodesForLocation('').catch(function(error) {
                expect(error).to.be.equal('Invalid or blank location address');
            });
        });

        it('Should throw error for invalid location data', function() {
            return geocodingManager.getGeocodesForLocation('test').catch(function(error) {
                if (error.message !== 'getaddrinfo ENOTFOUND maps.googleapis.com maps.googleapis.com:443') {
                    expect(error).to.be.equal('Invalid or blank location address');
                }
            });
        });

        it('Should return location for data for a valid location string', function() {
            var expectedResponse = { lat: -33.8674869, lng: 151.2069902 };
            return geocodingManager.getGeocodesForLocation('Sydney').then((location) => {
                expect(location).to.deep.equal(expectedResponse);
            }).catch(function(err) {
                expect(err.message).to.be.equal('getaddrinfo ENOTFOUND maps.googleapis.com maps.googleapis.com:443');
            });
        });

    });

});