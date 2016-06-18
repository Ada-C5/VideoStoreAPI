var app = require('../app')
var db = app.get('db')
var Movie = require('./movie')

var Rental = function () {}

Rental.all = function (callback) {
  db.movies.find (function (error, movies) {
    if (error || !movies) {
      callback(new Error("Could not retrieve movies"), undefined)
    } else {
      callback(null, movies.map (function (movie) {
        return new Movie(movie)
      }))
    }
  })
}

Rental.find = function (title, callback) {
  db.movies.search({columns:["title"], term: title}, function (error, movies) {
    if (error || !movies) {
      callback(new Error("Could not retrieve movies"), undefined)
    } else {
      callback(null, movies.map (function (movie) {
        return new Movie(movie)
      }))
    }
  })
}


module.exports = Rental
