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

  sortName: function(req, res, next) {

  },

  sortRegistered: function(req, res, next) {

  },

  sortPostal: function(req, res, next) {

  },

  customerCurrent: function(req, res, next) {

  },

  customerHistory: function(req, res, next) {
    
  }

module.exports = CustomersController
