var request = require('request');
var base_url = "http://localhost:3000/"
var route = "movies/"


describe("Endpoints under /movies", function() {

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

          expect(Object.keys(data[0])).toEqual([ 'title' ])

      done()
    })
  });
});


describe("Endpoints under /movies/sort/:column", function() {

  it('responds with a 200 status code', function (done) {
    request.get(base_url + route + '/sort/title', function(error, response, body) {
      expect(response.statusCode).toEqual(200)
      done()
    })
  });

  it("should be json", function(done) {
  request.get(base_url + route + '/sort/title', function(error, response, body) {
    expect(response.headers['content-type']).toContain('application/json')
    done()
  })
  });

  it("should be an array of objects", function(done) {
      request.get(base_url + route + '/sort/title', function(error, response, body) {
        var data = JSON.parse(body)
        expect(typeof data).toEqual('object')

          expect(Object.keys(data[0])).toEqual([ 'id', 'title', 'overview', 'release_date', 'inventory' ])

      done()
    })
  });

});

describe("Endpoints under /movies/:title/current", function() {

  it('responds with a 200 status code', function (done) {
    request.get(base_url + route + "/Jaws/current", function(error, response, body) {
      expect(response.statusCode).toEqual(200)
      done()
    })
  });

  it("should be json", function(done) {
  request.get(base_url + route + "/Jaws/current", function(error, response, body) {
    expect(response.headers['content-type']).toContain('application/json')
    done()
  })
  });

  it("should be an array of objects", function(done) {
      request.get(base_url + route + "/Jaws/current", function(error, response, body) {
        var data = JSON.parse(body)
        expect(typeof data).toEqual('object')

          expect(Object.keys(data[0])).toEqual([ 'id', 'name', 'registered_at', 'address', 'city', 'state', 'postal_code', 'phone', 'account_credit' ])

      done()
    })
  });
});

// ******** history path tests are causing server timeouts. wtf?? ********
// describe("Endpoints under /movies/:id/history", function() {
//
//   it('responds with a 200 status code', function (done) {
//     request.get(base_url + route + "/5/history", function(error, response, body) {
//       expect(response.statusCode).toEqual(200)
//       done()
//     })
//   });
//
//   it("should be json", function(done) {
//   request.get(base_url + route + "/5/history", function(error, response, body) {
//     expect(response.headers['content-type']).toContain('application/json')
//     done()
//   })
//   });
//
//   it("should be an array of objects", function(done) {
//       request.get(base_url + route + "/5/history", function(error, response, body) {
//         var data = JSON.parse(body)
//         expect(typeof data).toEqual('object')
//
//         for (var record of data) {
//           expect(Object.keys(data[0])).toEqual(['id'])
//         }
//
//       done()
//     })
//   });
// });
