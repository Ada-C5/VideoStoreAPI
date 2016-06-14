var massive = require('massive')
var connectionString = "postgres://localhost/radio_star"

var db = massive.connectSync({connectionString : connectionString})

db.setup.schema([], function(err, res) {
  if (err) {
    return console.log('migration error', err)
  }

  console.log("yay schema!")
  process.exit()
})
