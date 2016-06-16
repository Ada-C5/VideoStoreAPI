var app = require("../app")
var db = app.get("db")

// takes on parameter(callback)-then run db.accounts.find
Movie.all = function(callback) {
  // then run db.accounts.find(no specific id or column - just another callback)
  db.movies.find('*', function(error, movies) {
    if(error || !movies) {
      // handling any error
      callback(error || new Error("Could not retrieve movies"), undefined);
    } else {
      // saying there was no error, accounts is an array and we map it
      callback(null, movies.map(function(movie) {
        // and return to a new instance of the account with id
        return new Movie(movie.id);
      }));
    };
  });
};

// Movie.find = function(id, callback) {
//   db.movies.findOne({id: id}, function(error, movie) {
//     if(error || !movie) {
//       callback(error || new Error("Movie not found"), undefined);
//     } else {
//       callback(null, new Movie(movie.id));
//     }
//   })
// }

// only attach this function if we're in test mode.
if (app.get('env') === 'test') {
  Movie.close_connection = function() {
    console.log("closing connection")
    db.end()
  }
}

module.exports = Movie;
