'use strict';

const request = require('superagent');

function handleWithResponse(res) {
    console.log('res ', res)
}

module.exports = function witClient(token) {
    const ask = function ask(message, cb) {
        console.log('message ', message);
        request.get('https://api.wit.ai/message')
            .set('Authorization', 'Bearer ' + token)
            .query({ v: '20181012' })
            .query({ q: message })
            .end((err, res) => {
                if (err) return cb(err);
                if (res.statusCode != 200) return cb("Excepted status 200 but got " + res.stausCode)
                const witResponse = handleWithResponse(res.body)
            })
    }

    return {
        ask: ask
    }
}