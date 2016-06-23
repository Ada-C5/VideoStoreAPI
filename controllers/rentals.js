var Rental = require("../models/rental")
var Movie = require("../models/movie")
var Customer = require("../models/customer")

var RentalsController = {

  lookupMovie: function (req, res, next) {
    var title = req.params.movie

    Movie.rentalInfo([title], function (error, rentals) {
      if(error) {
        var err = new Error("Error retrieving movie info:\n" + error.message);
        err.status = 500;
        next(err);
      } else {
        res.json(rentals)
      }
    })},

  currentlyCheckedOut: function (req, res, next) {
    var title = req.params.movie

    Customer.currentlyCheckedOut([title],function (error, customers) {
      if(error) {
        var err = new Error("Error retrieving overdue list:\n" + error.message);
        err.status = 500;
        next(err);
      } else {
        res.json(customers)
      }
    });
  },

  checkOut: function (req, res, next) {
    var title = req.params.movie
    var id = 55
    // need to test to see if customer's id comes in body
    // if we don't want to have them passed in the body we can alter the url to take a
    // second parameter ->/rentals/:movie/check-out/:cust_id

    Rental.checkOut([title, id],function (error, rental) {
      if(error) {
        var err = new Error("Error checking out rental:\n" + error.message);
        err.status = 500;
        next(err);
      } else {
        res.json(rental)
      }
    });
  },

  return: function (req, res, next) {
    var title = req.params.movie
    var id = 55
    // need to test to see if customer's id comes in body

    Rental.return([title, id],function (error, rental) {
      if(error) {
        var err = new Error("Error checking out rental:\n" + error.message);
        err.status = 500;
        next(err);
      } else {
        res.json(rental)
      }
    });
  },

  overdue: function (req, res, next) {
    Rental.overdueList(function (error, rentals) {
      if(error) {
        var err = new Error("Error retrieving overdue list:\n" + error.message);
        err.status = 500;
        next(err);
      } else {
        res.json(rentals)
      }
    });
  }
}

module.exports = RentalsController
