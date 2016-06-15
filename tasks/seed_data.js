var massive = require('massive')
var connectionString = "postgres://localhost/cassettecollection"

var db = massive.connectSync({connectionString : connectionString})
var movies_data = require("../db/seeds/movies")
var customers_data = require("../db/seeds/customers")
var rentals_data = require("../db/seeds/rentals")

var moviesCount = 0
var customersCount = 0
var rentalsCount = 0

function seed() {
  // saveSync is not asynchronous, it's blocking, ok for stuff like this that is run every once in a while
  // while (seeded_customers !== customers_data.length && seeded_movies !== movies_data.length) {
    for (var movie of movies_data) {
      db.movies.save(movie, function (err,res) {
        if (err) {
          throw new Error(err.message)
        }
        moviesCount++
        checkFinish()
      })
    }

    for (var customer of customers_data) {
      db.customers.save(customer, function (err,res) {
        if (err) {
          throw new Error(err.message)
        }
        customersCount++
        checkFinish()
      })
    }

    for (var rental of rentals_data) {
      db.rentals.save(rental, function (err,res) {
        if (err) {
          throw new Error(err.message)
        }
        rentalsCount++
        checkFinish()
      })
    }
  // }
}

function checkFinish() {
  var totalCount = moviesCount + customersCount + rentalsCount
  var totalLength = movies_data.length + customers_data.length + rentals_data.length

  // console.log("total count", totalCount)
  // console.log(totalCount >= totalLength)
  if (totalCount >= totalLength) { process.exit() }
}

seed()
