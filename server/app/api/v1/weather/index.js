'use strict';

const express   = require('express');
const router    = express.Router();
const moment    = require('moment');
const LocationService = require(global.appRoot + '/app/services/googleMaps');
const WeatherService  = require(global.appRoot + '/app/services/weatherIO');
const dowArray = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday'
];

function calculateDate(inputDoW) {
    var today     = moment(new Date()).format('dddd MMM-DD-YYYY');
    var increment = 0;

    if (inputDoW !== 'today') {
        var currentDoW  = today.split(' ')[0];

        if (dowArray.indexOf(inputDoW) < dowArray.indexOf(currentDoW)) {
            increment = 7 - (dowArray.indexOf(currentDoW) - dowArray.indexOf(inputDoW));
        }
        else {
            if (dowArray.indexOf(inputDoW) > dowArray.indexOf(currentDoW)) {
                increment = dowArray.indexOf(inputDoW) - dowArray.indexOf(currentDoW);
            }
        }
    }

    return (moment().add(increment,'days').format());
}

function formatWeatherTime(weatherObj) {
    weatherObj.currently.time = moment.unix(weatherObj.currently.time).format('ddd, MMM Do YYYY, hh:mm a');
    weatherObj.hourly.data.forEach(function(data) { 
        data.time = moment.unix(data.time).format('hh:mm A');
    });
    weatherObj.daily.data.forEach(function(data) { 
        data.time = moment.unix(data.time).format('ddd, MMM Do');
    });
    return weatherObj;
}

// Scenario One: Display a weather forecast by location
router.use('/:location', function (req, res, next) {
    if (req.url === '/') {
        LocationService.GeocodingManager.getGeocodesForLocation(req.params.location)
        .then((location) => {
            WeatherService.WeatherManager.getWeatherForLocationAndTime(location.lat, location.lng, null)
                .then((weather) => {
                    res.status(200).json(formatWeatherTime(weather));
                })
                .catch((error) => {
                    console.log('Could not get weather data', new Error(error));
                    res.status(500).json({message: 'Could not get weather data', error: error});
                });
        })
        .catch((error) => {
            console.log('Could not get location co-ordinates', new Error(error));
            res.status(500).json({message: 'Could not get location co-ordinates', error: error});
        });
    }
    else
        next();
});

// Scenario Two: Display a weather forecast by location filtered by day
// Scenario Three: Display a weather forecast for today
router.use('/:location/:weekday', function (req, res) {
    LocationService.GeocodingManager.getGeocodesForLocation(req.params.location)
    .then((location) => {
        var dateValue = (req.params.weekday && req.params.weekday.toLowerCase() !== 'today') ? calculateDate(req.params.weekday.toLowerCase()) : null;
        WeatherService.WeatherManager.getWeatherForLocationAndTime(location.lat, location.lng, dateValue)
            .then((weather) => {
                res.status(200).json(formatWeatherTime(weather));
            })
            .catch((error) => {
                console.log('Could not get weather data', new Error(error));
                res.status(500).json({message: 'Could not get weather data', error: error});
            });
    })
    .catch((error) => {
        console.log('Could not get location co-ordinates', new Error(error));
        res.status(500).json({message: 'Could not get location co-ordinates', error: error});
    });
});

module.exports = router;