var Customers = require("../models/customers");

var CustomersController = {

  getIndex: function (request, response, next) {
    response.render('index');
  },

  getCustomers: function (request, response, next) {
    Customers.all(function(error, customers) {
      if(error) {
        var err = new Error("Error retrieving customer list." + error.message);
        err.status = 500;
        err.error = "Error retrieving customer list."
        response.json(err)
      } else {
        response.json(customers)
      }
    });
  },

  // customer id, sort column, offset (p and n)
  getCustomersSorted: function(request, response) {
    Customers.sort(request.params.column, request.query.p, request.query.n, function(error, customers) {
      if(error) {
        var err = new Error("Not found :(" + error.message);
        err.status = 404;
        err.error = "Not found :("
        response.json(err)
      } else {
          response.json(customers)
      }

    })
  },
}

module.exports = CustomersController;
