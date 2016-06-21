var Customer = require("../models/customer")
var Rental = require("../models/rental")

var CustomersController = {

  index: function(req, res, next) {
    Customer.all(function(error, customers) {
      if(error) {
        var err = new Error("Error retrieving customers:\n" + error.message)
        err.status = 500
        next(err)
      } else {
        res.json(customers)
      }
    })
  },

  sort: function(req, res, next) {
    Customer.sort(req.params.column_name, req.params.columns, req.query.n, req.query.p, function(error, customers) {
      if(error) {
        var err = new Error("Error retrieving customers:\n" + error.message)
        err.status = 500
        next(err)
      } else {
        res.json(customers)
      }
    })
  },

  getbyid: function(req, res, next) {
    Customer.sort(req.query.n, req.params.columns, req.params.column_name, req.query.p, function(error, customers) {
      if(error) {
        var err = new Error("Error retrieving customers:\n" + error.message)
        err.status = 500
        next(err)
      } else {
        res.json(customers)
      }
    })
  },

  current: function(req, res, next) {
    // console.log(req.params.id)
    Rental.current(req.params.id, function(error, rentals) {
      if(error) {
        var err = new Error("Error retrieving rentals" + error.message)
        err.status = 500
        next(err)
      } else {
        res.json(rentals)
      }
    })
  }
}

module.exports = CustomersController
