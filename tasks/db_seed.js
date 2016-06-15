var massive = require('massive')
var connectionString = 'postgres://localhost/video_store'
var customerSeed = require('../db/seeds/customers')
var movieSeed = require('../db/seeds/movies')

var db = massive.connectSync({connectionString: connectionString})
var movieRecords = movieSeed.length
var customerRecords = movieSeed.length

for (var record of movieSeed) {
  db.movies.save(record, function (err, res) {
    if (err) {
      throw (new Error(err.message))
    }
    console.log('saved: ', JSON.stringify(res))
    db.movies.count(function (err, res) {
      if (err) {
        throw (new Error(err.message))
      }
      console.log('records in db: ', res)
      if (res >= movieRecords) { process.exit() }
    })
  })
}

for (var record of customerSeed) {
  db.customers.save(record, function (err, res) {
    if (err) {
      throw (new Error(err.message))
    }
    console.log('saved: ', JSON.stringify(res))
    db.customers.count(function (err, res) {
      if (err) {
        throw (new Error(err.message))
      }
      console.log('records in db: ', res)
      if (res >= customerRecords) { process.exit() }
    })
  })
}
// =========================================================
// for (var record of movieSeed) {
//   console.log(record.title, record.release_date)
//   db.movies.saveSync(record)
// }
//
// process.exit()
//
// for (var record of customerSeed) {
//   console.log(record.name, record.address)
//   db.customers.saveSync(record)
// }
//
// process.exit()
