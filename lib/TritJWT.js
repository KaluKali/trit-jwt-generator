const jwt = require('./jwt');
const schema = require('./jwt-schema');

function TritJWT(instanceConfig) {
    this._defaults = instanceConfig;
}
/**
 * Generate token for jitsi
 *
 * @param {Object} server_params
 * @param {String} secret_key
 * @param {Date} token_alive
 * @param {Object} client
 * @return {String,TypeError,RangeError} token
 * @api public
 */
TritJWT.prototype.generateJWT = function(server_params,secret_key,token_alive,client){
    if (typeof server_params === 'object'){
        if (typeof client === 'object'){
            server_params.context = client;
        }
    } else {
        return TypeError("Parameter \'server_params\' is Object.")
    }
    if (typeof secret_key !== 'string'){
        return TypeError('Parameter \'secret_key\' is Object.')
    }
    if (token_alive instanceof Date){

        if (token_alive.getTime() < new Date().getTime()){
            return RangeError("Invalid date: your date is past")
        } else {
            server_params.exp = token_alive.getTime()
        }
    } else {
        return TypeError("Parameter 'token_alive' is Date.")
    }
    try {
        schema.validate(server_params);
        return jwt.encode(server_params,secret_key)
    } catch (e) {
        return (e)
    }
};

module.exports = TritJWT;