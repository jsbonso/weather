// Common Helper File
var path = require('path');
process.env.NODE_ENV = 'test';

//Set APP_ROOT relative to  current helper file location
global.appRoot = path.normalize(__dirname + '../../');
global.config  = require(global.appRoot + '/config');