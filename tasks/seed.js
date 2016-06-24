var massive = require('massive')
var connectionString = 'postgres://localhost/video-store-api'
var db = massive.connectSync({connectionString : connectionString})
var movies = require('../db/seeds/movies.json')
var customers = require('../db/seeds/customers.json')
var rentals = require('../db/seeds/rentals.json')

for (var movie of movies) {
  console.log(movie)
  db.movies.saveSync(movie)
}

for (var customer of customers) {
  console.log(customer)
  db.customers.saveSync(customer)
}

for (var rental of rentals) {
  console.log(rental)
  db.rentals.saveSync(rental)
}

process.exit()
