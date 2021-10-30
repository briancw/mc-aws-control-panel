const AWS = require('aws-sdk');
const keys = require('./keys.js');
AWS.config.region = 'us-west-2';
AWS.config.accessKeyId = keys.accessKeyId;
AWS.config.secretAccessKey = keys.secretAccessKey;
const ec2 = new AWS.EC2();
const express = require('express');
const app = express();
// const port = process.env.PORT || 80;
const port = 3007;
const path = require('path');

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/start', function(req, res) {
    let params = {
        InstanceIds: ['i-7e538fa3'],
    };

    ec2.startInstances(params, function(err, data) {
        if (err) {
            console.log(err);
        }

        let starting_instances = data.StartingInstances;
        starting_instances.forEach(instance => {
            console.log(instance);
            res.send('Started Succesfully');
        });
    });
});

app.post('/stop', function(req, res) {
    let params = {
        InstanceIds: ['i-7e538fa3'],
    };

    ec2.stopInstances(params, function(err, data) {
        if (err) {
            console.log(err);
            res.send('Something bad happened, call Brian Asap');
        }

        console.log(data);
        res.send('Probably Stopping!');
    });
});

app.listen(port);
console.log('Listening on ' + port);
