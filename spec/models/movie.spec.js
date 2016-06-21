var app = require('../../app')
var db = app.get('db')

var Movie = require('../../models/movie')

describe('Movie', function () {
  var title1 = "Alien"
  var overview1 = 'During its return to the earth, commercial spaceship Nostromo intercepts a distress signal from a distant planet. When a three-member team of the crew discovers a chamber containing thousands of eggs on the planet, a creature inside one of the eggs attacks an explorer. The entire crew is unaware of the impending nightmare set to descend upon them when the alien parasite planted inside its unfortunate host is birthed.'
  var release_date1 = '1979-05-25'
  var inventory1 = 4

  afterEach(function () {
    db.end()
  })

  describe('#all', function () {
    it('should return all movies', function (done) {
      Movie.all(function (error, movies) {
        expect(movies.length).toEqual(100)
        done()
      })
    })
  })

  describe('#find', function () {
    it('should return correct movie', function (done) {
       Movie.find(title1, function (error, movie1) {
        expect(movie1.title).toEqual(title1)
        expect(movie1.overview).toEqual(overview1)
        expect(movie1.release_date).toEqual(release_date1)
        expect(movie1.inventory).toEqual(inventory1)
        expect(error).toBeNull
        done()
      })
    })

    it('should throw an error if the movie DNE', function (done) {
      Movie.find("bad title", function(error, customer) {
        expect(error.message).toEqual("movie not found")
        done()
      })
    })
  })

  describe('#sort', function () {
    it('should sort movie by title', function(done) {
      Movie.sort("title", 1, 3, function(error, movie_array) {
        expect(movie_array.length).toEqual(1)
        expect(movie_array[0].title).toEqual(title1)
        expect(movie_array[0].overview).toEqual(overview1)
        expect(movie_array[0].release_date).toEqual(release_date1)
        expect(movie_array[0].inventory).toEqual(inventory1)
        done()
      })
    })

    it('should throw an error if the customer DNE', function (done) {
      Movie.sort("bad title", 1, 3, function(error, movie) {
        expect(error.message).toEqual("Could not retrieve movies")
        done()
      })
    })
  })
})
