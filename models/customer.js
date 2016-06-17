var app = require("../app");
var db = app.get("db");

// Constructor function
var Customer = function(customerInfo) {
  this.id = customerInfo.id;
  this.name = customerInfo.name;
  this.address = customerInfo.address;
  this.city = customerInfo.city;
  this.state = customerInfo.state;
  this.postal_code = customerInfo.postal_code;
  this.account_credit = customerInfo.account_credit;
  this.phone = customerInfo.phone;
  this.registered_at = customerInfo.registered_at;
  this.created_at = customerInfo.created_at;
  this.updated_at = customerInfo.updated_at;
};

// Instance functions

Customer.prototype.getCurrent = function(callback) {
  db.customers.findOne(this.id, function(error, result) {
    if(error) {
      callback(error, undefined);
    } else {
      // var rentals = rentals where cutomer id = user_id and status = "checkout"
      callback(null, result.balance);
    }
  });

  return this;
};

// Customer.prototype.getCurrent = function(callback) {
//   db.customers.findOne(this.id, function(error, result) {
//     if(error) {
//       callback(error, undefined);
//     } else {
//       callback(null, result.balance);
//     }
//   });
//
//   return this;
// };


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
      callback(null, new Customer(customer));
    }
  });
};

Customer.sort = function(options,callback) {
  db.customers.find({}, options, function(error, customers) {
    if(error || !customers) {
      callback(error || new Error("Could not retrieve customers"), undefined);
    } else {
      callback(null, customers.map(function(customer) {
        return new Customer(customer);
      }));
    }
  });
};

module.exports = Customer;
