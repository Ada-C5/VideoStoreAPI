var app = require("../app")
var db = app.get('db')

var Movie = function(id) {
  this.id = id
}

Movie.all = function(callback) {
  db.movies.find(function(error, movies) {
    if(error) {
      callback(error || new Error("Could not retrieve movies"), undefined)
    } else if(!movies) {
      callback(error || new Error("No movies found"), undefined)
    } else {
      callback(null, movies.map(function(movie) {
        return new Movie(movie)
      }))
    }
  })
}

Movie.sort = function(column_name, n, p, callback) {
  var options = {
    order : column_name,
    limit : n,
    offset : p
  }

  db.movies.find({}, options, function(error, movies) {
    if(error) {
      callback(error || new Error("Could not retrieve movies"), undefined)
    } else if(!movies) {
      callback(error || new Error("No movies found"), undefined)
    } else {
      callback(null, movies.map(function(movie) {
        return new Movie(movie)
      }))
    }
  })
}

module.exports = Movie
