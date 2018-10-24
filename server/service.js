'use strict';

const express = require('express');
const service = express();
const ServiceRegistry = require('./serviceRegistry');
const serviceRegistry = new ServiceRegistry();

service.set('serviceRegistry', serviceRegistry);

service.put('/service/:intent/:port', (req, res, next) => { // services should announce themselves on this route
    const serviceIntent = req.params.intent;
    const servicePort = req.params.port;

    const serviceIp = req.connection.remoteAddress.includes('::')
    ? `[${req.connection.remoteAddress}]` : req.connection.remoteAddress;

    serviceRegistry.add(serviceIntent, serviceIp, servicePort); // Adding the services to the service registry
    
    res.json({result: `${serviceIntent} at ${serviceIp}:${servicePort}`})
})

module.exports = service;