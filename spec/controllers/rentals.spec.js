var request = require('request');
var base_url = "http://localhost:3000/"
var route = "rentals/Jaws"


describe("Endpoints under /rentals", function() {
  it('responds with a 200 status code', function (done) {
    request.get(base_url + route, function(error, response, body) {
      expect(response.statusCode).toEqual(200)
      done()
    })
  });



});
