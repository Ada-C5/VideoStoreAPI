var express = require('express');
var router = express.Router();
var RentalsController = require('../controllers/rentals_controller.js');
//
// // GET rentals/:title
// // Look a rental up by title
router.get('/:title', RentalsController.findMovie)
//
// // GET rentals/:title/customers
// // list of customers that have currently checked out any of the movie's inventory
router.get('/:title/customers', RentalsController.sortBy)
//
// // POST rentals/:title/check-out
// // #provide customerid and movie title
router.post('/:title/check-out', RentalsController.checkout)
//
// // POST rentals/:title/return
// // #provide customerid and movie title
// router.post('/:title/return', RentalsController.return)
//
// // GET rentals/overdue
// // list of customers with overdue movies
// router.get('/overdue', RentalsController.overdue)

module.exports = router;
