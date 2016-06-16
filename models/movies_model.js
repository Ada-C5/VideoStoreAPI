var app = require("../app");
var db = app.get("db");

var Movie = function(title) {
  this.title = title;
}

Movie.all = function(callback) {
  db.movies.find(function(error, movies) {
    if (error|| !movies) {
      callback(error || new Error("Could not retrieve movies"), undefined);
    } else {
      callback(null, movies.map(function(movie) {
        return new Movie(movie.title);
      }))
    };
  })
};

Movie.findMovie = function(title, callback) {
  db.movies.findOne({title: title}, function(error, movie) {

    if (error || !movie) {

      callback(error || new Error("Movie not found"), undefined);
    } else {
      callback(null, new Movie(movie.title));
    }
  })
};






module.exports = Movie;
