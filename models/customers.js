var app = require("../app");
var db = app.get("db");

// Constructor function
var Customers = function(id) {
  this.id = id;
};

Customers.all = function(callback) {
  db.customers.find(function(error, customers) {
    if(error || !customers) {
      callback(error || new Error("Could not retrieve customers"), undefined);
    } else {
      callback(null, customers.map(function(customer) {
        return new Customers(customer);
      }));
    }
  });
};


Customers.sort = function(column, p, n, callback) {
 db.customers.find({}, {
    order: column,
    limit: n,
    offset: p
  }, function(error, customers) {
    if (error || !customers) {
      callback(new Error("Could not retrieve customers"), undefined)
    } else {
      callback(null, customers.map(function(customer) {
        return customer
      }));
    }
  });
}


module.exports = Customers;
