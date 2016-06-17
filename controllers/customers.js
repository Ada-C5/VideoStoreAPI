var Customer = require("../models/customer");

var CustomersController = {
  index: function(req, res, next) {
    Customer.all(function(error, customers) {
      if(error) {
        var err = new Error("Error retrieving customer list:\n" + error.message);
        err.status = 500;
        next(err);
      } else {
        res.json(customers);
      }
    });
  },
  current: function(req, res, next) {
      Customer.find(req.params.id, function(error, customer) {
        if(error) {
          var err = new Error("No such customer");
          err.status = 404;
          next(err);
        } else {
          customer.getCurrent(function(error, current) {
            res.render(current);
          });
        }
      });
    },
  sort: function(req, res, next) {
    var options = {order: req.params.search, limit: req.query.n, offset: req.query.p}
    Customer.sort(options, function(error, customers) {
      if(error) {
        var err = new Error("Error retrieving customer list:\n" + error.message);
        err.status = 500;
        next(err);
      } else {
        res.json(customers);
      }
    });
  },

};


module.exports = CustomersController;
