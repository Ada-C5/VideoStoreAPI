var app = require("../app");
var db = app.get("db");

var Rental = function(rental) {
  this.id = rental.id;
  this.title = rental.title;
  this.name = rental.name;
  this.checkout_date = rental.checkout_date;
  this.due_date = rental.due_date;
  this.return_date = rental.return_date;
  this.overview = rental.overview;
  this.inventory = rental.inventory;
  this.release_date = rental.release_date;
}

module.exports = Rental;
var Customer = require("../models/customer");
var Movie = require("../models/movie")

Rental.all = function (title, callback) {
  db.run("select * from (select * from rentals, movies where rentals.movie_id=movies.id) as movie_rentals where movie_rentals.title = $1 order by due_date;", title, function (error, rentals) {
    if(error || !rentals) {
      callback(error || new Error("Could not retrieve rentals"), undefined);
    } else {
      callback(null, rentals.map(function (rental) {
        return new Rental(rental);
    }));
    }
  });
};

// Rental.find = function (title, callback) {
//   db.rentals.find({movie_id: movie_id, customer_id: customer_id}, function (error, rentals) {
//     if(error || !rentals) {
//       callback(error || new Error("Rentals not found"), undefined);
//     } else {
//       callback(null, rentals.map(function(rental) {
//         return new Rental(rental)
//       }));
//     };
//   });
// };

Rental.sortBy = function(options, callback) {
  // first parameter is the info from movie controller which was [type, n, p]
  db.rentals.find({}, options, function(error, rentals) {
    if(error || !rentals) {
      callback(error || new Error("Rentals not found"), undefined);
    } else {
      callback(null, rentals.map(function(rental) {
        return new Rental(rental)
      }));
    };
  });
};

Rental.customers_current_rentals = function(title, callback) {
  db.rental.customers_current_rentals([title], function(error, customers) {
   if(error || !customers) {
     callback(error || new Error("Could not find customers"), undefined);
   } else {
     callback(null, customers.map(function(customer) {
       return new Customer(customer);
     }));
   }
 });
};

Rental.createCheckOut = function(title, customer_id, callback) {
  console.log("in rental model", title, customer_id)
  Rental.find(title, function(error, movie) {

    var today = new Date();
    var now = new Date();
    var dueDate = new Date(now);
    var numberOfDaysToRent = 10;
    dueDate.setDate(dueDate.getDate() + numberOfDaysToRent);
    console.log("date returnDate is:", dueDate)
    console.log(error, movie)
    db.rentals.saveSync({customer_id: customer_id, movie_id: movie[0].id, checkout_date: today, due_date: dueDate})
    console.log(today)
    console.log(dueDate)
    console.log(movie[0].id)
    console.log(customer_id)
    // remove money from account
    db.run("UPDATE customers SET account_credit=account_credit-3.0 WHERE id=$1;", [customer_id], function (error, result) {
      console.log(error, result)
      if (error) {
        return callback(error);
      } else {
        //modify inventory
        db.run("UPDATE movies SET inventory=inventory-1 WHERE id=$1;", [movie[0].id], function(error, result) {
          if (error) {
            return callback(error);
          } else {
            return callback(null, result)
          };
        });
      };
    });
 });
};

Rental.returnRental = function(title, customer_id, callback) {
  console.log("in rental model", title, customer_id)
  db.movies.search({columns: ["title"], term: title}, function(error, movies) {
    console.log("movies from movie.find is:", movies)
    db.rentals.find({movie_id: movies[0].id, customer_id: customer_id}, function(error, rentals) {
      console.log("rentals from rental.find is", rentals)
      db.rentals.updateSync({id: rentals[0].id, return_date: new Date()}, function(error, checked_out) {
        db.run("UPDATE movies SET inventory=inventory+1 WHERE id=$1;", [movies[0].id]);
        console.log("check if return date is there:", rentals)
      if(error) {
        callback(error, undefined);
      } else {
        callback(null, checked_out);
      }
      });
    });
  })
};
Rental.findOverdue = function(callback) {
  var today = new Date();
  console.log("infind OVerdue function", today)
  db.run("SELECT customers.name, rentals.checkout_date, rentals.due_date, movies.title FROM customers INNER JOIN rentals ON customers.id=rentals.customer_id INNER JOIN movies ON rentals.movie_id = movies.id WHERE rentals.return_date IS NULL AND rentals.due_date < $1;", [today], function(error, customers) {
    if(error || !customers) {
      callback(error || new Error("Could not retrieve customers"), undefined);
      } else {
      callback(null, customers.map(function(customer) {
        return new Customer(customer);
      }));
    }
  })
}


// Rental.findOverdue = function(callback) {
//   console.log("This is before db.search for rentals:")
//   db.rentals.find({return_date: null}, function(error, rentals) {
//     console.log("in db.rentals.find ", rentals)
//     // look for all the rentals where the due_date is less than today
//     callback(null, rentals.map (function (rental) {
//       var today = new Date();
//       console.log("Testing what rental is ", rental)
//       var cust_id = rental.customer_id
//       if(rental.due_date < today) {
//         console.log("Type is ", typeof cust_id)
//         console.log("RENTAL CUST ID =", rental.customer_id)
//         db.run("SELECT customers.id, customers.name FROM customers WHERE id=$1;", [cust_id], function (error, customers) {
//           if(error || !customers) {
//           callback(error || new Error("Could not find customers"), undefined);
//           } else {
//           callback(null, customers.map(function(customer){
//             console.log("This is customer[0] is ", customer);
//             return new Customer(customer)
//             }))
//           }
//         })
//       }
//       })
//     })
//   )}
// }
