var Rental = require('../models/rental');

var RentalsController = {
  locals: {
    title: 'Rentals'
  }

  },

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

  getRentalsShow: function(req, res, next) {
    Rental.find (req.params.title, function(error, rental) {
      if (error) {
        var err = new Error("No rentals found");
        err.status = 404;
        next(err);
      } else {
        res.json(rental)
      }
    })
  }
}

module.exports = RentalsController
