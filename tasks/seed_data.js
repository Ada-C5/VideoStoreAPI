var massive = require('massive')
var connectionString = "postgres://localhost/cassettecollection"

var db = massive.connectSync({connectionString : connectionString})
var movies_data = require("../db/seeds/movies")
var customers_data = require("../db/seeds/customers")
var rentals_data = require("../db/seeds/rentals")


function seed() {
  var seeded_movies = 0
  var seeded_customers = 0
  var seeded_rentals = 0

  // while (seeded_customers !== customers_data.length && seeded_movies !== movies_data.length) {
    for (var movie of movies_data) {
      db.movies.save({title: movie.title, overview: movie.overview, release_date: movie.release_date, inventory: movie.inventory}, function (err,res) {
        if (err) {
          throw new Error(err.message)
        }
        seeded_movies++
      })
    }

    for (var customer of customers_data) {
      db.customers.save({name: customer.name, registered_at: customer.registered_at, address: customer.address, city: customer.city, state: customer.state, postal_code: customer.postal_code, phone: customer.phone, account_credit: customer.account_credit}, function (err,res) {
        if (err) {
          throw new Error(err.message)
        }
        seeded_customers++
        // console.log(res)
      })
    }

    for (var rental of rentals_data) {
      db.rentals.save({movie_id: rental.movie_id, customer_id: rental.customer_id, status: rental.status, checkout_date: rental.checkout_date, due_date: rental.due_date }, function (err,res) {
        if (err) {
          throw new Error(err.message)
        }
        seeded_rentals++
        // console.log(res)
      })
    }
  // }

  // process.exit()
}

seed()
// seed(null, process.exit())
