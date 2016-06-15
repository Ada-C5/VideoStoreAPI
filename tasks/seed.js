var massive = require('massive')
var connectionString = "postgres://localhost/video_store"

var db = massive.connectSync({connectionString : connectionString})

var customers = require("../db/seeds/customers.json")
var movies = require("../db/seeds/movies.json")

for (var customer of customers) {
  console.log(customer)
  db.customers.saveSync(customer)
}

for (var movie of movies) {
  console.log(movie)
  db.movies.saveSync(movie)
}

console.log("seeding done!")
process.exit()
