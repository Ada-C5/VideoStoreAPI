var request = require('request')
var base_url = "http://localhost:3000/"

describe("Endpoint at /", function () {
  it('responds with a 200 status code', function (done) {
    request.get(base_url, function(error, response, body) {
      expect(response.statusCode).toEqual(200)
      done()
    })
  })

  // it("should be json", function(done) {
  // request.get(base_url, function(error, response, body) {
  //   expect(response.headers['content-type']).toBeNull
  //   done()
  // })
  // });
  //
  // it("should be an array of objects", function(done) {
  //     request.get(base_url, function(error, response, body) {
  //       var data = JSON.parse(body)
  //       expect(typeof data).toEqual('object')
  //
  //         expect(Object.keys(data[0])).toBeNull
  //
  //     done()
  //   })
  // });



})
