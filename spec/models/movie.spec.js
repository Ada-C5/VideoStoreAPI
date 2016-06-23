var app = require('../../app')
var db = app.get('db')

var Movie = require('../../models/movie')

describe('Movie', function () {
  var title = 'High Noon'
  var overview = 'High Noon is about a recently freed leader of a gang of bandits in the desert who is looking to get revenge on the Sheriff who put him in jail. A legendary western film from the Austrian director Fred Zinnemann.'
  var release_date = '1952-07-24'
  var inventory = 4

  afterEach(function () {
    db.end()
  })

  describe('all', function () {
    it('should not be null', function (done) {
      Movie.all(function (error, movies) {
        expect(movies).toNotBe(null)
      done()
      })
    })

    it('should return an array', function (done) {
      Movie.all(function (error, movies) {
        expect(movies).toEqual(jasmine.any(Array))
      done()
      })
    })

    it('should contain movie objects', function (done) {
      Movie.all(function (error, movies) {
        expect(movies[0]).toEqual(jasmine.any(Movie))
      done()
      })
    })

    it('should contain all movies that exist in the database', function (done) {
      Movie.all(function (error, movies) {
        expect(movies.length).toEqual(100)
      done()
      })
    })
  })

  describe('sortBy', function () {
    var firstAlphabeticalMovieTitle = "12 Angry Men"
    var firstReleaseDate = "1923-04-01"

    it('should return an array', function (done) {
      Movie.sortBy(['title', 1, 10], function (error, movies) {
        expect(movies).toEqual(jasmine.any(Array))
      done()
      })
    })

    it('should contain movie objects', function (done) {
      Movie.sortBy(['title', 2, 12], function (error, movies) {
        expect(movies[0]).toEqual(jasmine.any(Movie))
      done()
      })
    })

    it('should be able to sort by name', function (done) {
      Movie.sortBy(['title', 1, 25], function (error, movies) {
        expect(movies[0].title).toEqual(firstAlphabeticalMovieTitle)
      done()
      })
    })

    it('should be able to sort by release_date', function (done) {
      Movie.sortBy(['release_date', 1, 15], function (error, movies) {
        console.log("halp ", movies)
        expect(movies[0].release).toEqual(firstReleaseDate)
      done()
      })
    })
  })

})
