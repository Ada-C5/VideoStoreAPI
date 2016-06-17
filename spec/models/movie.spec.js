var app = require('../../app')
var db = app.get('db')

var Movie = require('../../models/movie')

describe('Movie', function () {
//   // var movie1 = new Movie
//   var title1 = "Jaws"
//   var title2 = "Alien"

  afterEach(function () {
    db.end()
  })

  describe('#find', function () {
    it('should return correct movie', function (done) {
       Movie.find("Jaws", function (error, movie1) {
        expect(movie1.title).toEqual("Jaws")
        expect(error).toBeNull
        done()
      })
    })
  })
})
