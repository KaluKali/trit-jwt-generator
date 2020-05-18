const crypto = require('crypto');
const algorithmMap = {
    HS256: 'sha256',
    HS384: 'sha384',
    HS512: 'sha512',
    RS256: 'RSA-SHA256'
};
const typeMap = {
    HS256: 'hmac',
    HS384: 'hmac',
    HS512: 'hmac',
    RS256: 'sign'
};
const jwt = module.exports;
/**
 * Encode jwt
 *
 * @param {Object} payload
 * @param {String} key
 * @param {String} algorithm
 * @param {Object} options
 * @return {String} token
 * @api public
 */
jwt.encode = function(payload, key, algorithm='HS256', options) {
    // Check key
    if (!key) {
        throw new Error('Require key');
    }

    const signingMethod = algorithmMap[algorithm];
    const signingType = typeMap[algorithm];
    if (!signingMethod || !signingType) {
        throw new Error('Algorithm not supported');
    }

    const header = {typ: 'JWT', alg: algorithm};
    if (options && options.header) {
        assignProperties(header, options.header);
    }

    const segments = [];
    segments.push(base64urlEncode(JSON.stringify(header)));
    segments.push(base64urlEncode(JSON.stringify(payload)));
    segments.push(sign(segments.join('.'), key, signingMethod, signingType));

    return segments.join('.');
};

function assignProperties(dest, source) {
    for (let attr in source) {
        if (source.hasOwnProperty(attr)) {
            dest[attr] = source[attr];
        }
    }
}
function sign(input, key, method, type) {
    let base64str;
    if(type === "hmac") {
        base64str = crypto.createHmac(method, key).update(input).digest('base64');
    }
    else if(type === "sign") {
        base64str = crypto.createSign(method).update(input).sign(key, 'base64');
    }
    else {
        throw new Error('Algorithm type not recognized');
    }

    return base64urlEscape(base64str);
}
function base64urlEncode(str) {
    return base64urlEscape(Buffer.from(str).toString('base64'));
}

function base64urlEscape(str) {
    return str.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}