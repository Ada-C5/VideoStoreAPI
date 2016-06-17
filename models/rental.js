var app = require("../app");
var db = app.get("db");

// Constructor function
var Rental = function(rental) {
  this.title  = rental.title;
  this.id = rental.id;
  this.checkout_date = rental.checkout_date;
  this.due_date = rental.due_date;
  this.status = rental.status
};

Rental.currentCheckedOut = function(input,callback){
  // var order = input.shift()
  db.run("select * from (select * from rentals,movies where rentals.movie_id=movies.id) as joined where customer_id=$1 and status=$2;",input, function(error, rentals) {
    if(error || !rentals) {
      callback(error || new Error("Could not retrieve rentals"), undefined);
    } else {
      callback(null, rentals.map(function(rental) {
        return new Rental(rental);
      }));
    }
  });
}

Rental.all = function (input,callback) {
  // var order = input.shift()
  db.run("SELECT * FROM (SELECT customer_id, checkout_date FROM rentals WHERE (SELECT id FROM movies WHERE movies.title = $1) = movie_id) as new_ids JOIN customers ON (new_ids.customer_id = customers.id) ORDER BY " + order + ";", input, function (error, rentals) {
    if(error || !rentals) {
      callback(error || new Error("Could not retrieve rentals"), undefined);
    } else {
      callback(null, rentals.map(function (rental) {
        return new Rental(rental);
      }));
    }
  });
}


module.exports = Rental
