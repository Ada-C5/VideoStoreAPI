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
    it('should return an array',function(done){
      Movie.all(function(error,movies){
        expect(movies).toEqual(jasmine.any(Array))
      done()
      })
    })

    // it('should contain movie objects',function(done){
    //   Movie.all(function(error,movies){
    //     expect(movies[0]).toContain("soemhting")
    //   done()
    //   })
    // })
  })

})
