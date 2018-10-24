'use strict'

const { RTMClient } = require('@slack/client');

function handleOnAuthentication(rtmStartData) {
    console.log(`Logged in as ${rtmStartData.self.name} from the team ${rtmStartData.team.name}`);
}

function handleOnMessage(rtm, message, nlpClient, serviceRegistry) {
    if (message.text.toLowerCase().includes('iris')) {
        nlpClient.ask(message.text, (err, res) => {
            if (err) {
                console.log('err ', err);
                return err;
            }
            try {
                if (!res.intent || !res.intent[0] || !res.intent[0].value) {
                   throw new Error('Could not extract intent');
                }
                const intent = require('./intents/'+res.intent[0].value+'Intent')
                intent.process(res, serviceRegistry, (error, response) => {
                    if(error){
                        console.log(error.message);
                        return;
                    }
                    return rtm.sendMessage(response, message.channel);
                })
            } catch (err) {
                console.log(err);
                console.log(res);
                rtm.sendMessage('Sorry I dont know what you are talking about', message.channel);
            }
        })
    }else{
        console.log("Message not for Iris");
    }
}

function addAuthenticationHandler(rtm, handler) {
    rtm.on('authenticated', handler)
}

const RtmClient = (token, logLevel, nlpClient, serviceRegistry) => {
    const rtm = new RTMClient(token, { logLevel: logLevel });
    addAuthenticationHandler(rtm, handleOnAuthentication);
    rtm.on('message', (message) => {
        handleOnMessage(rtm, message, nlpClient, serviceRegistry)
    });
    return rtm
}

module.exports = {
    RtmClient: RtmClient
}