var app = require("../app");
var db = app.get("db");

var Customer = function(id) {
  this.id = id;
}

Customer.all = function(callback) {
  db.customers.find(function(error, customers) {
    if (error|| !customers) {
      callback(error || new Error("Could not retrieve customers"), undefined);
    } else {
      callback(null, customers.map(function(customer) {
        return new Customer(customer.id);
      }))
    };
  })
};

module.exports = Customer;
