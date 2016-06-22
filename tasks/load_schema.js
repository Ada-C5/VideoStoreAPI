var massive = require('massive')

var databaseName = process.argv[2];
var connectionString = "postgres://localhost/" + databaseName;
var db = massive.connectSync({connectionString : connectionString});

db.setup.schema([], function(err, res) {
  if (err) {
    throw(new Error(err.message))
  }

  console.log("yay schema!")
  process.exit()
})
