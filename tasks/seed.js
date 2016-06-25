var massive = require('massive')
var connectionString = 'postgres://localhost/video_api'
var db = massive.connectSync({connectionString: connectionString})

var customers = require('../db/seeds/customers.json')
var movies = require('../db/seeds/movies.json')

for (var customer of customers) {
  db.customers.saveSync(customer)
  console.log(customer)
}
// update the tables with stock numbers

for (var movie of movies) {
  db.movies.saveSync({title: movie.title, overview: movie.overview, release_date: movie.release_date, inventory: movie.inventory, stock: movie.inventory})
  console.log(movie)
}

console.log('SAVED!!!')

process.exit()
