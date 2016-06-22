var app = require('../app')
var db = app.get('db')
var Movie = require('./movie')
var Customer = require('./customer')
var Rental = require('./rental')

// var movieHistory = require('../db/rental_movie_history')

var Rental = function (rental) {
  this.id = rental.id
  this.customer_id = rental.customer_id
  this.movie_id = rental.movie_id
  this.status = rental.status
  this.return_date = rental.return_date
}

Rental.all = function (callback) {
  db.movies.find (function (error, movies) {
    callback(null, movies.map (function (movie) {
      return new Movie(movie)
    }))
  })
}

Rental.find = function (title, callback) {
  db.movies.search({columns:["title"], term: title}, function (error, movies) {
    if (error || !movies) {
      callback(new Error("Could not retrieve movies"), undefined)
    } else {
      callback(null, movies.map (function (movie) {
      return new Movie(movie)
      }))
    }
  })
}

Rental.findCurrent = function (id, callback) {
  db.rentals.find({customer_id: id, status: true}, function (error, rentals) {
    callback(null, rentals.map (function (rental) {
      return new Rental(rental)
    }))
  })
}

Rental.findHistory = function (id, callback) {
  db.rentals.find({customer_id: id}, function (error, rentals) {
    callback(null, rentals.map (function (rental) {
      return new Rental(rental)
    }))
  })
}

Rental.findCurrentMovies = function (title, callback) {
  db.rental_movie_history([title], function (error, customers) {
    callback(null, customers.map(function (customer) {
      return new Customer(customer)
    }))
  })
}

Rental.findHistoryMovies = function (title, callback) {
  db.customer_rental_history([title], function (error, customers) {
    callback(null, customers.map(function (customer) {
      return new Customer(customer)
    }))
  })
}

Rental.find_customers = function (title, callback) {
  db.find_current_rentals([title], function (error, customers) {
    callback(null, customers.map(function (customer) {
      return new Customer(customer)
    }))
  })
}

Rental.newRental = function (title, cust_id, callback) {
  Rental.find(title, function(error, movie) {
    db.rentals.save({customer_id: cust_id, movie_id: movie.id, status: true, checkout_date: (new Date()).toString()}, function (err, response) {
      callback(err)
    })
  })
}


module.exports = Rental
