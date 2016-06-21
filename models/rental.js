var app = require('../app')
var db = app.get("db")
var Movie = require('./movie')

var Rental = function(id) {
  this.id = id;
}


Rental.all = function (callback) {
  db.movies.find (function (error, movies) {
    if (error || !movies) {
      callback(new Error("Could not retrieve movies"), undefined)
    } else {
      callback(null, movies) //???????
    }
  })
}

Rental.find = function (title, callback) {
  db.movies.find({title: title}, function (error, movies) {
    if (error || !movies) {
      callback(new Error("Could not retrieve movies"), undefined)
    } else {
      //look up all rentals for that movie
      db.rentals.find({movie_id: movies[0].id}, function (error, rentals) {
        if (error || !rentals) {
          callback(new Error("Could not retrieve rentals"), undefined)
        } else {
          var out = 0

          for (movie of rentals) {
            if (movie.checked === "true") {
              out += 1
            }
          }
          movies[0]["available_inventory"] = (movies[0].inventory - out)

          callback(null, movies[0])
        }
      })
    }
  })
}

Rental.customers = function (title, callback) {
  db.movies.findOne({title: title}, function (error, movies) {
    if (error || !movies) {
      callback(new Error("Could not retrieve movies"), undefined)
    } else {
      db.rentals.find({movie_id: movies.id}, function (error, rentalRecords) {
        if(error || !rentalRecords) {
          callback(new Error("Could not retrieve movies"), undefined)
        } else {
          var customerIds = []
          for (var record of rentalRecords) {
            customerIds.push(record.customer_id)
          }
          callback(null, customerIds)
        }
      })
    }
  })
}

module.exports = Rental
