var app = require("../app");
var db = app.get("db");
var Cust = function(cust) {
  this.id = cust;
  // this.id = cust.id;
  // this.name = cust.name;
  // this.address = cust.address;
};

var Movie = function(movie) {
  this.title = movie.title;
  // this.id = cust.id;
  // this.name = cust.name;
  // this.address = cust.address;
};

// Instance functions


// class
Cust.all = function(callback) {
  db.query("select * from customers", function(error, custs) {
    if(error || !custs) {
      callback(error || new Error("Could not retrieve custs"), undefined);
    } else {
      var allCusts = custs.map(function(cust) {
        return new Cust(cust);
      });
      // console.log(allCusts)
      callback(null, allCusts)
    };
  });
};

Cust.sort = function(query, n, p, callback) {
  db.customers.find({}, {
    order: query,
    limit: n,
    offset: p
  }, function(error, custs) {
    if(error || !custs) {
      callback(error || new Error("Could not retrieve customer"), undefined);

    // } else if ((query != "name") && (query != "registered_at") && (query != "postal_code")) {
    //   callback(error || new Error("Undefined sort term"), undefined);
    } else {
      var allCusts = custs.map(function(cust) {
        return new Cust(cust);
      });
      callback(null, allCusts)
    };
  });
};

Cust.find = function(input, callback) {
  // find all rentals that this customer has checked out
  // console/.log(input)
  db.run("SELECT * FROM movies INNER JOIN rentals ON rentals.movie_id=movies.id WHERE rentals.customer_id=$1 and rentals.checked=$2;", input, function(error, rentals) {
      console.log(rentals)
   if(error || !rentals) {
      callback(error || new Error("Could not retrieve customers rentals"), undefined);
    } else {
      callback(null, rentals.map(function(rental) {
        return rental;
      }));
    };
  });
};
// Cust.find = function(ids, callback) {
//   // find all rentals that this customer has checked out
//     db.rentals.find({customer_id: ids, checked: "true"}, function(error, rentals) {
//       // console.log(rentals)
//     if(error || !rentals) {
//       callback(error || new Error("Could not retrieve rentals"), undefined);
//     } else {
//         // callback(null, rentals.map(function(rental) {
//         var arrayOfMovies = [];
//
//         var allMovies = rentals.map(function(rental) {
//           console.log(rental)
//           db.query("select * from movies where id=$1", [rental.movie_id], function(error, movie) {
//           // console.log(rental.movie_id)
//             // new Movie(rental);
//             return arrayOfMovies.push(new Movie(movie[0]))
//             console.log(arrayOfMovies)
//             // console.log(movie[0].title)
//             // return arrayOfMovies;
//           });
//             // console.log(arrayOfMovies)
//
//           // return new Movie(movie[0]);
//         });
//         console.log(allMovies)
//         console.log(arrayOfMovies)
//         // return arrayOfMovies;
//         callback(null, arrayOfMovies)
//       // console.log(arrayOfMovies)
//       // callback(null, movie)
//     };
//   });
// };


Cust.history = function(input, callback) {
  db.run("SELECT * FROM movies INNER JOIN rentals ON rentals.movie_id=movies.id WHERE rentals.customer_id=$1 and rentals.checked=$2 ORDER BY rentals.rental_date;", input, function(error, rentals) {
      console.log(rentals)
   if(error || !rentals) {
      callback(error || new Error("Could not retrieve customers rentals"), undefined);
    } else {
      callback(null, rentals.map(function(rental) {
        return (rental);
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
// Custs.prototype.deposit = function(amount, callback) {
//   db.custs_deposit(this.id, amount, balanceResultCallback(this, callback));
//   return this;
// };
//
// Custs.prototype.withdraw = function(amount, callback) {
//   db.custs_withdraw(this.id, amount, balanceResultCallback(this, callback));
//   return this;
// };
//
// Custs.prototype.transfer = function(to, amount, callback) {
//   db.custs_transfer(this.id, to.id, amount, balanceResultCallback(this, callback));
//   return this;
// };
//
// // Class Functions
// Custs.create = function(initialBalance, callback) {
//   db.custs.save({
//     balance: initialBalance
//   }, function(error, account) {
//     if(error || !account) {
//       callback(error || new Error("Could not create account"), undefined);
//     } else {
//       callback(null, new Custs(account.id));
//     }
//   });
// };
//
// Custs.createSync = function(initialBalance) {
//   var account = db.custs.saveSync({
//     balance: initialBalance
//   });
//
//   return new Custs(account.id);
// };
//
// Custs.all = function(callback) {
//   db.custs.find(function(error, custs) {
//     if(error || !custs) {
//       callback(error || new Error("Could not retrieve custs"), undefined);
//     } else {
//       callback(null, custs.map(function(account) {
//         return new Custs(account.id);
//       }));
//     }
//   });
// };
//
// Custs.find = function(id, callback) {
//   db.custs.findOne({id: id}, function(error, account) {
//     if(error || !account) {
//       callback(error || new Error("Custs not found"), undefined);
//     } else {
//       callback(null, new Custs(account.id));
//     }
//   });
// };
//
// // only attach this function if we're in test mode
// if (app.get('env') === 'test') {
//   Custs.close_connection = function() {
//     console.log("closing connection")
//     db.end()
//   }
// }
module.exports = Cust;
