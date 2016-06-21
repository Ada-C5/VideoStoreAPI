var app = require("../app");
var db = app.get("db");

// console.log(db)
var Movie = function(movie) {
  this.id = movie.id;
  this.title = movie.title;
  this.release_date = movie.release_date;
  this.synopsis = movie.overview;
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
      // console.log(allMovies)
      callback(null, allMovies)
    };
  });
};

Movie.sort = function(query, n, p, callback) {
  db.movies.find({}, {
    order: query,
    limit: n,
    offset: p
  }, function(error, movies) {
    if(error || !movies) {
      callback(error || new Error("Could not retrieve movies"), undefined);
    } else {
      var allMovies = movies.map(function(movie) {
        return new Movie(movie);
      });
      callback(null, allMovies)
    };
  });
};


Movie.find = function(input, callback) {
  db.run("SELECT customers.* FROM movies INNER JOIN rentals ON rentals.movie_id=movies.id INNER JOIN customers ON customers.id=rentals.customer_id WHERE rentals.checked=$1 AND movies.title=$2", input, function(error,customers) {
   if(error || !customers) {
      callback(error || new Error("Could not retrieve customers customers"), undefined);
    } else {
      callback(null, customers.map(function(customer) {
        return (customer);
      }));
    };
  });
};

Movie.history = function(input, query, callback) {
  console.log(input)
  db.run("SELECT customers.* FROM movies INNER JOIN rentals ON rentals.movie_id=movies.id INNER JOIN customers ON customers.id=rentals.customer_id WHERE rentals.checked = $1 AND movies.title=$2 ORDER BY " + query + ";", input, function(error,customers) {
   if(error || !customers) {
      callback(error || new Error("Could not retrieve customers customers"), undefined);
    } else {
      callback(null, customers.map(function(customer) {
        return (customer);
      }));
    }
  });
}
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

// only attach this function if we're in test mode
if (app.get('env') === 'test') {
  Movie.close_connection = function() {
    console.log("closing connection")
    db.end()
  }
}
module.exports = Movie;
