var app = require("../app");
var db = app.get("db");

// Constructor function
var Rental = function(rentalInfo) {
  this.id = rentalInfo.id;
  this.movie_id = rentalInfo.movie_id;
  this.customer_id = rentalInfo.customer_id;
  this.status = rentalInfo.status; //"returned" and "checkedOut"
};

// show title --> from movies --> overview, release_date, available inventory
Rental.find = function(movie_id, callback) {
  db.movies.find({id: movie_id}, function(error, customer) {
    if(error || !customer) {
      callback(error || new Error("Account not found"), undefined);
    } else {
      callback(null, new Customer(customer));
    }
  });
};
