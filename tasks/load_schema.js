var massive = require('massive')
var connectionString = 'postgres://localhost/massive'

var db = massive.connectSync({connectionString: connectionString})

db.setup.schema([], function (err, res) {
  if (err) {
    throw (new Error(err.message))
  }

  console.log('schema!')
  process.exit()
})

// db.run("CREATE DATABASE massive;", function (err, res) {
//   if(err) {
//     throw (new Error(err.message))
//   }
//   console.log(res)
//   process.exit()
// })
