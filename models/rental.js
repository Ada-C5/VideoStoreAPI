var app = require("../app");
var Movie = require("./movie.js");
var Customer = require("./customer.js");
var db = app.get("db");

var rental_days = 5; // due date is in 5 days
var rentalFee = 2



// Constructor function
var Rental = function(rentalInfo) {
  this.id = rentalInfo.id;
  this.movie_id = rentalInfo.movie_id;
  this.customer_id = rentalInfo.customer_id;
  this.status = rentalInfo.status; //"returned" and "checkedOut"
};

// show title --> from movies --> overview, release_date, available inventory
Rental.findTitle = function(movie_title, callback) {
  db.movies.findOne({title: movie_title}, function(error, movie) {
    if(error || !movie) {
      callback(error || new Error("Movie with this title not found"), undefined);
    } else {
      callback(null, new Movie(movie));
    }
  });
};

Rental.createCheckOut = function(customer_id, title, callback) {
  Rental.findTitle(title, function(error, movie) {
    if(error || !movie) {
      callback(error);
    } else if (error || movie.available_inventory < 1) {
      callback(error || new Error("Availability issue: All movies of this title are currently checked out"), undefined)
    } else {
      Customer.find(customer_id, function(error, customer) {
        if (error || !customer || customer.account_credit < 2) {
          callback(error || new Error("Insufficient Funds: Account Credit balance is less than $2.00"));
        } else {
          var rentalInfo = {
            movie_id: movie.id,
            customer_id: customer_id,
            created_at: Date(),
            updated_at: Date(),
            status: "checked-out",
            return_date: new Date(new Date().getTime()+(5*24*60*60*1000))
          };
          var new_balance = customer.account_credit - rentalFee
          db.customers.save({id: customer.id, account_credit: new_balance}, function(error,updated){
            if (error){
              callback(error || new Error("Update Not Succesfull: Unable to update customer account credit"))
            } else{
              db.rentals.save(rentalInfo);
              callback(null, {rentalInfo: new Rental(rentalInfo), customerInfo: new Customer(customer)});
            }
          })
        }
      })

    }
  })

};

module.exports = Rental;
