var app = require("../app");
var db = app.get("db");

var Movie = function(id) {
  this.id = id;
}

Movie.all = function(callback) {
  db.movies.find(function(error, movies) {
    if (error|| !movies) {
      callback(error || new Error("Could not retrieve movies"), undefined);
    } else {
      callback(null, movies.map(function(movie) {
        return new Movie(movie.id);
      }))
    };
  })
};






module.exports = Movie;
