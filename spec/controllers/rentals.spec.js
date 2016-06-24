var request = require("request")
var baseUrl = "http://localhost:3000"

describe("RentalsController", function() {
  var url = function(endpoint) {
    return baseUrl + "/rentals" + endpoint
  }

  describe(".find", function(done) {
    it("returns a response", function(done) {
      request.get(url("/psycho"), function(error, response, body) {
        done()
      })
    })

    it("returns JSON", function(done) {
      request.get(url("/psycho"), function(error, response, body) {
        expect(response.headers['content-type']).toContain('application/json')
        done()
      })
    })

    it("should be an array of objects", function(done) {
      request.get(url("/psycho"), function(error, response, body) {
        var data = JSON.parse(body)
        expect(typeof data).toEqual('object')
        for (var record of data) {
          expect(Object.keys(record)).toEqual([ 'overview', 'release_date', 'inventory', 'inventory_total' ])
        }
        done()
      })
    })
  })

  describe('.findCustomers', function(done) {
    it('returns a successful response', function(done) {
      request.get(url("/psycho/customers"), function(error, response, body) {
        expect(response.statusCode).toBe(200)
        done()
      })
    })

    it("returns JSON", function(done) {
      request.get(url("/psycho/customers"), function(error, response, body) {
        expect(response.headers['content-type']).toContain('application/json')
        done()
      })
    })

    it("should be an array of objects", function(done) {
      request.get(url("/psycho/customers"), function(error, response, body) {
        var data = JSON.parse(body)
        expect(typeof data).toEqual('object')

        for (var record of data) {
          expect(Object.keys(record)).toEqual([ 'id', 'name', 'registered_at', 'address', 'city', 'state', 'postal_code', 'phone', 'account_credit' ])
        }
        done()
      })
    })
  })

// /rentals/:movie/check-out/:id
  describe('.checkOut', function(done) {
    it('returns a successful response', function(done) {
      request.get(url("/alien/check-out/22"), function(error, response, body) {
        expect(response.statusCode).toBe(200)
        expect(response.headers['content-type']).toContain('application/json')

        // var data = JSON.parse(body)
        // expect(typeof data).toEqual('object')
        //
        // for (var record of data) {
        //   expect(Object.keys(record)).toEqual([ 'return_date' ])
        // }
        done()
      })
    })
  })

  describe('.return', function(done) {
    it('returns a successful response', function(done) {
      request.get(url("/alien/return/22"), function(error, response, body) {
        expect(response.statusCode).toBe(200)
        expect(response.headers['content-type']).toContain('application/json')
        // var data = JSON.parse(body)
        // expect(typeof data).toEqual('object')
        //
        // for (var record of data) {
        //   expect(Object.keys(record)).toEqual(['id', 'name', 'registered_at', 'address', 'city', 'state', 'postal_code', 'phone', 'account_credit'])
        // }
        done()
      })
    })
  })


  //   it("should be an array of objects", function(done) {
  //     request.get(url("/Psycho/history/sort/name"), function(error, response, body) {
  //       var data = JSON.parse(body)
  //       expect(typeof data).toEqual('object')
  //
  //       for (var record of data) {
  //         expect(Object.keys(record)).toEqual(['id', 'name', 'registered_at', 'address', 'city', 'state', 'postal_code', 'phone', 'account_credit'])
  //       }
  //       done()
  //     })
  //   })
  // }),
  //
  describe('.overdue', function(done) {
    it('returns a successful response', function(done) {
      request.get(url("/overdue"), function(error, response, body) {
        expect(response.statusCode).toBe(200)
        expect(response.headers['content-type']).toContain('application/json')
        done()
      })
    })
  })
  //
  //   it("returns JSON", function(done) {
  //     request.get(url("/Psycho/history/sort/name"), function(error, response, body) {
  //       done()
  //     })
  //   })
  //
  //   it("should be an array of objects", function(done) {
  //     request.get(url("/Psycho/history/sort/name"), function(error, response, body) {
  //       var data = JSON.parse(body)
  //       expect(typeof data).toEqual('object')
  //
  //       for (var record of data) {
  //         expect(Object.keys(record)).toEqual(['id', 'name', 'registered_at', 'address', 'city', 'state', 'postal_code', 'phone', 'account_credit'])
  //       }
  //       done()
  //     })
  //   })
  // })

})
