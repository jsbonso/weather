/**
 * Error responses
 */

'use strict';

var server_request = (!global.config.is_server_https)
        ? require('http')
        : require('https')
    ;

module.exports = {

    /**
     * Returns the actual http request provider
     */
    server_provider : server_request,

    /**
     * Returns a server instance based on configuration
     *
     * @param app
     * @returns {*}
     */
    createServer: function(app) {
        if (global.config.is_server_https) {
            return server_request.createServer(config.ssh.details, app);
        } else {
            return server_request.createServer(app);
        }
    }
};