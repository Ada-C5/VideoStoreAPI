var app = require("../app");
var db = app.get("db");

var Customer = function(customer) {
  console.log(customer)
  this.id = customer.id
  this.name = customer.name
  this.registered_at = customer.registered_at
  this.address = customer.address
  this.city = customer.city
  this.state = customer.state
  this.postal_code = customer.postal_code
  this.phone = customer.phone
  this.account_credit = customer.account_credit
}
module.exports = Customer;

var Movie = require("../models/movie");

// takes on parameter(callback)-then run db.accounts.find
Customer.all = function(callback) {
  // then run db.accounts.find(no specific id or column - just another callback)
  db.customers.find(function(error, customers) {
    if(error || !customers) {
      // handling any error
      callback(error || new Error("Could not retrieve customers"), undefined);
    } else {
      // saying there was no error, accounts is an array and we map it
      callback(null, customers.map(function(customer) {
        // and return to a new instance of the account with id
        return new Customer(customer);
      }));
    };
  });
};

Customer.sortBy = function(field, n, p, callback) {
  db.customers.find({}, {
    order: field,
    limit: n,
    offset: p
  }, function(error, customers) {
    if(error || !customers) {
      callback(error || new Error("Could not retrieve customers"), undefined);
    } else {
      callback(null, customers.map(function(customer) {
        return new Customer(customer);
      }));
    }
  });
}

Customer.current = function([id], callback) {
  db.run ("SELECT rentals.customer_id, rentals.movie_id, movies.title FROM rentals INNER JOIN movies ON rentals.movie_id = movies.id WHERE customer_id = $1 AND return_date IS NULL;", [id], function(error, movies) {
    if(error || !movies) {
      callback(error || new Error("Could not retrieve customer movies"), undefined);
    } else {
      callback(null, movies.map(function(movie) {
        return new Movie(movie);
      }));
    }
  });
}

Customer.history = function([id], callback) {
  db.run ("SELECT rentals.customer_id, rentals.movie_id, movies.title, rentals.checkout_date, rentals.return_date FROM rentals INNER JOIN movies ON rentals.movie_id = movies.id WHERE customer_id = $1 ORDER BY rentals.checkout_date;", [id], function(error, movies) {
    if(error || !movies) {
      callback(error || new Error("Could not retrieve customer movies"), undefined);
    } else {
      callback(null, movies.map(function(movie) {
        return new Movie(movie);
      }));
    }
  });
}


module.exports = Customer;
