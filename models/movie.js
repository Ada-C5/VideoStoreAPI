// Retrieve a list of all movies (/movies)

// Retrieve a subset of movies (/movies/sort/release-date?n=5&p=1)
// Given a sort column, return n movie records, offset by p records (this will be used to create "pages" of movies)
// Sort columns are
// title
// release_date
// Given a movie's title...
// Get a list of customers that have currently checked out a copy of the film (/movies/Jaws/current)
// include each customer's name, phone number, and account credit
// Get a list of customers that have checked out a copy in the past (/movies/Jaws/history/sort/name)
// include each customer's name, phone number, and account credit
// ordered by customer name or
// ordered by check out date


var app = require("../app");
// var massive = require("massive");
// var db = massive.connectSync({db: "radio_star"});
var db = app.get("db");
// console.log(app);
// Constructor function
var Movie = function(id) {
  this.id = id;
};

// Instance functions


// class
Movie.all = function(callback) {
  db.query("select * from movies", function(error, movies) {
    if(error || !movies) {
      callback(error || new Error("Could not retrieve movies"), undefined);
    } else {
      var allMovies = movies.map(function(movie) {
        return new Movie(movie);
      });
      console.log(allMovies)
      callback(null, allMovies)
    };
  });
};
//
//   return this;
// };
//
// var balanceResultCallback = function(account, callback) {
//   return function(error, result) {
//     if(error) {
//       callback(error, undefined);
//     } else {
//       account.getBalance(function(error, balance) {
//         callback(error, balance);
//       });
//     }
//   };
// };
//
// Movies.prototype.deposit = function(amount, callback) {
//   db.movies_deposit(this.id, amount, balanceResultCallback(this, callback));
//   return this;
// };
//
// Movies.prototype.withdraw = function(amount, callback) {
//   db.movies_withdraw(this.id, amount, balanceResultCallback(this, callback));
//   return this;
// };
//
// Movies.prototype.transfer = function(to, amount, callback) {
//   db.movies_transfer(this.id, to.id, amount, balanceResultCallback(this, callback));
//   return this;
// };
//
// // Class Functions
// Movies.create = function(initialBalance, callback) {
//   db.movies.save({
//     balance: initialBalance
//   }, function(error, account) {
//     if(error || !account) {
//       callback(error || new Error("Could not create account"), undefined);
//     } else {
//       callback(null, new Movies(account.id));
//     }
//   });
// };
//
// Movies.createSync = function(initialBalance) {
//   var account = db.movies.saveSync({
//     balance: initialBalance
//   });
//
//   return new Movies(account.id);
// };
//
// Movies.all = function(callback) {
//   db.movies.find(function(error, movies) {
//     if(error || !movies) {
//       callback(error || new Error("Could not retrieve movies"), undefined);
//     } else {
//       callback(null, movies.map(function(account) {
//         return new Movies(account.id);
//       }));
//     }
//   });
// };
//
// Movies.find = function(id, callback) {
//   db.movies.findOne({id: id}, function(error, account) {
//     if(error || !account) {
//       callback(error || new Error("Movies not found"), undefined);
//     } else {
//       callback(null, new Movies(account.id));
//     }
//   });
// };
//
// // only attach this function if we're in test mode
// if (app.get('env') === 'test') {
//   Movies.close_connection = function() {
//     console.log("closing connection")
//     db.end()
//   }
// }
module.exports = Movie;
