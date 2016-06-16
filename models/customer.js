var app = require("../app");
var db = app.get("db");

// Constructor function
var Customer = function(id) {
  this.id = id;
};


Customer.all = function(callback) {
  db.customers.run(function(error, customers) {
    if(error || !customers) {
      callback(error || new Error("Could not retrieve Customers"), undefined);
    } else {
      callback(null, customers.map(function(Customer) {
        return new Customer(customers.id);
      }));
    }
  });
};

module.exports = Customer