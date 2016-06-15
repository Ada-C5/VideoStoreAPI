var massive = require('massive')
var connectionString = "postgres://localhost/video_store"
var db = massive.connectSync({connectionString : connectionString})

// produces array with each element is an object key:value pair
var moviesParsedJSON = require('../db/seeds/movies.json');
var customersParsedJSON = require('../db/seeds/customers.json');

for (var movie of moviesParsedJSON) {
	console.log(movie.title, )
	// pass save
	// db.video_store.saveSync({movie: movie.title.....})
	db.video_store.saveSync(movie)
}


for (var customer of customersParsedJSON) {
	console.log(customer.name, customer.registered_at,  )
	// db.video_store.saveSync({name: customer.name, customer.registered_at, })
	db.video_store.saveSync(customer)
}

console.log("seeding done!")
process.exit()