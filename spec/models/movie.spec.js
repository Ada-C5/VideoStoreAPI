var Movie = require('../../models/movie.js')

describe('Movie model', function () {

  afterEach(function () {
    Movie.end()
  })

  describe('.all', function () {

    it("returns an array", function (done) {
      Movie.all(function(error, result) {
        expect(error).toBe(null);
        expect(result).toBe(Array);
      })

      done()
    })
  })

  


})
