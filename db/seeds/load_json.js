// // Read Synchrously
//  var fs = require("fs");
//  console.log("\n *START* \n");
//  // var movies = fs.readFileSync("content.txt");
//  // var customers = fs.readFileSync("content.txt");
//  console.log("Output Content : \n"+ content);
//  console.log("\n *EXIT* \n");




// var massive = require('massive')
// var connectionString = "postgres://localhost/video_store"
// var db = massive.connectSync({connectionString : connectionString})



var moviesParsedJSON = require('./movies.json');
var customersParsedJSON = require('./customers.json');

console.log(moviesParsedJSON)
console.log(customersParsedJSON)

// for(i = 0; i < parsedJSON.movies.length; i++) {
//     db.saveDoc("movies", parsedJSON.movies[1], function(err,res){});
// };

// for(i = 0; i < parsedJSON.customers.length; i++) {
//     db.saveDoc("customer", customer_parsedJSON.customers[1], function(err,res){});
// };