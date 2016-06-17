var app = require("../app");
var db = app.get("db");

// Constructor function
var Rental = function(rental) {
  this.title  = rental.title;
  this.id = rental.id;
  this.checkout_date = rental.checkout_date;
  this.due_date = rental.due_date;
};

Rental.rentals = function(input,callback){
  // var order = input.shift()
  db.run("SELECT * FROM rentals INNER JOIN movies ON rentals.movie_id=movies.id;", function(error, rentals) {
    if(error || !rentals) {
      callback(error || new Error("Could not retrieve rentals"), undefined);
    } else {
      callback(null, rentals.map(function(rental) {
        return new Rental(rental);
      }));
    }
  });
}

module.exports = Rental

