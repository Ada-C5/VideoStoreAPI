var massive = require('massive')
var connectionString = 'postgres://localhost/video_api'

var db = massive.connectSync({connectionString : connectionString})

//db is our instance of massive, setup is the folder name, schema is the file
db.setup.schema([], function(err,res) {
  if (err){
    throw (new Error(err.message))
  }
  console.log('yay schema !!!!!!')
  process.exit()
})
