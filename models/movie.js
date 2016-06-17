var app = require("../app");
var db = app.get("db");

// Constructor function
var Movie = function(movie) {
  this.id = movie.id;
  this.title = movie.title;
  this.release = movie.release_date;
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
    if(error || !movies) {
      callback(error || new Error("Could not retrieve Movies"), undefined);
    } else {
      callback(null, movies.map(function(movie) {
        return new Movie(movie);
      }));
    }
  });
};

module.exports = Movie