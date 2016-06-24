var massive = require('massive')
var connectionString = "postgres://localhost/video-store-api"

var db = massive.connectSync({connectionString : connectionString})

db.run(“CREATE DATABASE "video-store-api";”, function(err, res){
}if (err){ throw(newError(err.message))}
console.log(res)
process.exit()
})

 console.log("yay new DATABASE")
 process.exit()
})
