var app = require("../app");
var db = app.get("db");

// Constructor function
var Customer = function(customer) {
  this.id = customer.id;
  this.name = customer.name;
};


Customer.all = function(callback) {
  db.run("SELECT * FROM customers;", function(error, customers) {
    if(error || !customers) {
      callback(error || new Error("Could not retrieve Customers"), undefined);
    } else {
      callback(null, customers.map(function(customer) {
        return new Customer(customer);
      }));
    }
  });
};

Customer.sortByName = function(input, callback){
  db.run("Select * From (Select Row_Number() Over (Order By name) As RowNum, *From customers) customers Where RowNum BETWEEN $1 AND $2;",input, function(error, customers) {
    if(error || !customers) {
      callback(error || new Error("Could not retrieve Customers"), undefined);
    } else {
      callback(null, customers.map(function(customer) {
        return new Customer(customer);
      }));
    }
  });
};
module.exports = Customer