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
