var massive = require('massive')
var connectionString = 'postgres://localhost/massive'
var customerSeed = require('../db/seeds/customers')
var movieSeed = require('../db/seeds/movies')

var db = massive.connectSync({connectionString: connectionString})

for (var record of movieSeed) {
  console.log(record.title, record.release_date)
  db.movies.saveSync(record)
}

process.exit()

for (var record of customerSeed) {
  console.log(record.name, record.address)
  db.customers.saveSync(record)
}

process.exit()
//
// db.seed.customers(customerSeed, function (err, res) {
//   if (err) {
//     throw (new Error(err.message))
//   }
//
//   console.log('schema!')
//   process.exit()
// })
//
// db.seed.movies(movieSeed, function (err, res) {
//   if (err) {
//     throw (new Error(err.message))
//   }
//
//   console.log('schema!')
//   process.exit()
// })
