var app = require("../app");
var db = app.get("db");

// Constructor function
var Movie = function(movie) {
  this.id = movie.id;
  this.title = movie.title;
  this.release = movie.release_date;
  this.overview = movie.overview;
  this.inventory = movie.inventory;
  if (movie.available_inventory) {
    this.available_inventory = movie.available_inventory
  }
};


Movie.all = function(callback) {
  db.run("SELECT * FROM movies;", function(error, movies) {
    if(error || !movies) {
      callback(error || new Error("Could not retrieve movies"), undefined);
    } else {
      callback(null, movies.map(function(movie) {
        return new Movie(movie);
      }));
    }
  });
};

Movie.sortBy = function(input, callback){
  var order = input.shift()
  db.run("Select * From (Select Row_Number() Over (Order By " + order + ") As RowNum, *From movies) movies Where RowNum BETWEEN $1 AND $2;",input, function(error, movies) {
    // console.log("luff ", movies)
    if(error || !movies) {
      callback(error || new Error("Could not retrieve Movies"), undefined);
    } else {
      callback(null, movies.map(function(movie) {
        return new Movie(movie);
      }));
    }
  });
};

Movie.rentalInfo = function(input, callback) {
  db.run("SELECT overview, release_date, inventory, (inventory - (SELECT count(*)FROM rentals WHERE (SELECT id FROM movies WHERE movies.title = $1) = movie_id AND status='checked_out')) as available_inventory FROM movies WHERE title = $1;",input, function(error, movie) {
    if(error || !movie) {
      callback(error || new Error("Could not retrieve movie info"), undefined);
    } else {
      callback(null, movie.map(function(movie) {
        return new Movie(movie);
      }));
    }
  });
};

module.exports = Movie
