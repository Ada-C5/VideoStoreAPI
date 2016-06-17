var Customers = require("../models/customers");

var CustomersController = {

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

  getZomg: function (request, response) {
    var locals = {};
    locals.zomg = JSON.stringify('It Works!!!!!');
    response.render('index', locals);
  },

  getCustomer: function (request, response) {
    response.render('customer');
  },

  getVideo: function (request, response) {
    response.render('video');
  },

  getRental: function (request, response) {
    response.render('rental');
  }
}

module.exports = CustomersController;
