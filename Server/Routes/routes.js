'use strict';

var express = require('express');
var router = express.Router();
var apiController = require('../Controllers/api.js')

// var insertEvent = require('').insertEvent
// var insertPoll = require('').insertPoll


// ROUTE TO RETRIEVE API(S) DATA 
router.route('/events/:loc/:timeframe')
	.get(function(req, res) {

    var loc = req.params.loc
    var timeframe = req.params.timeframe
    // console.log('loc', loc)
    // console.log('timeframe', timeframe)

		apiController.getEvents(loc, timeframe, function(err, data){
      if(err) {
        res.statusCode(404).send("did not find events")
      } else {
        // console.log('data', data)
        res.json(data)
      }
    });

	});

// ROUTE TO CREATE USERS
router.route('/users')
  .post(function(req,res){
    // add to user table
    // respond with user token

  })


// ROUTE TO CREATE POLL
router.route('/polls/:id')
  .post(function(req, res){
  // create new poll
 
    // var userId = req.params.id
    // var eventObj = req.body.evenObj

    // // add to event table
    // insertEvent(eventObj, function(err, eventId){
    //   // add to poll table
    //   insertPoll(eventId, userId, function(err, pollId){ 
    //   //don't yet know the num of participants because the emais have not been created
    //     if(err){
    //       throw err
    //     }
    //     res.send(pollId)
    //   });
      
    // })

    
    
    // add to email table (including main user)
    // send out to email service

  });

// ROUTE TO CALCULATE POLL STATUS
router.route('/polls/:id')
  .put(function(req, res){
    // updated poll count in poll table
      // if poll complete, send email to everyone
      // or send poll results to everyone as of now

  })



module.exports = router;
