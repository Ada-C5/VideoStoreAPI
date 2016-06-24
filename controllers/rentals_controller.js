var Rental = require("../models/rental")
var Movie = require("../models/movie")
var Customer = require("../models/customer")

var RentalsController = {
  view: function(req, res, next) {
    Rental.view(req.params.title, function(error, movies) {
      if(error) {
        var err = new Error("Error retrieving movies:\n" + error.message)
        err.status = 500
        next(err)
      } else {
        res.json(movies)
      }
    })
  },

  customers: function(req, res, next) {
    Rental.customers(req.params.title, function(error, customers) {
      if(error) {
        var err = new Error("Error retrieving customers:\n" + error.message)
        err.status = 500
        next(err)
      } else {
        res.json(customers)
      }
    })
  },

  check_out: function(req, res) {
    var title = req.params.title
    var customer_id = req.params.customer_id

    Rental.check_out(title, customer_id, function(error, result, next) {
      if(error) {
        var err = new Error("Error completing rental:\n" + error.message)
        err.status = 500
        next(err)
      } else {
        res.json(result)
        res.statusCode = 204
      }
    })
  },

  return_rental: function(req, res) {
    console.log("request: " + res)

    Rental.return_rental(title, customer_id, function(error, result, next) {
      if(error) {
        var err = new Error("Error completing rental:\n" + error.message)
        err.status = 500
        next(err)
      } else {
        res.json(result)
        res.statusCode = 204
      }
    })
  }
}

module.exports = RentalsController
