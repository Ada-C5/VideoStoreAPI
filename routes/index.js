var express = require('express');
var router = express.Router();
var Controller = require('../controllers/index')

var MovieController = require('../controllers/movies')


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/', Controller.nothing)

router.get('/zomg', Controller.zomg)

// Retrieve a list of all movies
router.get('/movies', MovieController.index);

// Retrive a list of all customers
// router.get('/customers/', Controller.)


// Retrive a subset of customers
// Given a sort column, return n customer records, offset by p records (this will be used to create "pages" of customers)
// Sort columns are: name, registered_at, postal_code
// router.get('/customers/sort/name?n=10&p=2', Controller.)


// Given a customer's id...
// List the movies they currently have checked out
// router.get('/customers/:id/current', Controller.)
//
//
// // Given a customer's id...
// // List the movies a customer has checked out in the past (ordered by check out date, includes return date)
// router.get('/customers/:id/history', Controller.)
//
//
//
//
//
//
//
// // Retrieve a subset of movie
// // Given a sort column, return n movie records, offset by p records (this will be used to create "pages" of movies)
// // Sort columns are: title, release_date
//  router.get('/movies/sort/release-date?n=5&p=1')
//
//
//  // Given a movie's title...
//  // Get a list of customers that have currently checked out a copy of the film
//  // include each customer's name, phone number, and account credit
//  router.get('/movies/:movie_title/current')
//
//
// // Given a movie's title...
// // Get a list of customers that have checked out a copy in the past
// // include each customer's name, phone number, and account credit
// // ordered by customer name or ordered by check out date
// router.get('/movies/:movie_title/history/sort/name')
//
//
//
//
//
//  // Look a movie up by title to see: it's synopsis, release date, available inventory (not currently checked-out to a customer), and inventory total
// router.get('/rentals/:movie_title')
//
//
// // See a list of customers that have currently checked out any of the movie's inventory
// router.get('/rentals/:movie_title/customers')
//
//
//
// // Given a customer's id and a movie's title ...
// // "check out" one of the movie's inventory to the customer
// // Establish a return date, Charge the customer's account (cost up to you)
// router.get ('/rentals/:movie_title/check-out')
//
//
// // Given a customer's id and a movie's title ...
// // "check in" one of customer's rentals
// // return the movie to its inventory
// router.get('/rentals/:movie_title/return')
//
//
// // See a list of customers with overdue movies
// // include customer name, movie title, check-out date, and return date
// router.get('/rentals/overdue')


module.exports = router;
