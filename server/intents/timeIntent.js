'use strict';
const request = require('superagent');
module.exports.process = (intentData, serviceRegistry, cb) => {
    if (intentData.intent[0].value !== 'time') {
        return cb(new Error(`Expected time intent, got ${intentData.intent[0].value}`));
    }
    if(!intentData.location){
        return cb(new Error(`Missing location in time intent`));
    }
    const location = intentData.location[0].value.replace(/,.?iris/i, '');

    const service = serviceRegistry.get('time');
    if(!service) return cb(false, 'No service available')
    request.get(`http://${service.ip}:${service.port}/service/${location}`, (err, res) => {
        if(err || res.statusCode != 200 || !res.body.result){
             return cb(false, `I had a problem with finding time in ${location}`)
        }
        return cb(false, `In ${location}, it is now ${res.body.result}`)
    })
   
}