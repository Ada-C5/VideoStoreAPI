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
Rental.find = function (title, callback) {
  db.movies.search({columns:["title"], term: title}, function (error, movies) {
    if(error || !movies) {
      callback(error || new Error("Movies not found"), undefined);
    } else {
      callback(null, movies.map(function(movie) {
        return new Movie(movie)
      }));
    };
  });
};

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
  Rental.find(title, function(error, movie) {
    db.rentals.saveSync({customer_id: customer_id, movie_id: movie.id, checkout_date: (new Date())})
  });
};
