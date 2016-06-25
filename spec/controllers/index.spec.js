var request = require('request')
var base_url = "http://localhost:3000/"

describe("Endpoint at /", function () {
  it('responds with a 200 status code', function (done) {
    request.get(base_url, function(error, response, body) {
      expect(response.statusCode).toEqual(200)
      done()
    })
  })

});

describe("Endpoint at api/docs.json", function () {
  it('returns json', function (done) {
    request.get(base_url + 'api/docs.json', function(error, response, body) {
      expect(JSON.parse(response.body)).toBeTruthy;
      done()
    })
  })
})
