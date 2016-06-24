var massive = require('massive')

var count = 0

var setup = function(environment) {
  var connectionString = "postgres://localhost/video_store_api_" + environment
  var db = massive.connectSync({connectionString : connectionString})
  db.setup.schema([], function(err, res) {
    if(err) {
      throw(new Error(err.message))
    }
    count ++
    console.log("yay " + environment + " schema!")
    if(count == 2) {
      process.exit()
    }
  })
}

setup("development");
setup("test");
