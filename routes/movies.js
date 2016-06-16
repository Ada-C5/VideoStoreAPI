var express = require('express');
var router = express.Router();

// GET movies
router.get('/', function(req, res, next) {
  res.status(200).json({title: 'Movies:'})
});

// GET movies/sort/release-date?n=5&p=1
router.get('/sort/release-date', function(req, res, next) {
  res.status(200).json({title: 'Sorted List of Movies by Release Date:'})
});

// GET movies/sort/title
router.get('/sort/title', function(req, res, next) {
  res.status(200).json({title: 'List of Movies by Title:'})
});

// GET movies/:title/current
router.get('/:title/current', function(req, res, next) {
  res.status(200).json({title: 'List of Customers that have currently checked out a copy of the film:'})
});

// customers that have checked out a copy in the past (/movies/Jaws/history/sort/name)
// GET movies/:title/history/sort/name
router.get('/:title/history/sort/name', function(req, res, next) {
  res.status(200).json({title: 'List of Movies the Customer Currently Has Checked-Out:'})
});

// GET movies/:title/history/sort/checkout-date
router.get('/:title/history/sort/checkout-date', function(req, res, next) {
  res.status(200).json({title: 'List of Movies the Customer Has Checked-Out in the Past:'})
});

module.exports = router
