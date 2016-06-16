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
      }
    });
  },

  sortBy: function(req, res, next) {
    console.log("bla",req.params.query, req.query.n, req.query.p)
    var n = req.query.n
    var p = req.query.p
    var firstrow = n*(p-1)+1
    var lastrow = n*p
    Customer.sortByName([firstrow,lastrow],function(error, customers) {
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
  }

  // function current() {

  // },

  // function history() {

  // }
}

module.exports = CustomersController
