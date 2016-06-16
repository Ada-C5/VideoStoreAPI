var app = require("../app");
var db = app.get("db");

// Constructor function
var Customer = function(customerInfo) {
  this.id = customerInfo.id;
  this.name = customerInfo.name;

};

Customer.all = function(callback) {
  db.customers.find(function(error, customers) {
    if(error || !customers) {
      callback(error || new Error("Could not retrieve customers"), undefined);
    } else {
      callback(null, customers.map(function(customer) {
        return new Customer(customer);
      }));
    }
  });
};

Customer.find = function(id, callback) {
  db.accounts.findOne({id: id}, function(error, customer) {
    if(error || !customer) {
      callback(error || new Error("Account not found"), undefined);
    } else {
      callback(null, new Customer(customer.id));
    }
  });
};

module.exports = Customer;
