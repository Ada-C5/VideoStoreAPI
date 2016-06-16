var Customer = require("../models/customer")

var CustomersController = {
  index: function(req, res, next) {
    Customer.all(function(error, customers) {
      if(error) {
        var err = new Error("Error retrieving customer list:\n" + error.message);
        err.status = 500;
        next(err);
      } else {
        res.json(customers)
        // res.render("accounts/index", {
        //   accounts: accounts
        // });
      }
    });
  },

  function sortBy() {

  },

  function current() {

  },

  function history() {

  }
}

modules.exports = CustomersController
