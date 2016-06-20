var app = require("../app");
var Movie = require("./movie.js");
var db = app.get("db");

// Constructor function
var Rental = function(rentalInfo) {
  this.id = rentalInfo.id;
  this.movie_id = rentalInfo.movie_id;
  this.customer_id = rentalInfo.customer_id;
  this.status = rentalInfo.status; //"returned" and "checkedOut"
};

// show title --> from movies --> overview, release_date, available inventory
Rental.findTitle = function(movie_title, callback) {
  db.movies.find({title: movie_title}, function(error, movies) {
    if(error || !movies) {
      callback(error || new Error("Movie with this title not found"), undefined);
    } else {
      callback(null, movies.map(function(movie) {
        return new Movie(movie)
      }))
    }
  });
};

module.exports = Rental;
