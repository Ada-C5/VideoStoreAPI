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
  db.movies.search({columns:["title"], term: title}, function (error, movies) {
  var today = new Date()
  var next_week = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)
  console.log(next_week)
  db.rentals.saveSync({customer_id: cust_id, movie_id: movies.id, status: true, checkout_date: (new Date()).toString(), return_date: next_week.toString()})
  var movieInventory = movies[0].inventory - 1
  db.movies.updateSync({id: movies[0].id, inventory: movieInventory})
    if (error || !movies) {
      callback(new Error("Could not retrieve movie"), undefined)
    } else {
      callback(null, movies.map (function (movie) {
        return new Movie(movie)
      }))
    }
  })
}


module.exports = Rental
