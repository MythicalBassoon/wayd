'use strict';

var express = require('express');
var router = express.Router();
var path = require('path');
var apiController = require('../Controllers/api.js');
var geteventImage = require('../Models/eventModel').geteventImage;
var insertEvent = require('../Models/eventModel').insertEvent;
var insertPoll = require('../Models/pollModel').insertPoll;
var insertEmail = require('../Models/emailModel').insertEmail;
var insertUser = require('../Models/userModel').insertUser;
var getOneEvent = require('../Models/eventModel').getOneEvent;
var voteTemplate = require('../Templates/vote').template;
var alreadyVotedTemplate = require('../Templates/alreadyVoted').template;

var request = require('request');
var incrementVote = require('../Models/pollModel').incrementVote
var checkVoted = require('../Models/pollModel').checkVoted
var toggleVoted = require('../Models/pollModel').toggleVoted
var checkIfComplete = require('../Models/pollModel').checkIfComplete
var retrievePollEmails = require('../Models/pollModel').retrievePollEmails
var host = process.env.DEPLOYED ? 'http://104.236.40.104:' : 'http://localhost:'
var moment = require('moment');


// ROUTE TO RETRIEVE API(S) DATA 
router.route('/events/')
	.get(function(req, res) {

    var loc = req.query.loc
    var timeframe = req.query.timeframe

		apiController.getEvents(loc, timeframe, function(err, data){
      if(err) {
        res.status(404).send("did not find events")
      } else {
        res.json(data)
      }
    });

	});

// ROUTE TO CREATE USERS
router.route('/users')
  .post(function(req,res) {
    var user = req.body;

    insertUser(user, function(err, userId) {
      if (err) {
        res.send(err);
      }
      res.json(userId);
    });

  })

// ROUTE TO CREATE POLL
// POST BODY must have pollInfo and eventInfo properties, each holding an object with necessary info.
// eventInfo will be preset on client, regardless of API its from. pollInfo will need to have userId,
// user object with will include userId, firstName, lastName.
router.route('/polls')
  .post(function(req, res) {

    var pollInfo = req.body.pollInfo;
    var eventInfo = req.body.eventInfo;

  // set category based image with extra get request to eventful
  apiController.getEventCategory(eventInfo.source_id, function(err, eventDetails) {
  
    if (err) { throw err } 

    // error handling for getting category name and lookup in hashtable
    var categoryName;
    if (eventDetails.categories) {
       if (Array.isArray(eventDetails.categories.category)) {
          categoryName = eventDetails.categories.category[0].id;
        } else {
          categoryName = eventDetails.categories.category.id ?  eventDetails.categories.category.id : 'default';
        } 
    } else {
      categoryName = 'default';
    }

    // add new category info to eventinfo object for use in templates
    var eventImg = geteventImage(categoryName);
    eventInfo.category_image = eventImg;
    eventInfo.category = categoryName;
  
    // insert event into events table
    insertEvent(eventInfo, function(err, eventId) {
      if (err) { res.send(404) }

      //insert poll with event id
      insertPoll(eventId[0]['id'], pollInfo, function(err, pollId) { 

        if (err) { res.send(404) }

        //send out emails
        for(var i = 0; i < pollInfo.emails.length; i++) {
          insertEmail(pollInfo.emails[i], i, pollId[pollId.length-1]['id'], function(err, email, i) {
            
            if(err){
              res.send(404, err)
              return
            }

            var emailObj = {
              to: pollInfo.emails[i],
              user: pollInfo.user.userFirstName + ' '+ pollInfo.user.userLastName,
              eventInfo: eventInfo,
              othersInvited: pollInfo.emails.slice(0,i).concat(pollInfo.emails.slice(i+1)),
              emailId: email[0].id
            };

            request({
              uri: host + '4568/jobs',
              headers: {'Content-type': 'application/json'},
              method: 'POST',
              body: JSON.stringify(emailObj)
            });

            if(i === pollInfo.emails.length - 1){ 
              res.send(200, 'ALL EMAILS INSERTED, POLL CREATION SUCCESS')
            }

          });

        }

      });

    });

    });   
  });


    

router.route('/polls/:voteAction/:emailId')
  .get(function(req,res) {

    var emailId = req.params.emailId;
    var voteAction = req.params.voteAction;
    console.log('vote route, params are', req.params);

    //first check if user has voted
    checkVoted(emailId, function(err, pollObj) {
      if (err) {
        return res.status(404).send("error finding relevant pollId");
      }

      //send back a 409 as the user has already voted
      if (!pollObj[0].voted === false) {
        return res.status(409).send(alreadyVotedTemplate()); 
      }

      //increment  yes/no vote_count for poll in db
      incrementVote(pollObj[0].poll_id, voteAction, function(err, voteCount) {

        if (err) {
          return res.status(404).send("error incrementing yes vote count");
        }

        //changes 'voted' column to true for corresponding poll/email combination in emails table
        toggleVoted(emailId, function(err, response) {

          if (err) {
            return res.status(404).send('error toggling "voted" for email address')
          }

          //check if number of total votes made = number of participants - if so, hit email server to send results email to all participants
          checkIfComplete(pollObj[0].poll_id, function(err, results) {
            if (err) {
            return res.status(404).send('error toggling "voted" for email address')
            }

            //retrieving event details to insert into html vote template to be served up to voter
            getOneEvent(results.eventId, function(err, event) {
              var event = event[0];
              //console.log('START TIME IS', event.start_time);
              var startTime = moment(event.start_time).calendar();
              if (err) {
                return res.status(404).send('error finding event details', err);
              }

              if (results.complete) {
                //sending poll results email to all participants - first retrieving all email id's associated with poll
                retrievePollEmails(pollObj[0].poll_id, function(err, emailObjs) {

                  if(err) {
                     res.status(404).send('error retrieving emails, error is', err)
                  }  

                  //loop through return emails, and build object to be included in req.body of post to email server
                  for(var i = 0; i < emailObjs.length; i++) {
                      var emailObj = {
                        to: emailObjs[i].email,
                        final: true,
                        consensus: results.consensus,
                        eventInfo: event
                      };

                      //make post request to server to results email for each email address
                      request({
                        uri: host + '4568/jobs',
                        headers: {'Content-type': 'application/json'},
                        method: 'POST',
                        body: JSON.stringify(emailObj)

                      }, function() {
                        console.log('post to email server made');
                      })
                  }

                  //serve up template to user thanking them for vote and letting them know next steps. this is completed regardless of whether post to email server is successful or not
                  res.send(voteTemplate(event.title, event.category_image, event.description, event.address, event.city, event.state, event.image_thumb, startTime));
                });
              } else {
                //thank you / next steps template served up to user even if poll isn't yet complete
                res.send(voteTemplate(event.title, event.category_image, event.description, event.address, event.city, event.state, event.image_thumb, startTime));
              }
            });
          });
        });
      });
    });
  })



module.exports = router;
