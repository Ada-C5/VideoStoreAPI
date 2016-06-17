var Rentals = require("../models/rentals");

var RentalsController = {

  getCustomerRentals: function (request, response, next) {
    // Rentals.find(function(error, rentals) {
    //   if(error) {
    //     var err = new Error("Error retrieving customer's rental list:\n" + error.message);
    //     err.status = 500;
    //     next(err);
    //   } else {
    //     response.json(rentals)
    //   }
    // });
  },
}

module.exports = RentalsController;
