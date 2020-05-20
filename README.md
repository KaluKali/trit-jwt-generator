# trit-jwt-generator
JWT generator for trit-jitsi
## Getting Started
```
trit_jwt = require("trit-jwt-generator")

let server_params = {
    sub:'test.domen.biz',
    room:'test_test228',
    aud:"test.domen.biz",
    iss:'test.domen.biz',
};

let date = new Date();
date.setHours(date.getHours()+2);// how long the token will be active, in this case - 2 hours

let secret_key = 'test';

let token = trit_jwt(server_params,secret_key,date,
    {
        user:{ // see github.com/jitsi/lib-jitsi-meet/blob/master/doc/tokens.md
            name:'Carl Carlson',
            email:'carl@domen.biz',
            avatar:'https://your.ava.jpg'
        },
        group:'22'
    });
```