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
  }, 

  getVideoHistory: function(request, response, next) {
    Rentals.find_video_history(request.params.title, request.params.ordered_by, function(error, rentals) {
      if(error) {
        var err = new Error("Error retrieving video's rental list:\n" + error.message);
        err.status = 500;
        next(err);
      } else {
        response.json(rentals)
      }
    })
  },

  postCheckout: function(request, response, next) {
   Rentals.checkout(request.params.title, request.params.customer_id, function(error, rentals) {

    if(error) {
      var err = new Error("That video is not available for checkout:\n" + error.message);
      err.status = 304;
      next(err);
    } else {
      response.json(rentals)
   }
  })
 }
}

module.exports = RentalsController;
