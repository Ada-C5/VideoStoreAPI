var app = require("../app");
var db = app.get("db");
var Customers = require('../models/customers');

// Constructor function
var Movies = function(movie) {
  this.id = movie.id;
  this.title = movie.title;
  this.overview = movie.overview;
  this.release_date = movie.release_date;
  this.inventory = movie.inventory;
};

Movies.all = function(callback) {
  db.movies.find(function(error, movies) {
    if(error || !movies) {
      callback(error || new Error("Could not retrieve movies"), undefined);
    } else {
      callback(null, movies.map(function(movie) {
        return new Movies(movie);
      }));
    }
  });
};

Movies.sort_by_day = function(options, callback) {
  db.movies.find({}, options, function(error, movies){
    if(error || !movies) {
      callback(error || new Error("Could not retrieve movies"), undefined);
    } else {
      callback(null, movies.map(function(movie) {
        return new Movies(movie);
      }));
    }
  });
};

Movies.find = function(title, callback) {
  db.movies.findOne({title: title}, function(error, movie) {
    if(error || !movie) {
      callback(error || new Error("Could not retrieve movie"), undefined);
    } else {
      callback(null, new Movies(movie));
    }
  });
};

Movies.find_customers_by_title = function(title, callback) {
  db.sql.movies.currentCustomers([title], function(error, customers) {
    if(error || !customers) {
      callback(error || new Error("Could not retrieve customers"), undefined);
    } else {
      callback(null, customers.map(function(customer) {
        return new Customers(customer);
      }));
    }
  });
};

Movies.find_customers_by_history = function(title, order_by, callback) {
  db.run("select customers.name, customers.phone, customers.account_credit from movies INNER JOIN rentals on movies.id=rentals.movie_id inner join history on rentals.id=history.rental_id inner join customers on history.customer_id=customers.id where title = $1" + order_by, [title], function(error, customers) {
    if(error || !customers) {
      callback(error || new Error("Could not retrieve customers"), undefined);
    } else {
      callback(null, customers.map(function(customer) {
        return new Customers(customer);
      }));
    }
  });
};

module.exports = Movies;
