var Movie = require("../models/movie");
var Customer = require("../models/customer");
var Rental = require("../models/rental");

var RentalsController = {

  findMovie: function(req, res, next) {
  var title = req.params.title;

    Rental.all([title], function (error, rentals) {
      if(error) {
        var err = new Error("Error retrieving movie info:\n" + error.message);
          err.status = 500;
          next(err);
      } else {
        res.json(rentals)
      }
    })
  },

  sortBy: function(req, res, next) {
    var movie = req.params.title;

    Rental.customers_current_rentals(movie, function(error, customers) {
      if(error) {
        var err = new Error("No such customer");
        err.status = 404;
        next(err);
      } else {
        var obj = {};
        if (customers.length === 0) {
          obj["status"] = 204;
        } else {
          obj["status"] = 200;
        }
        obj["customers"] = customers;
        res.json(obj);
      }
    })
  },

  checkout: function(req, res, next) {
    var movie = req.params.title;
    var customer_id = req.body.customer_id;
    console.log(movie, customer_id);

    Rental.createCheckOut(movie, customer_id, function(error) {
      console.log("in createCheckOut method")
      if(error) {
        var err = new Error("Rental checkout failed");
        err.status = 404;
        next(err);
      } else {
        res.json("rental_checkout works");
      }
    })
  },

  return: function(req, res, next) {
    var movie = req.params.title;
    var customer_id = req.body.customer_id;

    console.log(movie, customer_id);
    Rental.returnRental(movie, customer_id, function(error) {
      console.log("in RETURN method")
      if(error) {
        var err = new Error("Rental return failed");
        err.status = 404;
        next(err);
      } else {
        res.json({returnRental: "Rental was properly returned"});
      }
    })
  },

  overdue: function(req, res, next) {
    console.log("1st stop");
    Rental.findOverdue(function(error, customers) {
      if (error) {
        var err = new Error("Error in finding overdue ");
        err.status = 404;
        next(err);
      } else {
        console.log("Final")
        res.json(customers)
      }
    })
  }
}
module.exports = RentalsController;
