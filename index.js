const jwt = require('./lib/jwt');
/**
 * Generate token for jitsi
 *
 * @param {Object} server_params
 * @param {Date} token_alive
 * @param {Object} client
 * @param {String} secret_key
 * @return {String} token
 * @api public
 */
module.exports = function(server_params,token_alive,secret_key,client){
    server_params.context = client;
    server_params.exp = token_alive.getTime();
    return jwt.encode(server_params,secret_key)
};
