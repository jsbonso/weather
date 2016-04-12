'use strict';

// Globals
global.appRoot = require('path').resolve(__dirname);
global.config  = require(global.appRoot + '/config');

// Initialise modules
const express      = require('express');
const app          = express();
const httpProvider = require('./components/httpProvider');
const server       = httpProvider.createServer(app);

// Middleware
require('./express')(app);
require('./routes')(app);

// Start server
server.listen(global.config.port, global.config.host, function () {
    console.log('Node server listening on %d', global.config.port);
});

// Expose app
exports = module.exports = app;
