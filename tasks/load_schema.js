// var massive = require('massive')
// var connectionString = "postgres://localhost/radio_star"

// var db = massive.connectSync({connectionString : connectionString})

// var app = require("../app");
// var db = app.get("db");

var spawn = require('child_process').spawnSync;
var Massive = require('massive');

['development', 'test'].forEach(function(env) {
  console.log(env)
  // var env = 'development'
  var dbName = `radio_star_${env}`;
  var db = Massive.connectSync({ db: dbName });
  db.setup.schema([], function(err, res) {
    if (err) {
      // throw(new Error(err.message))
      return console.log('migration error', err.message);
    }
    console.log("yay schema!");
    process.exit();
  });
});

//   var env = 'test'
//   var dbName = `radio_star_${env}`;
//   var db = Massive.connectSync({ db: dbName });
//   db.setup.schema([], function(err, res) {
//     if (err) {
//       // throw(new Error(err.message))
//       return console.log('migration error', err.message);
//     }
//     console.log("yay schema!");
//     process.exit();
//   });
// // });
