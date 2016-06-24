var request = require('request')
var base_url = "http://localhost:3000/movies"
describe("Endpoints under /movies", function() {
  it('responds with a 200 status code', function (done){
    request.get(base_url, function(error, response, body){
      expect(response.statusCode).toEqual(200)
      done()
      })
    })

    describe("the returned json data", function() {
      it('is an array', function(done) {
        request.get(base_url, function(error, response, body) {
          var movies = JSON.parse(body)[0]
          expect(typeof movies).toEqual('object')
          done()
        })
      })

      it('has the right values for the keys', function(done) {
        request.get(base_url, function(error, response, body) {
          var movies = JSON.parse(body)[0]['id']
          expect(movies.title).toEqual("Psycho")
          done()
        })
      })

      it('has the right values for the keys', function(done) {
        request.get(base_url, function(error, response, body) {
          var movies = JSON.parse(body)[0]['id']
          expect(movies.overview).toEqual("When larcenous real estate clerk Marion Crane goes on the lam with a wad of cash and hopes of starting a new life, she ends up at the notorious Bates Motel, where manager Norman Bates cares for his housebound mother. The place seems quirky, but fine… until Marion decides to take a shower.")
          done()
        })
      })



    })





})
