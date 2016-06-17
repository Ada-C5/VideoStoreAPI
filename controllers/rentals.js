var Rental = require('../models/rental')

RentalsController = {
  locals: {
    title: 'RENTALS RENTALS RENTALS'
  },

 getRentals: function(req, res) {
    Rental.all (function (error, movies) {
      if (error) {
        var err = new Error("Error retrieving rental list:\n" + error.message);
        err.status = 500;
        next(err);
      } else {
        res.json(movies)
      }
    })
  },

  getRentalsShow: function(req, res, next) {
    Rental.find (req.params.title, function(error, rental) {
      if (error) {
        var err = new Error("No such rentals");
        err.status = 404;
        next(err);
      } else {
        res.json(rental)
      }
    })
  }
}

module.exports = RentalsController
