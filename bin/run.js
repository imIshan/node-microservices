'use strict';

const slackClient = require('../server/slackClient');
const service = require('../server/service');
const http = require('http');
const server = http.createServer(service);

const slackToken = '251354';
const rtm = slackClient.RtmClient(slackToken);
rtm.start();

server.listen(3000);

server.on('listening', () => {
    console.log(`IRIS is listening on ${server.address().port} in ${service.get('env')}`);
})