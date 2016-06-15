var massive = require('massive')
var connectionString = "postgres://localhost/videostore_api"

var db = massive.connectSync({connectionString : connectionString})

var customers = require('../db/seeds/customers.json');
var movies = require('../db/seeds/movies.json');

var date = new Date();
var totalCount = customers.length + movies.length;

var count = 0

console.log(totalCount)

for(customer of customers){
  customer.created_at = date
  db.customers.save(customer, function(err, result){
    count++
    if(count === totalCount){process.exit()}
  });
};

for(movie of movies){
  movie.created_at = date
  db.movies.save(movie, function(err, result){
    count++
    if(count === totalCount){process.exit()}
  });
};
