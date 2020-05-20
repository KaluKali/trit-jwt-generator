const createSchema = require('json-gate').createSchema;

module.exports = createSchema({
    type: 'object',
    properties: {
        sub: {
            type: 'string',
            required: true
        },
        room: {
            type: 'string',
            required: true
        },
        aud: {
            type: 'string',
            required: true
        },
        iss: {
            type: 'string',
            required: true
        },
        exp: {
            type: 'number',
            required: true
        },
        context: {
            type: 'object',
            required: false
        },
    },
    additionalProperties: false
});