const TritJWT = require('./TritJWT');

function createInstance(defaultConfig) {
    return new TritJWT(defaultConfig);
}

var trit_jwt = createInstance();

module.exports = trit_jwt;

// Allow use of default import syntax in TypeScript
module.exports.default = trit_jwt;