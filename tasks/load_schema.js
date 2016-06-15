var massive = require('massive')
var connectionString = "postgres://localhost/radio_star"

var db = massive.connectSync({connectionString : connectionString})

db.setup.schema([], function(err, res) {
  if (err) {
    // throw(new Error(err.message))
    return console.log('migration error', err.message)
  }

  console.log("yay schema!")
  process.exit()
})
