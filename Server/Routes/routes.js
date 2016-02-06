'use strict';

var express = require('express');
var router = express.Router();
var path = require('path');
var apiController = require('../Controllers/api.js')

var insertEvent = require('../Models/eventModel').insertEvent
var insertPoll = require('../Models/pollModel').insertPoll
var insertEmail = require('../Models/emailModel').insertEmail
var nodeMailer = require('../Workers/email').sendNodeMailer
var insertUser = require('../Models/userModel').insertUser
var getOneEvent = require('../Models/eventModel').getOneEvent
var voteTemplate = require('../Templates/vote').template
var alreadyVotedTemplate = require('../Templates/alreadyVoted').template

var request = require('request');
var incrementYesVote = require('../Models/pollModel').incrementYesVote
var incrementNoVote = require('../Models/pollModel').incrementNoVote
var checkVoted = require('../Models/pollModel').checkVoted
var toggleVoted = require('../Models/pollModel').toggleVoted
var checkIfComplete = require('../Models/pollModel').checkIfComplete
var retrievePollEmails = require('../Models/pollModel').retrievePollEmails
var host = process.env.DEPLOYED ? 'http://104.236.40.104:' : 'http://localhost:'



// ROUTE TO RETRIEVE API(S) DATA 
router.route('/events/')
	.get(function(req, res) {

    console.log('query', req.query);
    var loc = req.query.loc
    var timeframe = req.query.timeframe
    // var loc = req.params.loc
    // var timeframe = req.params.timeframe
    // console.log('loc', loc)
    // console.log('timeframe', timeframe)

		apiController.getEvents(loc, timeframe, function(err, data){
      if(err) {
        res.status(404).send("did not find events")
      } else {
        // console.log('data', data)
        res.json(data)
      }
    });

	});

// ROUTE TO CREATE USERS
router.route('/users')
  .post(function(req,res){
    var user = req.body;

    insertUser(user, function(err, userId){
      if(err){res.send(err)}
        console.log('successful user insert', userId)
      res.json(userId)
    })

    

    //res.json(user)

  })


// ROUTE TO CREATE POLL
//POST BODY must have pollInfo and eventInfo properties, each holding an object with necessary info.
//eventInfo will be preset on client, regardless of API its from. pollInfo will need to have userId,
//user object with will include userId, firstName, lastName.
router.route('/polls')
  .post(function(req, res){
  // create new poll



 
    var pollInfo = req.body.pollInfo;
    var eventInfo = req.body.eventInfo;

    insertEvent(eventInfo, function(err, eventId){
      console.log(eventId)
      if(err){
        res.send(404)
      }
      insertPoll(eventId[0]['id'], pollInfo, function(err, pollId){
        if(err){
          res.send(404)
        }
        for(var i = 0;i<pollInfo.emails.length;i++){
          insertEmail(pollInfo.emails[i], i, pollId[pollId.length-1]['id'], function(err, email, i){
            if(err){
              res.send(404)
            }

            var emailObj = {
              to: pollInfo.emails[i],
              user: pollInfo.user.userFirstName + ' '+ pollInfo.user.userLastName,
              eventInfo: eventInfo,
              othersInvited: pollInfo.emails.slice(0,i).concat(pollInfo.emails.slice(i+1)),
              emailId: email[0].id
            }

            request({
              uri: host + '4568/jobs',
              headers: {'Content-type': 'application/json'},
              method: 'POST',
              body: JSON.stringify(emailObj)

            })

            if(i === pollInfo.emails.length - 1){

    
              res.send(200, 'ALL EMAILS INSERTED, POLL CREATION SUCCESS')
            }
          })
        }

      })

    })


    // var sendObj = {
    //   userid: userId,
    //   eventObj: eventObj
    // }
    //   res.send(sendObj)


    // add to event table
    // insertEvent(eventObj, function(err, eventId){
    //   // add to poll table
    //   insertPoll(eventId, userId, function(err, pollId){ 
    //   //don't yet know the num of participants because the emais have not been created
    //     if(err){
    //       throw err
    //     }
    //     res.send(pollId)
    //   });
      
    })

    
    
    // add to email table (including main user)
    // send out to email service

 // });

// ROUTE TO CALCULATE POLL STATUS
router.route('/polls/:id')
  .post(function(req, res){
    // updated poll count in poll table
      // if poll complete, send email to everyone
      // or send poll results to everyone as of now

  })

//ROUTE TO INCREMENT YES VOTES FOR A POLL

