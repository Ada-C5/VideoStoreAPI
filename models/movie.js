var app = require("../app");
var db = app.get("db");

// Constructor function
var Movie = function(movieInfo) {
  this.id = movieInfo.id;
  this.title = movieInfo.title;
  this.available_inventory = movieInfo.available_inventory;
  this.inventory = movieInfo.inventory;
  this.overview = movieInfo.overview;
  this.release_date = movieInfo.release_date;
};


// Instance functions
Movie.all = function (callback) {
  // this whole thing immediately gets thrown on the event loop and Movie.all finishes and goes to whatever's next. But .run is not finished yet; it still has to go through the event loop and get executed.

  // the callback (second parameter below) is how you deal with the data returned by whatever happened in the first parameter.
  db.run("SELECT * FROM movies;", function(error, movies) { //the error and result are basically coming from .run()
    // after_run(error, result);
    if(error || !movies) {
      //in this case error is always true because we're inside the if-statement for error being truthy. so we're passing "true" to the callback.
      callback(error, undefined);
    } else {
      callback(null, movies.map(function(movie) {
        return new Movie(movie);
      }));
    }
  });
};

// Movie.all(function (error, result){
  // I can also just put callback(error, result); in the callback for db.run above instead of an if-else statement if I want access to both the error and the result in this function

  //but, if I want to modify what the error or result is, I use the if/else in the db.run callback above

  // make sure to deal with both errors and results

  // return result;
  // but make it into a hash so we can use it to initialize
// })

Movie.sort = function (field, n, p, callback) {
  var sort_options = {
    order: field,
    limit: n,
    offset: p
  };
  db.movies.find({}, sort_options, function(error, movies) {
    if(error || !movies) {
      //in this case error is always true because we're inside the if-statement for error being truthy. so we're passing "true" to the callback.
      callback(error, undefined);
    } else {
      callback(null, movies.map(function(movie) {
        return new Movie(movie);
      }));
    }
  });
}



module.exports = Movie;
