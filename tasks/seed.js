var massive = require('massive')
var databaseCount = 0;
var databaseType = ["test", "development"]



var seedDb = function(type){
  var connectionString = "postgres://localhost/videostore_api_" + type;

  var db = massive.connectSync({connectionString : connectionString})

  var customers = require('../db/seeds/customers.json');
  var movies = require('../db/seeds/movies.json');

  var date = new Date();
  var totalCount = (customers.length + movies.length);

  var count = 0

  console.log("Seeding to " + type + " database, total records: " + totalCount)

  for(customer of customers){
    customer.created_at = customer.updated_at = date
    db.customers.save(customer, function(err, result){
      if(err) {
        console.log("Unable to save customer " + movie.title + ": " + err.message)
      }

      count++
      if(count === totalCount) {
        console.log("Done seeding customers. " + count + " records seeded to " + type + " database.")
        databaseCount++
      }
      if(databaseCount === databaseType.length ) {
        console.log("Done seeding both databases. " + count + " records seeded to " + type + " database.")
        process.exit()
      }
    });
  };

  for(movie of movies){
    movie.created_at = movie.updated_at = date
    movie.available_inventory = movie.inventory
    db.movies.save(movie, function(err, result){
      if(err) {
        console.log("Unable to save movie " + movie.title + ": " + err.message)
      }

      count++
      if(count === totalCount) {
        console.log("Done seeding movies. " + count + " records seeded to " + type + " database.")
        databaseCount++
      }
      if(databaseCount === databaseType.length ) {
        console.log("Done seeding both databases. " + count + " records seeded to " + type + " database.")
        process.exit()
      }
    });
  };
}

for(var type of databaseType){
  seedDb(type)
};
