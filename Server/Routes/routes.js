'use strict';

var express = require('express');
var router = express.Router();
var path = require('path');
var apiController = require('../Controllers/api.js')
var geteventImage = require('../Models/eventModel').geteventImage
var insertEvent = require('../Models/eventModel').insertEvent
var insertPoll = require('../Models/pollModel').insertPoll
var insertEmail = require('../Models/emailModel').insertEmail
var nodeMailer = require('../Workers/email').sendNodeMailer
var insertUser = require('../Models/userModel').insertUser
var getOneEvent = require('../Models/eventModel').getOneEvent
var voteTemplate = require('../Templates/vote').template
var alreadyVotedTemplate = require('../Templates/alreadyVoted').template

var request = require('request');
var incrementVote = require('../Models/pollModel').incrementVote
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
  .post(function(req,res){
    var user = req.body;

    insertUser(user, function(err, userId){
      if(err){res.send(err)}
        console.log('successful user insert', userId)
      res.json(userId)
    })

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

  //set category based image
  apiController.getEventCategory(eventInfo.source_id, function(err, eventDetails){
    console.log('event details', eventDetails)
  
    if(err) {
      throw err
    } 

    var categoryName;
  
    console.log('eventdetails', eventDetails)
    console.log('eventdetails', eventDetails.categories)
  

    if(eventDetails.categories) {

       if(Array.isArray(eventDetails.categories.category)){
           console.log('is array', eventDetails.categories.category[0].id)
          categoryName = eventDetails.categories.category[0].id
        } else {
          console.log('not array', eventDetails.categories.category.id)
          categoryName = eventDetails.categories.category.id ?  eventDetails.categories.category.id : 'default'
        } 

    } else {
      console.log('default')
      categoryName = 'default'
    }

    var eventImg = geteventImage(categoryName)

    console.log('eventImg',eventImg)

    eventInfo.category_image = eventImg
    eventInfo.category = categoryName
  
    console.log('event', eventInfo)


    //insert event into events table
    insertEvent(eventInfo, function(err, eventId){
      console.log(eventId)
      if(err){
        console.log('first error', err)
        res.send(404)
      }

      console.log('inserting poll', eventId[0]['id'] )

      insertPoll(eventId[0]['id'], pollInfo, function(err, pollId){ 

        if(err){
          console.log('second error', err)
          res.send(404)
        }

        for(var i = 0;i<pollInfo.emails.length;i++){
          console.log('pollids', pollId)
          console.log('pollids', pollId[pollId.length-1]['id'])
          console.log('pollids', pollInfo)

          insertEmail(pollInfo.emails[i], i, pollId[pollId.length-1]['id'], function(err, email, i){
            

            if(err){
              console.log('about to res send email', err)
              res.send(404, err)
              return
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


              console.log('about to send 200')    
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
  })


    

router.route('/polls/:voteAction/:emailId')
  .get(function(req,res){

    console.log('vote recieved');

    var emailId = req.params.emailId;
    var voteAction = req.params.voteAction;

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
              console.log('event is', event)
              var event = event[0];

              if (err) {
                return res.status(404).send('error finding event details', err);
              }

              if (results.complete) {
                //sending poll results email to all participants - first retrieving all email id's associated with poll
              retrievePollEmails(pollObj[0].poll_id, function(err, emailObjs) {
                console.log('about to post to emails server, emailObjs are', emailObjs);

                if(err) {
                  console.log('in controller, issue retrieiving emails, email is:', err)
                   res.status(404).send('error retrieving emails, error is', err)
                }  

                //loop through return emails, and build object to be included in req.body of post to email server
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
       
                    }
                    console.log('about to make individual request to email server', emailObj);

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
                res.send(voteTemplate(event.title, event.image_medium, event.description));
              });
  }

              else {
                //thank you / next steps template served up to user even if poll isn't yet complete
                res.send(voteTemplate(event.title, event.image_medium, event.description));
              }
            });
          });
        });
      });
    });
  })



module.exports = router;
