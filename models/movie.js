var app = require("../app");
var db = app.get("db");
var Customers = require("../models/customer");

var Movie = function(movie) {
  this.id = movie.id;
  this.title = movie.title;
  this.overview = movie.overview;
  this.release_date =  movie.release_date;
  this.inventory = movie.inventory;
  this.checkout_date = movie.checkout_date;
  this.return_date = movie.return_date;
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

// Movie.find = function(title, callback) {
//   db.movies.findMovieByTitle({title: title}, function(error, movie) {
//     if(error || !movie) {
//       callback(error || new Error("No such movie by title"), undefined);
//     } else {
//       callback(null, new Movie(movie))
//     }
//   });
// };

Movie.find_customers_by_movie_title = function(title, callback) {
  db.run("SELECT customers.name, customers.phone, customers.account_credit FROM customers INNER JOIN rentals ON customers.id = rentals.customer_id INNER JOIN movies ON rentals.movie_id = movies.id WHERE movies.title ILIKE $1 AND rentals.return_date IS NULL;", [title], function(error, customers) {
   if(error || !customers) {
     callback(error || new Error("Could not find customers"), undefined);
   } else {
     callback(null, customers.map(function(customer) {
       return new Customers(customer);
     }));
   }
 });
}

Movie.find_customers_by_movie_title_history = function([field], callback) {
  db.run("SELECT customers.name, customers.phone, customers.account_credit FROM customers INNER JOIN rentals ON customers.id = rentals.customer_id INNER JOIN movies ON rentals.movie_id = movies.id WHERE movies.title ILIKE 'Jaws' ORDER BY $1;", [field], function(error, customers) {
   if(error || !customers) {
     callback(error || new Error("Could not find customers"), undefined);
   } else {
     callback(null, customers.map(function(customer) {
       return new Customers(customer);
     }));
   }
 });
}

// Get a list of customers that have checked out a copy in the past (/movies/Jaws/history/sort/name)
// include each customer's name, phone number, and account credit
// ordered by customer name or
// ordered by check out date


// only attach this function if we're in test mode.
// if (app.get('env') === 'test') {
//   Movie.close_connection = function() {
//     console.log("closing connection")
//     db.end()
//   }
// }

module.exports = Movie;
