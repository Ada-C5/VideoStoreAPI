var massive = require('massive')
var connectionString = "postgres://localhost/video_store"
var db = massive.connectSync({connectionString : connectionString})

// produces array with each element is an object key:value pair
var moviesParsedJSON = require('../db/seeds/movies.json');
// var movieLength = moviesParsedJSON.length
var customersParsedJSON = require('../db/seeds/customers.json');
// var customerLength = customersParsedJSON.length
var rentalsParsedJSON = require('../db/seeds/rentals.json');


// ***********synchronous method
for (var movie of moviesParsedJSON) {
	console.log(movie)
	// pass save
	// db.video_store.saveSync({movie: movie.title.....})
	db.movies.saveSync(movie);
};


for (var customer of customersParsedJSON) {
	// console.log(customer.name, customer.registered_at,  )
	// db.video_store.saveSync({name: customer.name, customer.registered_at, })
	db.customers.saveSync(customer);
};

for (var rental of rentalsParsedJSON) {
	// console.log(customer.name, customer.registered_at,  )
	// db.video_store.saveSync({name: customer.name, customer.registered_at, })
	db.rentals.saveSync(rental);
};

console.log("seeding done!")
process.exit()




// check length of db
// function checkFinish(records) {
// 	db.video_store.count(function(err, res) {
// 		console.log("words in db: ", res)
// 		// need to make sure both files are done
// 		if (res >= records) { process.exit() }
// 	})
// }

// // **********a-synchronous method
// for (var movie of moviesParsedJSON) {
// 	db.video_store.save(movie, function(err, res) {
// 		console.log('saved: ', JSON.stringify(res))
// 		checkFinish(movieLength)
// 	})
// }

// for (var customer of customersParsedJSON) {
// 	db.video_store.save(customer, function(err, res) {
// 		console.log('saved: ', JSON.stringify(res))
// 		checkFinish(customerLength)
// 	})
// }


