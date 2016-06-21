var Rentals = require("../models/rentals");

var RentalsController = {

  getCurrentRentals: function (request, response, next) {
    Rentals.find_current(request.params.customer_id, function(error, rentals) {
      if(error) {
        var err = new Error("Error retrieving customer's current rentals." + error.message);
        err.status = 500;
        err.error = "Error retrieving customer's current rentals."
        response.json(err)
      } else {
        response.json(rentals)
      }
    });
  },

  getRentalHistory: function (request, response, next) {
    Rentals.find_history(request.params.customer_id, function(error, rentals) {
      if(error) {
        var err = new Error("Error retrieving customer's rental history." + error.message);
        err.status = 500;
        err.error = "Error retrieving customer's rental history."
        response.json(err)
      } else {
        response.json(rentals)
      }
    });
  },

  getVideoCurrent: function(request, response, next) {
    Rentals.video_current(request.params.title, function(error, rentals) {
      if(error) {
       var err = new Error("Error retrieving video rentals list." + error.message);
        err.status = 500;
        err.error = "Error retrieving video rentals list."
        response.json(err)
      } else {
        response.json(rentals)
      }
    });
  },

  getVideoHistory: function(request, response, next) {
    Rentals.find_video_history(request.params.title, request.params.ordered_by, function(error, rentals) {
      if(error) {
      var err = new Error("Error retrieving video rentals list." + error.message);
      err.status = 500;
      err.error = "Error retrieving video rentals list."
      response.json(err)
      } else {
        response.json(rentals)
      }
    })
  },

  postCheckout: function(request, response, next) {
   Rentals.checkout(request.params.title, request.params.customer_id, function(error, rentals) {
    if(error) {
      var err = new Error("That video is not available for checkout." + error.message);
      err.status = 304;
      err.error = "That video is not available for checkout"
      response.json(err)
    } else {
      response.json(rentals)
    }
   })
  },

  postCheckin: function(request, response, next) {
    Rentals.checkin(request.params.title, request.params.customer_id, function(error, rentals) {
      if(error) {
      var err = new Error("That video is not available for return." + error.message);
      err.status = 304;
      err.error = "That video is not available for return"
      response.json(err)
      } else {
        response.json(rentals)
      }
    })
  },

  getOverdue: function(request, response, next) {
    Rentals.overdue(function(error, overdue_videos) {
      if(error) {
        var err = new Error("Overdue rentals not found:\n" + error.message);
        err.status = 304;
        next(err);
      } else {
        response.json(overdue_videos)
      }
    })
  }
}

module.exports = RentalsController;
