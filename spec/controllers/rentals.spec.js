var request = require('request');
var base_url = "http://localhost:3000/"
var route = "rentals/"


describe("Endpoints under /rentals", function() {
  it('/overdue responds with a 200 status code', function (done) {
    request.get(base_url + route + "/overdue", function(error, response, body) {
      expect(response.statusCode).toEqual(200)
      done()
    })
  });
});