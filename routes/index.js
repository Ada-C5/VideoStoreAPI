var express = require('express');
var router = express.Router();

var Controller = require('../controllers/index');
var MovieController = require('../controllers/movies');
var CustController = require('../controllers/customers');
var RentalController = require('../controllers/rentals');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// router.get('/', Controller.nothing)

// router.get('/zomg', Controller.zomg)


// Retrive a list of all customers
router.get('/customers/', CustController.index);


// Retrive a subset of customers
// Given a sort column, return n customer records, offset by p records (this will be used to create "pages" of customers)
// Sort columns are: name, registered_at, postal_code
// router.get('/customers/sort/:query', CustController.subset);
router.get('/customers/sort/:query', CustController.subset);

// Given a customer's id...
// List the movies they currently have checked out
router.get('/customers/:id/current', CustController.current)


// Given a customer's id...
// List the movies a customer has checked out in the past (ordered by check out date, includes return date)
router.get('/customers/:id/history', CustController.history)


// Retrieve a list of all movies
router.get('/movies', MovieController.index);

// Retrieve a subset of movie
// Given a sort column, return n movie records, offset by p records (this will be used to create "pages" of movies)
// Sort columns are: title, release_date
 router.get('/movies/sort/:query', MovieController.find)
 // router.get('/movies/sort/:query?n=1&p=5', MovieController.subset)
 // query of title or release_date


 // Given a movie's title...
 // Get a list of customers that have currently checked out a copy of the film
 // include each customer's name, phone number, and account credit
 router.get('/movies/:movie/current', MovieController.current)

//
// Given a movie's title...
// Get a list of customers that have checked out a copy in the past
// include each customer's name, phone number, and account credit
// ordered by customer name or ordered by check out date
router.get('/movies/:movie/history/sort/:query', MovieController.history)

// See a list of customers with overdue movies (/rentals/overdue)
// include customer name, movie title, check-out date, and return date
router.get('/rentals/overdue', RentalController.overdue);

// Look a movie up by title to see (/rentals/Jaws)
// it's synopsis
// release date
// available inventory (not currently checked-out to a customer)
// and inventory total
router.get('/rentals/:movie', RentalController.find);

// See a list of customers that have currently checked out any of the movie's inventory (/rentals/Jaws/customers)
router.get('/rentals/:movie/customers/', RentalController.findCustomers);

// Given a customer's id and a movie's title ...
// "check out" one of the movie's inventory to the customer (/rentals/Jaws/check-out)
// Establish a return date
// Charge the customer's account (cost up to you)
router.get('/rentals/:movie/check-out/:id', RentalController.checkOut);


// "check in" one of customer's rentals (/rentals/Jaws/return)
// return the movie to its inventory
router.get('/rentals/:movie/return/:id', RentalController.return);

//HTML API Documentation
router.get('/api/docs', Controller.docsHTML);


//JSON API Documentation
router.get('/api/docs.json', Controller.docsJSON);


module.exports = router;
