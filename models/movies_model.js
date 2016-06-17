var app = require("../app");
var db = app.get("db");

var Movie = function(title, inventory) {
  this.title = title;
  this.inventory = inventory;
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
      callback(null, new Movie(movie.title, movie.inventory));
    }
  })
};

Movie.sort = function(column, p, n, callback) {
  // sort by column, for n number of records starting at p
 db.movies.find({}, {
    order: column,
    limit: n,
    offset: p
  }, function(error, movies) {
    if (error || !movies) {
      callback(error || new Error("Could not retrieve movies"), undefined)
    } else {
      callback(null, movies.map (function (movie) {
        return movie
      }))
    }
  })
}






module.exports = Movie;
