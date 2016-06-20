var Customer = require("../models/customer");

var CustomersController = {

  getCustomers: function(req, res, next) {
    // giving a callback function to handle error or render view
    Customer.all(function(error, customers) {
      if(error) {
        var err = new Error("Error retrieving customer list:\n" + error.message);
        err.status = 500;
        next(err);
      } else {
        res.json(customers)
      }
    });
  },

  sortBy: function(req, res, next) {
    var n = req.query.n;
    var p = req.query.p;
    var field = String(req.params.field)

    Customer.sortBy(field, n, p, function(error, customers) {
      if(error) {
        var err = new Error("Error retrieving customer list:\n" + error.message);
        err.status = 500;
        next(err);
      } else {
        res.json(customers)
      }
    });

  },

  customerCurrent: function(req, res, next) {
    var id = req.params.id

    Customer.current([id], function(error, movies) {
      if(error) {
        var err = new Error("Error retrieving current movies for this customer:\n" + error.message);
        err.status = 500;
        next(err);
      } else {
        res.json(movies)
      }
    })
  },

  customerHistory: function(req, res, next) {

  }
}
module.exports = CustomersController
