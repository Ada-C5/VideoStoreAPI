var massive = require('massive')
var connectionString = 'postgres://localhost'

var db = massive.connectSync({connectionString : connectionString})

db.run("CREATE DATABASE video_api;", function(err, res){
  if(err){
    throw(new Error(err.message))
  }
  console.log(res)
  process.exit()
})
