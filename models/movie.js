var app = require("../app");
var db = app.get("db");

var Movie = function(movie) {
  this.id = movie.id;
  this.title = movie.title;
  this.overview = movie.overview;
  this.release_date =  movie.release_date;
  this.inventory = movie.inventory;
}

// takes on parameter(callback)-then run db.accounts.find
Movie.all = function(callback) {
  // then run db.accounts.find(no specific id or column - just another callback)
  db.movies.find(function(error, movies) {
    if(error || !movies) {
      // handling any error
      callback(error || new Error("Could not retrieve movies"), undefined);
    } else {
      // saying there was no error, accounts is an array and we map it
      callback(null, movies.map(function(movie) {
        // and return to a new instance of the account with id
        return new Movie(movie);
      }));
    };
  });
};

// Movie.sortByRelease = function(input, callback) {
//   // first parameter is the
//   db.run("SELECT * FROM movies ORDER BY release_date LIMIT $1 OFFSET $2;", input, function(error, movies) {
//     if(error || !movies) {
//       callback(error || new Error("Movies not found"), undefined);
//     } else {
//       callback(null, movies.map(function(movie) {
//         return new Movie(movie)
//       }));
//     };
//   });
// };

Movie.sortBy = function(options, callback) {
  // first parameter is the info from movie controller which was [type, n, p]
  db.movies.find({}, options, function(error, movies) {
    if(error || !movies) {
      callback(error || new Error("Movies not found"), undefined);
    } else {
      callback(null, movies.map(function(movie) {
        return new Movie(movie)
      }));
    };
  });
};


// only attach this function if we're in test mode.
// if (app.get('env') === 'test') {
//   Movie.close_connection = function() {
//     console.log("closing connection")
//     db.end()
//   }
// }

module.exports = Movie;
