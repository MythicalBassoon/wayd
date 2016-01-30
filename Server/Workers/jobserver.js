var express = require('express');
var bodyParser = require('body-parser');
var redis = require('redis');
var Queue = require('./queue.js');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/jobs', createHandler);
app.listen(4568, serverMessage);

var jobNumber = 0;

function createHandler (req, res) {
  var client = redis.createClient();
  //var numberOfJobs = req.body.num;
  var jobQueue = new Queue('jobs', client);

  
    // TODO: Push the `job` into the `jobQueue`. Confirm your work in the Redis CLI
    jobQueue.push(JSON.stringify({name: 'RICHARDDDDD'}), function(){
      console.log('successful added 1234')
    })



  

  res.send('ok\n');
  client.quit();
}

function serverMessage () {
  console.log('listening on 4568');
}