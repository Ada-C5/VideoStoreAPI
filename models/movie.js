var app = require("../app");
var db = app.get("db");

// Constructor function
var Movie = function(movie) {
  this.id = movie.id;
  this.title = movie.title;
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

module.exports = Movie