router.route('/polls/yes/:emailId')
  .get(function(req,res){

    console.log('yes vote recieved');

    //first check if user has voted
    var emailId = req.params.emailId
    checkVoted(req.params.emailId, function(err, pollObj) {
      if (err) {
        return res.status(404).send("error finding relevant pollId");
      }


      //send back a 409 is the user has already voted
      if (!pollObj[0].voted === false) {
        return res.status(409).send(alreadyVotedTemplate()); 
      }

      //increment no vote_count for poll in db
      incrementYesVote(pollObj[0].poll_id, function(err, voteCount) {
        if (err) {
          return res.status(404).send("error incrementing yes vote count");
        }

        //changed 'voted' column to true in emails table
        toggleVoted(emailId, function(err, response) {
          console.log('toggle voted response is', response)
          if (err) {
            return res.status(404).send('error toggling "voted" for email address')
          }

          //check if number of total votes made = number of participants, if so, hit email server
          checkIfComplete(pollObj[0].poll_id, function(err, results) {
            if (err) {
            return res.status(404).send('error toggling "voted" for email address')
            }

            console.log('results obj is', results);

             //retrieving event details to insert into html voteTemplate to be served up

            console.log('about to retrieve event');
            getOneEvent(results.eventId, function(err, event) {
              console.log('event is', event)
              var event = event[0];
              console.log('get one event just ran, the event is', event);
              if (err) {
                return res.status(404).send('error finding event details', err);
              }
              if (results.complete) {
              retrievePollEmails(pollObj[0].poll_id, function(err, emailObjs) {
                console.log('about to post to emails server, emailObjs are', emailObjs);
              if(err) {
                console.log('in controller, issue retrieiving emails, email is:', err)
                 res.status(404).send('error retrieving emails, error is', err)
              }  
              for(var i = 0; i < emailObjs.length; i++){
                  var emailObj = {
                    to: emailObjs[i].email,
                    final: true,
                    consensus: results.consensus,
                    event: {
                      title: event.title,
                      image_medium: event.image_medium,
                      description: event.description
                    }
                    // user: pollInfo.user.userFirstName + ' '+ pollInfo.user.userLastName,
                    // eventInfo: eventInfo,
                    // othersInvited: pollInfo.emails.slice(0,i).concat(pollInfo.emails.slice(i+1))
                  }
                  console.log('about to make individual request to email server', emailObj);
                  request({
                    uri: host + '4568/jobs',
                    headers: {'Content-type': 'application/json'},
                    method: 'POST',
                    body: JSON.stringify(emailObj)

                  }, function() {
                    console.log('post to email server made');
                  })
                }
                res.send(voteTemplate(event.title, event.image_medium, event.description));
              });
  }

            else {
              res.send(voteTemplate(event.title, event.image_medium, event.description));
            }
            });
          });
        });
      });
    });
  }.bind(this))

//ROUTE TO INCREMENT YES VOTES FOR A POLL

router.route('/polls/no/:emailId')
   .get(function(req,res){

    console.log('no vote recieved');

    //first check if user has voted
    var emailId = req.params.emailId
    checkVoted(req.params.emailId, function(err, pollObj) {
      if (err) {
        return res.status(404).send("error finding relevant pollId");
      }


      //send back a 409 is the user has already voted
      if (!pollObj[0].voted === false) {
        return res.status(409).send(alreadyVotedTemplate()); 
      }

      //increment no vote_count for poll in db
      incrementNoVote(pollObj[0].poll_id, function(err, voteCount) {
        if (err) {
          return res.status(404).send("error incrementing yes vote count");
        }
        //changed 'voted' column to true in emails table
        toggleVoted(emailId, function(err, response) {
          console.log('toggle voted response is', response)
          if (err) {
            return res.status(404).send('error toggling "voted" for email address, error is', err)
          }
          //check if number of total votes made = number of participants, if so, hit email server
          checkIfComplete(pollObj[0].poll_id, function(err, results) {
            if (err) {
            return res.status(404).send('error toggling "voted" for email address')
            }

            console.log('results obj is', results);

             //retrieving event details to insert into html voteTemplate to be served up

            console.log('about to retrieve event');
            getOneEvent(results.eventId, function(err, event) {
              var event = event[0];
              console.log('get one event just ran, the event is', event);
              if (err) {
                return res.status(404).send('error finding event details', err);
              }
              if (results.complete) {
              retrievePollEmails(pollObj[0].poll_id, function(err, emailObjs) {
                console.log('about to post to emails server, emailObjs are', emailObjs);
              if(err) {
                console.log('in controller, issue retrieiving emails, email is:', err)
                 res.status(404).send('error retrieving emails, error is', err)
              }  
              for(var i = 0; i < emailObjs.length; i++){
                  var emailObj = {
                    to: emailObjs[i].email,
                    final: true,
                    consensus: results.consensus,
                    event: {
                      title: event.title,
                      image_medium: event.image_medium,
                      description: event.description
                    }

                    // user: pollInfo.user.userFirstName + ' '+ pollInfo.user.userLastName,
                    // eventInfo: eventInfo,
                    // othersInvited: pollInfo.emails.slice(0,i).concat(pollInfo.emails.slice(i+1))
                  }
                  console.log('about to make individual request to email server', emailObj);
                  request({
                    uri: host + '4568/jobs',
                    headers: {'Content-type': 'application/json'},
                    method: 'POST',
                    body: JSON.stringify(emailObj)

                  }, function() {
                    console.log('post to email server made');
                  })
                }

                res.send(voteTemplate(event.title, event.image_medium, event.description));
              });
  }

            else {

              res.send(voteTemplate(event.title, event.image_medium, event.description));
            }
            });
          });
        });
      });
    });
  }.bind(this))



module.exports = router;
