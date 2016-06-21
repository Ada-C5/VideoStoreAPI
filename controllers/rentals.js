var Rental = require('../models/rental');

var RentalController = {
  // locals: {
  //   title: 'Rentals'
  // },



  getRentals: function(req, res) {
    Rental.all (function (error, movies) {
      if (error) {
        var err = new Error( "Sorry, We're having problems retrieving rental list:\n" + error.message);
        err.status = 500
        next(err);
      } else {
        res.json(movies)
      }
    })
  },

  findTitle: function(req, res, next) {
    Rental.find (req.params.movie_title, function(error, movies) {
      if (error) {
        var err = new Error("No movies found");
        err.status = 404;
        next(err);
      } else {
        res.json(movies)
      }
    })
  },

  customersNames: function(req, res, next) {
    Rental.customers (req.params.movie_title, function(error, customerNames) {
      if (error) {
        var err = new Error("No customers found");
        err.status = 404;
        next(err);
      } else {
      res.json(customerNames)
      }
    })
  }
}

module.exports = RentalController
