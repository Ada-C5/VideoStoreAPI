var express = require('express');
var router = express.Router();


// GET rentals
router.get('/', function(req, res, next) {
  res.status(200).json({title: 'Rentals:'})
});
// GET rentals/:title
// Look a rental up by title
router.get('/:title', function(req, res, next) {
  res.status(200).json({title: 'Rentals list by title:'})
});

// GET rentals/:title/customers
// list of customers that have currently checked out any of the movie's inventory
router.get('/:title/customers', function(req, res, next) {
  res.status(200).json({title: 'List of customers that have currently checked out any of the movie inventory:'})
});

// POST rentals/:title/check-out
// #provide customerid and movie title
router.post('/:title/check-out', function(req, res, next) {
  res.status(200).json({title: '"check out" one of a movies inventory to the customer:'})
});

// POST rentals/:title/return
// #provide customerid and movie title
router.post('/:title/return', function(req, res, next) {
  res.status(200).json({title: '"check in" one of a customers rentals:'})
});

// GET rentals/overdue
router.get('/overdue', function(req, res, next) {
  res.status(200).json({title: 'See a list of customers with overdue movies:'})
});

module.exports = router
