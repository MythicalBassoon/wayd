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
  if(process.ENV.DEPLOYED){

  var client = redis.createClient('6379', 'redis');
  }
  else{
    var client = redis.createClient();
  }
  //var numberOfJobs = req.body.num;
  var data = req.body;
  var jobQueue = new Queue('jobs', client);

  
    // TODO: Push the `job` into the `jobQueue`. Confirm your work in the Redis CLI
    jobQueue.push(JSON.stringify(data), function(){
      console.log('successfully added email to -- ', req.body.to, ' to redis queue')
    })



  

  res.send('ok\n');
  client.quit();
}

function serverMessage () {
  console.log('listening on 4568');
}