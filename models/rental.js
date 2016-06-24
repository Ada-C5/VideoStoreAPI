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

Rental.checkout = function (title, cust_id, callback) {
  db.movies.search({columns:["title"], term: title}, function (error, movies) {
    if (error || !movies) {
      callback(error)
    } else if (error || movies[0].inventory < 1) {
      callback(error || new Error("No more copies available"), undefined)
    } else {
      var today = new Date()
      var returnDate = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)
      db.rentals.saveSync({customer_id: cust_id, movie_id: movies[0].id, status: true, checkout_date: (new Date()).toString(), return_date: returnDate.toString()})
      db.movies.updateSync({id: movies[0].id, inventory: Rental.removeInventory(movies)})
      Customer.find_by_id(cust_id, function (error, customer) {
        db.customers.updateSync({id: cust_id, account_credit: Rental.charge(customer)})
      })
      callback(null, movies.map (function (movie) {
        return new Movie(movie)
      }))
    }
  })
}


Rental.checkin = function (title, cust_id, callback) {
  db.movies.search({columns:["title"], term: title}, function (error, movies) {
    db.rentals.find({movie_id: movies[0].id, customer_id: cust_id}, function (error, rental) {
      db.rentals.updateSync({id: rental[0].id, status: false})
      db.movies.updateSync({id: movies[0].id, inventory: Rental.addInventory(movies)})
    })
    if (error || !movies) {
      callback(new Error("Could not retrieve movie"), undefined)
    } else {
      callback(null, movies.map (function (movie) {
        return new Movie(movie)
      }))
    }
  })
}

Rental.overdueRental = function (callback) {
 db.rentals.find({ status: true }, function (error, rentals) {
    callback(null, rentals.map (function (rental) {
      var today = new Date()
      var returnDate = rental.return_date
      if (Date.parse(returnDate) < today) {
        db.customers.find({id: rental.customer_id, function (err, customer) {
        return new Customer(customer)
      }
    })
    }))
  // })
})

Rental.removeInventory = function (movie) {
  return movie[0].inventory - 1
}

Rental.addInventory = function (movie) {
  return movie[0].inventory + 1
}

Rental.charge = function (customer) {
  return customer.account_credit - 1.00
}

module.exports = Rental
