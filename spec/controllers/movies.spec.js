var request = require('request')
var base_url = "http://localhost:3000"

////sample shizz
var endpoints = ['/movies', '/movies/sort/title', '/movies/sort/release-date', '/movies/1/current', '/movies/1/history/sort/name', '/movies/1/history/sort/date', '/movies/rentals/1', '/movies/rentals/1/customers', '/movies/rentals/overdue']

for (var endpoint of endpoints) {

describe("Endpoint at " + endpoint, function () {
  it('responds with a 200 status code', function (done) {
    request.get(base_url + endpoint, function(error, response, body) {
      expect(response.statusCode).toEqual(200)
      done()
    })
  })

  it("returns JSON", function(done) {
      request.get(base_url + endpoint, function(error, response, body) {
        expect(response.headers['content-type']).toContain('application/json')
        done()
      })
    })

  it("should be an array of objects", function(done) {
    request.get(base_url + endpoint, function(error, response, body) {
      var data = JSON.parse(body)
      expect(typeof data).toEqual('object')

    if (data.length === 6) {
      for (var record of data) {
        expect(Object.keys(record)).toEqual([ 'id', 'title', 'overview', 'inventory', 'available', 'release_date'])
      }
      done()
    } else {
      for (var record of data) {
        expect(Object.keys(record)).toEqual([ 'customer_id', 'movie_id', 'check_out_date', 'due_date' ])
      }
      done()
    }

    })
  })

  // it('has the right values', function(done) {
  //    request.get(base_url + endpoint, function(error, response, body) {
  //      var data = JSON.parse(body)
  //      expect(data['0'].title).toEqual('Psycho')
  //      done()
  //    })
  //  })
})
}; //end of loop

/////ORIGINAL STUFF BELOW

// describe("Endpoint at /movies", function () {
//   it('responds with a 200 status code', function (done) {
//     request.get(base_url, function(error, response, body) {
//       expect(response.statusCode).toEqual(200)
//       done()
//     })
//   })
//
//   it("returns JSON", function(done) {
//       request.get(base_url, function(error, response, body) {
//         expect(response.headers['content-type']).toContain('application/json')
//         done()
//       })
//     })
//
//   it("should be an array of objects", function(done) {
//     request.get(base_url, function(error, response, body) {
//       var data = JSON.parse(body)
//       expect(typeof data).toEqual('object')
//
//       for (var record of data) {
//         expect(Object.keys(record)).toEqual([ 'id', 'title', 'overview', 'inventory', 'available', 'release_date'])
//       }
//       done()
//     })
//   })
//
//   it('has the right values', function(done) {
//      request.get(base_url, function(error, response, body) {
//        var data = JSON.parse(body)
//        expect(data['0'].title).toEqual('Psycho')
//        done()
//      })
//    })
// })
