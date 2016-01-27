'use strict';

var express = require('express');
var router = express.Router();
var apiController = require('../Controllers/api.js')

// route to retrieve event api(s)
router.route('/events/:loc/:timeframe')
	.get(function(req, res) {

    var loc = req.params.loc
    var timeframe = req.params.timeframe
    console.log('loc', loc)
    console.log('timeframe', timeframe)

		apiController.getEvents(loc, timeframe, function(err, data){
      if(err) {
        throw err
      } else {
        res.json(data)
      }
    });

	});


// module.exports = function(app, express) {


// 	// // ROUTE FOR DISPLAYING DASHBOARD
// 	// app.get('/users/:user_id/clients', function(req,res){
// 	// 	controller.dashboard.get(req,res);
// 	// });

// 	// // ROUTE FOR CREATING A NEW CLIENT
// 	// app.post('/users/:user_id/clients', function(req,res){
// 	// 	 controller.user.post(req,res);
// 	// });

// 	// // ROUTE FOR DISPLAYING PARTICULAR CLIENT
// 	// app.get('/users/:user_id/clients/:client_id', function(req,res){
// 	// 	controller.client.get(req,res);
// 	// })

//  //  // ROUTE FOR UPDATING A CLIENT
// 	// app.put('/users/:user_id/clients/:client_id', controller.client.put);

// 	// // ROUTE FOR GETTING FEED FOR A PARTICULAR CLIENT
// 	// app.get('/users/:user_id/clients/:client_id/feed', function(req,res){
// 	// 	controller.feed.getOneClient(req,res);
// 	// })
// };

module.exports = router;
