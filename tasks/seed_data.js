var massive = require('massive')

var connectionString = "postgres://localhost/radio_star"
var db = massive.connectSync({connectionString : connectionString})

var movies_data = require("../db/seeds/movies")
// var movies_array = JSON.parse(movies_data)
console.log(movies_data)

for(var movie of movies_data){
  db.movies.save({title: movie.title, overview: movie.overview, release_date: movie.release_date, inventory: movie.inventory}, function(err,res){
    if(err) {
      throw new Error(err.message)
    }
  })
}
