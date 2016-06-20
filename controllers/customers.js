var Customer = require('../models/customer')
var Rental = require('../models/rental')

CustomersController = {
  locals: {
    title: 'CUSTOMERS CUSTOMERS CUSTOMERS'
  },

  getCustomers: function(req, res) {
    Customer.all (function (error, customers) {
      if (error) {
        var err = new Error("Error retrieving customer list:\n" + error.message);
        err.status = 500;
        next(err);
      } else {
        res.json(customers)
      }
    })
  },

  getCustomersShow: function (req, res, next) {
    Customer.find(req.params.name, function(error, customer) {
      if(error) {
        var err = new Error("No such customer");
        err.status = 404;
        next(err);
      } else {
        res.json(customer)
      }
    })
  },

  getCustomersSort: function (req, res, next) {
    Customer.sort(req.params.field, req.query.n, req.query.p, function(error, customer) {
      if (error) {
        var err = new Error("Error retrieving customer list:\n" + error.message);
        err.status = 500;
        next(err);
      } else {
        res.json(customer)
      }
    })
  },

  getRentalsCurrent: function (req, res, next) {
    Rental.findRentals(req.params.id, function (error, rental) {
      if (error) {
        var err = new Error("Error retrieving rental list:\n" + error.message);
        err.status = 500;
        next(err);
      } else {
        console.log(rental)
        res.json(rental)
      }
    })
  }
}

module.exports = CustomersController
