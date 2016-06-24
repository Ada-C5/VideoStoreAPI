var app = require("../../app");
var db = app.get("db");

var Movie = require('../../models/movie')

describe('Movie', function () {
  var title1 = "The Exorcist";
  var overview1 = "12-year-old Regan MacNeil begins to adapt an explicit new personality as strange events befall the local area of Georgetown. Her mother becomes torn between science and superstition in a desperate bid to save her daughter, and ultimately turns to her last hope: Father Damien Karras, a troubled priest who is struggling with his own faith.";
  var inventory1 = 7;

  afterEach(function () {
    db.end()
  })

  describe('#all', function () {
    it('should return a list of all the movies and respective data', function (done) {
      Movie.all(function (error, movies) {
        expect(error).toBeNull
        expect(movies.length).toEqual(100)
      })
      done()
    })

    it('should return an array', function (done) {
      Movie.all(function (error, movies) {
        expect(error).toBeNull
        expect(movies.isArray).toEqual(true)
      })
      done()
    })
  })

  describe('#sortBy', function () {
    it('should return a sorted list of movies', function (done) {
      Movie.sortBy("title", 1, 2, function (error, movies) {
        expect(movies.length).toEqual(1)
        expect(movies[0].title).toEqual(title1)
        expect(movies[0].overview).toEqual(overview1)
        expect(movies[0].inventory).toEqual(inventory1)
      })
    done()
    })
  })
})
