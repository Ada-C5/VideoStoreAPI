var Rental = require('../models/rental');

var RentalsController = {

//   /rentals/:movie
//  returns overview, release_date available inventory and total inventory
  find: function(req, res, next) {
    Rental.search([req.params.movie.toLowerCase().replace(/ /g, "").replace(/\./g, "")], function(error, movie) {
        if(error) {
        var err = new Error("Error retrieving movie:\n" + error.message);
        err.status = 500;
        next(err);
      } else {
        res.json(movie)
      }
    });
  },

  findCustomers: function(req, res, next) {
    Rental.searchCust(['true', req.params.movie.toLowerCase().replace(/ /g, "").replace(/\./g, "")], function(error, customers) {
        if(error) {
        var err = new Error("Error retrieving customers:\n" + error.message);
        err.status = 500;
        next(err);
      } else {
        res.json(customers)
      }
    });
  },

  checkOut: function(req, res, next) {
    // Rental.checkout([req.body.customer], [req.params.movie.toLowerCase().replace(/ /g, "").replace(/\./g, "")], function(error, customers) {
    Rental.checkout([2], [req.params.movie.toLowerCase().replace(/ /g, "").replace(/\./g, "")], function(error, customers) {
        if(error) {
        var err = new Error("Error retrieving customers:\n" + error.message);
        err.status = 500;
        next(err);
      } else {
        res.json(customers)
      }
    });
  },

  return: function(req, res, next) {
    // Rental.return([req.body.customer], [req.params.movie.toLowerCase().replace(/ /g, "").replace(/\./g, "")], function(error, customers) {
    Rental.return([2], [req.params.movie.toLowerCase().replace(/ /g, "").replace(/\./g, "")], function(error, customers) {
        if(error) {
        var err = new Error("Error retrieving customers:\n" + error.message);
        err.status = 500;
        next(err);
      } else {
        res.json(customers)
      }
    });
  }

  // getRentalsShow: function(req, res, next) {
  //   Rental.find (req.params.title, function(error, rental) {
  //     if (error) {
  //       var err = new Error("No rentals found");
  //       err.status = 404;
  //       next(err);
  //     } else {
  //       res.json(rental)l
  //     }
  //   });
  // }
};

module.exports = RentalsController;
