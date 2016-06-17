var massive = require('massive')
var connectionString = "postgres://localhost/video_store_api_development"

var db = massive.connectSync({connectionString : connectionString})

// setup below comes from folder name
db.setup.schema([], function(err, res) {
  if(err) {
    throw(new Error(err.message))
  }

  console.log("yay schema!")
  process.exit()
})
