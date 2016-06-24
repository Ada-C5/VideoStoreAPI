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
        var err = new Error("Error:\n" + error.message);
        err.status = 500;
        next(err);
      } else {
        res.json(customers)
      }
    });
  },

//   findTitle: function(req, res, next) {
//     Rental.find (req.params.movie_title, function(error, movies) {
//       if (error) {
//         var err = new Error("No movies found");
//         err.status = 404;
//         next(err);
//       } else {
//         res.json(movies)
//       }
//     })
//   },
//
//   customersNames: function(req, res, next) {
//     Rental.customers (req.params.movie_title, function(error, customerNames) {
//       if (error) {
//         var err = new Error("No customers found");
//         err.status = 404;
//         next(err);
//       } else {
//       res.json(customerNames)


  return: function(req, res, next) {
    // Rental.return([req.body.customer], [req.params.movie.toLowerCase().replace(/ /g, "").replace(/\./g, "")], function(error, customers) {
    Rental.return([2], [req.params.movie.toLowerCase().replace(/ /g, "").replace(/\./g, "")], function(error, customers) {
        if(error) {
        var err = new Error("Error:\n" + error.message);
        err.status = 500;
        next(err);
      } else {
        res.json(customers)
      }
    });
  },

  // See a list of customers with overdue movies (/rentals/overdue)
  // include customer name, movie title, check-out date, and return date
  overdue: function(req, res, next) {
    Rental.overdue(Date.now(), function(error, overdueInfo) {
        if(error) {
        var err = new Error("Error:\n" + error.message);
        err.status = 500;
        next(err);
      } else {
        res.json(overdueInfo)
      }
    });
  }

};


module.exports = RentalsController;
