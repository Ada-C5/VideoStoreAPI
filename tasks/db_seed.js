var massive = require('massive')
var connectionString = 'postgres://localhost/massive'
var customerSeed = require('../db/seeds/customers')
var movieSeed = require('../db/seeds/movies')

var db = massive.connectSync({connectionString: connectionString})

db.seed.customers(customerSeed, function (err, res) {
  if (err) {
    throw (new Error(err.message))
  }

  console.log('schema!')
  process.exit()
})

db.seed.movies(movieSeed, function (err, res) {
  if (err) {
    throw (new Error(err.message))
  }

  console.log('schema!')
  process.exit()
})
