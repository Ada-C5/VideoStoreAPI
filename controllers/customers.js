var Customers = require("../models/customers");

var CustomersController = {

// Baseline project requirement, left for completion purposes:
  // getZomg: function (request, response) {
  //   var locals = {};
  //   locals.zomg = JSON.stringify('It Works!!!!!');
  //   response.render('index', locals);
  // },

  getIndex: function (request, response, next) {
    response.render('index');
  },

  getCustomers: function (request, response, next) {
    Customers.all(function(error, customers) {
      if(error) {
        var err = new Error("Error retrieving customers list:\n" + error.message);
        err.status = 500;
        next(err);
      } else {
        response.json(customers)
      }
    });
  },

  // customer id, sort column, offset (p and n)
  getCustomersSorted: function(request, response) {
    Customers.sort(request.params.column, request.query.p, request.query.n, function(error, data) {
      if(error) {
        var err = new Error("Not Found :(");
        err.status = 404;
      } else {
          response.json(data)
      }

    })
  },
  
  getCustomer: function (request, response) {
    response.render('customer/:id');
  },

  getVideo: function (request, response) {
    response.render('video');
  },

  getRental: function (request, response) {
    response.render('rental');
  }
}

module.exports = CustomersController;
