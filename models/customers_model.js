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

Customer.sort = function(column, p, n, callback) {
  // sort by column, for n number of records starting at p
 db.customers.find({}, {
    order: column,
    limit: n,
    offset: p
  }, function(error, customers) {
    if (error || !customers) {
      callback(error || new Error("Could not retrieve customers"), undefined)
    } else {
      callback(null, customers.map (function (customer) {
        return customer
      }))
    }
  })
}

module.exports = Customer;
