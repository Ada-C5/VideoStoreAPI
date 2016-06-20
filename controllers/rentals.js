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
    console.log("HALP")
    Rental.checkOut([title, id],function (error, rental) {
      if(error) {
        var err = new Error("Error checking out rental:\n" + error.message);
        err.status = 500;
        next(err);
      } else {
        res.json([{"sample": "BLAH"}])
      }
    });
  },

  // function return () {

  // },

  overdue: function (req, res, next) {

    console.log("ohs ")

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
