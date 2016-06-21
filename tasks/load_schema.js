var massive = require('massive')
var connectionString = "postgres://localhost/cassettecollection_development"
var connectionString_test = "postgres://localhost/cassettecollection_test"

var db = massive.connectSync({connectionString : connectionString})
var db_test = massive.connectSync({connectionString : connectionString_test})

var count = 0

db.setup.schema([], function(err, res) {
  if (err) {
    throw(new Error(err.message))
  }

  count += 1
  console.log("yay schema1!")
  checkFinish()
})

db_test.setup.schema([], function(err, res) {
  if (err) {
    throw(new Error(err.message))
  }

  count += 1
  console.log("yay schema2!")
  checkFinish()
})

function checkFinish() {
  if (count >= 2) { process.exit() }
}
