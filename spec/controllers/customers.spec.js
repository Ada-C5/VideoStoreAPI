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

  it("should be json", function(done) {
  request.get(base_url + route, function(error, response, body) {
    expect(response.headers['content-type']).toContain('application/json')
    done()
  })
  });

  it("should be an array of objects", function(done) {
      request.get(base_url + route, function(error, response, body) {
        var data = JSON.parse(body)
        expect(typeof data).toEqual('object')

        for (var record of data) {
          expect(Object.keys(record)).toEqual(['id'])
        }

      done()
    })
  });



});
