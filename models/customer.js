var app = require("../app");
var db = app.get("db");

// Constructor function
var Customer = function(customer) {
  this.id = customer.id;
  this.name = customer.name;
  this.registered_at = customer.registered_at;
  this.postal_code = customer.postal_code;
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

Customer.sortBy = function(input, callback){
  var order = input.shift()
  db.run("Select * From (Select Row_Number() Over (Order By " + order + ") As RowNum, *From customers) customers Where RowNum BETWEEN $1 AND $2;",input, function(error, customers) {
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