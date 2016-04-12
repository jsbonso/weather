const path    = require('path');
const glob    = require('glob');
const express = require('express');

/**
 * Injects all routes found inside the /api directory, convention explained below
 *
 * For injector to work, routes must be contained inside the api directory, and accessed
 * through an index.js initializing file. For example: /api/v1/vendor/index.js
 * then initializes other nested routes which are first accessed through
 * /api/v1/vendor/... endpoints.
 *
 * @param app
 */
module.exports = function (app) {
    'use strict';

    // Get route middleware
    let routesPath  = path.normalize(global.appRoot + '/app/api');
    let globPattern = routesPath + '/**/**/index.js';


    // Inject all protected routes inside the api directory
    glob(globPattern, function (err, routes) {
        if(err) {
            global.logger.error("Error while injecting routes into routepath. Could not glob " + globPattern);
        } else {
            routes.forEach(function (originalRoute) {
                let routeName = path.relative(routesPath, originalRoute);
                let route     = (`/api/${routeName}`).replace('/index.js', '');

                // Inject route
                app.use(route, require(global.appRoot + '/app' + route));
            });
        }

        app.use("/js",   express.static(global.appRoot + '/views/assets/js'));
        app.use("/css",  express.static(global.appRoot + '/views/assets/css'));
        app.use("/img",  express.static(global.appRoot + '/views/assets/img'));
        app.use('/font', express.static(global.appRoot + '/view/assets/font'));

        // Route to the login page
        app.get('/', function (req, res) {
            res.render('index', {
            });
        });

    });

};
