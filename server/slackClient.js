'use strict'
const { RTMClient } = require('@slack/client');

const RtmClient = (token) => {
    // The client is initialized and then started to get an active connection to the platform
    const rtm = new RTMClient(token);
    return rtm
}

module.exports = {
    RtmClient: RtmClient
}