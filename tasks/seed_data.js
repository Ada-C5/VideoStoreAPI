var massive = require('massive')

// var connectionString = "postgres://localhost/radio_star"
// var db = massive.connectSync({connectionString : connectionString})
var spawn = require('child_process').spawnSync;
var Massive = require('massive');

var movies_data = require("../db/seeds/movies.json")
var customer_data = require("../db/seeds/customers.json")
var rental_data = require("../db/seeds/rentals.json")
// var movies_array = JSON.parse(movies_data)
// console.log(movies_data)

// ['development', 'test'].forEach(function(env) {
  function seed_pls() {
    // var env = 'development'
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

    // var env = 'test'
    // var dbName = `radio_star_${env}`;
    // var db = Massive.connectSync({ db: dbName });
    // for(var movie of movies_data){
    //   db.movies.saveSync(movie);
    //   }
    //
    // for(var customer of customer_data){
    //   db.customers.saveSync(customer);
    //   }
    //
    // for(var rental of rental_data){
    //   db.rentals.saveSync(rental);
    //   }
        // console.log("seeding done")
        // process.exit()
    console.log("seeding done");
    process.exit();
  };

//   // db.seed([], function(err,res){
//   function seedz() {
//     var env = 'test'
//     var dbName = `radio_star_${env}`;
//     var db = Massive.connectSync({ db: dbName });
//     for(var movie of movies_data){
//       db.movies.saveSync(movie);
//       }
//
//     for(var customer of customer_data){
//       db.customers.saveSync(customer);
//       }
//
//     for(var rental of rental_data){
//       db.rentals.saveSync(rental);
//       }
//       console.log("seeding done")
//       process.exit()
// };

seed_pls();
// seedz();
//////////////////////////////////////////////////////////////
// function checkFinish() {
//   db.movies.count(function(err, res) {
//     console.log("already in db: ", res)
//     if (res >= records) {process.exit()}
//   })
// }
//
// for (var movie of movies_data) {
//   db.movies.save(movie, function(err, res) {
//     console.log('saved: ', JSON.stringify(res))
//     checkFinish()
//   })
// }
    // {title: movie.title, overview: movie.overview, release_date: movie.release_date, inventory: movie.inventory}
    // function(err,res){
  //   if(err) {
  //     throw new Error(err.message)
//     // }
//   })
// }
