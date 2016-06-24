var request = require('request');
var base_url = "http://localhost:3000/movies/"

describe("Endpoints under /movies", function() {
  it('responds with a 200 status code', function (done) {
    request.get(base_url, function(error, response, body) {
      expect(response.statusCode).toEqual(200)
      done()
    })
  })

  it('returns a body of content', function (done) {
    request.get(base_url, function(error, response, body) {
      expect(body).toNotBe(null)
      done()
    })
  })

  it('returns json', function (done) {
    request.get(base_url, function(error, response, body) {
      expect(response.headers['content-type']).toContain('application/json')
      done()
    })
  })

  describe('/movies/sort/')
  it('returns json', function (done) {
    request.get(base_url, function(error, response, body) {
      expect(response.headers['content-type']).toContain('application/json')
      done()
    })
  })
})
