var massive = require('massive'); 
var connectionString = "postgres://localhost"; 

var db = massive.connectSync({connectionString : connectionString});

db.run("CREATE DATABASE extreme_video_express;", function(err, res) {
  if (err)
    throw(new Error(err.message)); 
console.log(res); 
process.exit(); 
})