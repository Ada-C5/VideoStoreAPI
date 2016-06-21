var app = require("../app");
var db = app.get("db");

var Rental = function(rental) {
  this.id = rental.id;
  this.title = rental.title;
  this.name = rental.name;
  this.checkout_date = rental.checkout_date;
  this.due_date = rental.due_date;
  this.return_date = rental.return_date;
}

module.exports = Rental;
var Customer = require("../models/customer");
var Movie = require("../models/movie")

Rental.all = function (title, callback) {
  console.log(title)
  db.run("select * from (select * from rentals, movies where rentals.movie_id=movies.id) as movie_rentals where movie_rentals.title = $1 order by due_date;", title, function (error, rentals) {
    console.log(rentals)
    if(error || !rentals) {
      callback(error || new Error("Could not retrieve rentals"), undefined);
    } else {
      callback(null, rentals.map(function (rental) {
        return new Rental(rental);
      }));
    }
  });


};
