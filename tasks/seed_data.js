// var massive = require('massive')
var spawn = require('child_process').spawnSync;
var Massive = require('massive');

var movies_data = require("../db/seeds/movies.json")
var customer_data = require("../db/seeds/customers.json")
var rental_data = require("../db/seeds/rentals.json")

// ['development', 'test'].forEach(function(env) {
  function seed_pls() {
    var dbName = `radio_star_test`;
    var dbNames = `radio_star_development`;
    var db = Massive.connectSync({ db: dbName });
    var dbs = Massive.connectSync({ db: dbNames });
    for(var movie of movies_data){
      db.movies.saveSync(movie);
      dbs.movies.saveSync(movie);
      }

    for(var customer of customer_data){
      db.customers.saveSync(customer);
      dbs.customers.saveSync(customer);
      }

    for(var rental of rental_data){
      db.rentals.saveSync(rental);
      dbs.rentals.saveSync(rental);
      }

    console.log("seeding done");
    process.exit();
  };

seed_pls();
