var app = require('../../app')
var db = app.get('db')

var Movie = require('../../models/movie')

describe('Movie', function () {
//   // var movie1 = new Movie
  var title1 = "Alien"
//   var title2 = "Alien"

  afterEach(function () {
    db.end()
  })

  describe('#find', function () {
    it('should return correct movie', function (done) {
       Movie.find(title1, function (error, movie1) {
        expect(movie1.title).toEqual(title1)
        expect(error).toBeNull
        done()
      })
    })
  })
})
