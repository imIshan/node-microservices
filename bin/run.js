'use strict';

const slackClient = require('../server/slackClient');
const service = require('../server/service');
const http = require('http');
const server = http.createServer(service);

const witToken = 'TBGKSHFZEOPO65MZ5UMDB6BC6UWFJKHM';
const witClient = require('../server/witClient')(witToken);

const slackToken = 'xoxb-448953290020-450187558583-94bHNdL26vo2HYbt8M6BnulC';
const slackLogLevel = 'ERROR';
const rtm = slackClient.RtmClient(slackToken, slackLogLevel, witClient);
rtm.start();

server.listen(3000);

server.on('listening', () => {
    console.log(`IRIS is listening on ${server.address().port} in ${service.get('env')}`);
})