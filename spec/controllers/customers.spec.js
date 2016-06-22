var request = require('request');
var base_url = "http://localhost:3000/"
var route = "customers/"
// var app = require('../../app.js');

describe("Endpoints under /customers", function() {
  it('responds with a 200 status code', function (done) {
    request.get(base_url + route, function(error, response, body) {
      expect(response.statusCode).toEqual(200)
      done()
    })
  });



});