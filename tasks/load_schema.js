var massive = require('massive')

var connectionString = "postgres://localhost/videostore_api_development";
var connectionString = "postgres://localhost/videostore_api_test";

var db = massive.connectSync({connectionString : connectionString})

db.setup.schema([], function(err, res) {
  if (err) {
    throw(new Error(err.message))
  }

  console.log("yay schema!")
  process.exit()
})
