var app = require("../app");
var db = app.get("db");


var Customer = function(id) {
  this.id = id
  this.name = name
  this.registered_at = registered_at
  this.address = address
  this.city = city
  this.state = state
  this.postal_code = postal_code
  this.phone = phone
  this.account_credit = account_credit
}

// takes on parameter(callback)-then run db.accounts.find
Customer.all = function(callback) {
  // then run db.accounts.find(no specific id or column - just another callback)
  db.customers.find('*', function(error, customers) {
    if(error || !customers) {
      // handling any error
      callback(error || new Error("Could not retrieve customers"), undefined);
    } else {
      // saying there was no error, accounts is an array and we map it
      callback(null, customers.map(function(customer) {
        // and return to a new instance of the account with id
        return new Customer(customer.id);
      }));
    };
  });
};


module.exports = Customer;
