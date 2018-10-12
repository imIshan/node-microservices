'use strict'

const { RTMClient } = require('@slack/client');

function handleOnAuthentication(rtmStartData) {
    console.log(`Logged in as ${rtmStartData.self.name} from the team ${rtmStartData.team.name}`);
}

function handleOnMessage(rtm, message, nlpClient) {
    nlpClient.ask(message.text, (err, res) => {
        if (err) {
            console.log('err ', err);
            return err;
        }
        if(!res.intent){
            return rtm.sendMessage('Sorry, I dont know what you are talking about ', message.channel);
        }
        rtm.sendMessage('Sorry', message.channel).then((res) => { console.log("Message sent: ", res.ts); }).catch(console.error)
    })
}

function addAuthenticationHandler(rtm, handler) {
    rtm.on('authenticated', handler)
}

const RtmClient = (token, logLevel, nlpClient) => {
    const rtm = new RTMClient(token, { logLevel: logLevel });
    addAuthenticationHandler(rtm, handleOnAuthentication);
    rtm.on('message', (message) => {
        handleOnMessage(rtm, message, nlpClient)
    });
    return rtm
}

module.exports = {
    RtmClient: RtmClient
}