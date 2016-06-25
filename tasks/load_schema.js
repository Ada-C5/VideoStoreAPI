var massive = require('massive')
var count = 0;
var databaseType = ["test", "development"]
for(var type of databaseType){
  console.log(type)
  var connectionString = "postgres://localhost/videostore_api_" + type;
  console.log(connectionString)

  // var connectionString = "postgres://localhost/videostore_api_test";

  var db = massive.connectSync({connectionString : connectionString})

  db.setup.schema([], function(err, res) {
    if (err) {
      throw(new Error(err.message))
    }

    console.log("yay schema!")
    count ++
    if(count == 2){process.exit()}
  })
};
