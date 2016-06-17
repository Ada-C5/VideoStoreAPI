var massive = require('massive')
var connectionString = "postgres://localhost/video_store_api_development"


var db = massive.connectSync({connectionString : connectionString})

// seeding below
// Define JSON File
// fs means file system
 var fs = require("fs")
 console.log("\n *STARTING* \n")
// Get content from file
var seedMovies = "movies.json"
var seedCustomers = "customers.json"

var seedData = function(filename, table, callback) {

  var contents = fs.readFileSync("db/seeds/" + filename)
  // Define to JSON type
   var records = JSON.parse(contents)
  // Get Value from JSON
  var ongoing_saves = 0
  for (var record of records) {
    // making an ongoing_saves to increment saved customers
    ongoing_saves += 1
    table.save(record, function(err,inserted) {
      // decrementing ongoing_saves as they are no longer ongoing.
      ongoing_saves -= 1
      if(err) {
        throw(new Error(err.message))
      }
      //
      if (ongoing_saves < 1) {
        console.log("seeded " + filename + "!")
        callback()
      }
    })
  }
}
var movies_done = false
var customers_done = false
seedData(seedMovies, db.movies, function(){
  movies_done = true
  if (customers_done === true) {
    process.exit()
  }
})
seedData(seedCustomers, db.customers, function() {
  customers_done = true
  if (movies_done === true) {
    process.exit()
  }
})
