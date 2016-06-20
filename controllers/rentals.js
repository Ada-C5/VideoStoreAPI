var Rentals = require("../models/rentals");

var RentalsController = {

  getCurrentRentals: function (request, response, next) {
    Rentals.find_current(request.params.customer_id, function(error, rentals) {
      if(error) {
        var err = new Error("Error retrieving customer's rental list:\n" + error.message);
        err.status = 500;
        next(err);
      } else {
        response.json(rentals)
      }
    });
  },

  getRentalHistory: function (request, response, next) {
    Rentals.find_history(request.params.customer_id, function(error, rentals) {
      if(error) {
        var err = new Error("Error retrieving customer's rental list:\n" + error.message);
        err.status = 500;
        next(err);
      } else {
        response.json(rentals)
      }
    });
  },

  getVideoCurrent: function(request, response, next) {
    Rentals.video_current(request.params.title, function(error, rentals) {
      if(error) {
        var err = new Error("Error retrieving video's rental list:\n" + error.message);
        err.status = 500;
        next(err);
      } else {
        response.json(rentals)
      }
    });
  }
}
//   // customer id, sort column, offset (p and n)
//   getCustomersSorted: function(request, response) {
//     Customers.sort(request.params.column, request.query.p, request.query.n, function(error, customers) {
//       if(error) {
//           var err = new Error("Not Found :(");
//           err.status = 404;
//       } else {
//           response.json(customers)
//       }
//
//     })
//   },
//
//   getCustomer: function (request, response) {
//     response.render('customer/:id');
//   },
//
//   getVideo: function (request, response) {
//     response.render('video');
//   },
//
//   getRental: function (request, response) {
//     response.render('rental');
//   }
// }

module.exports = RentalsController;
