var app = require("../app");
var db = app.get("db");

var Customers = function(id) {
  this.customer_id = id;
};

Customers.all = function(callback) {
  db.run("select * from customers;", function(error, result){
    if(error) {
      callback(error, undefined);
    } else {
      callback(null, result);
    }
  });
};

Customers.nameSort = function(options, callback) {
  db.customers.find({}, options, function(error, customers) {
    if(error || !customers) {
      callback(error || new Error("Could not retrieve customers"), undefined);
    } else {
      console.log(customers)
      callback && callback(null, customers);
    }
  });
};

Customers.registeredSort = function(options, callback) {
  db.customers.find({}, options, function(error, customers){
    if(error || !customers) {
      callback(error || new Error("Could not retrieve customers"), undefined);
    } else {
      callback(null, customers);
    }
  });
};

Customers.postalSort = function(options, callback) {
  db.customers.find({}, options, function(error, customers){
    if(error || !customers) {
      callback(error || new Error("Could not retrieve customers"), undefined);
    } else {
      callback(null, customers);
    }
  });
};

Customers.currentrentals = function(cust_id, callback){
  db.run("select movies.title, rentals.customer_id, rentals.returned_date, rentals.checkout_date from rentals, movies where rentals.customer_id = $1 and rentals.title = movies.title and rentals.returned_date is null;", [cust_id], function(error, result){
    if(error || !result) {
      callback(error || new Error("Could not retrieve data"), undefined);
    } else {
      callback(null, result);
    }
  });
};

Customers.pastRentals = function(cust_id, callback){
  db.rentals.where('customer_id = $1 and returned_date is not null order by checkout_date',  [cust_id], function(error, result){
    if(error || !result) {
      callback(error || new Error("Could not retrieve data"), undefined);
    } else {
      callback(null, result);
    }
  });
};

Customers.end = function () { db.end() }

module.exports = Customers;
