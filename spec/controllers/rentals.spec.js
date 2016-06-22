// still needs error testing for JSON responses

var request = require("request")
var baseUrl = "http://localhost:3000"

describe("RentalsController", function() {
  var url = function(endpoint) {
    return baseUrl + "/rentals" + endpoint
  }

  describe("#getCurrentRentals", function(done) {
    it("returns a Success response", function(done) {
      request.get(url("/customer/1/current"), function(error, response, body) {
        expect(response.statusCode).toBe(200)
        done()
      })
    })

    it("returns JSON", function(done) {
      request.get(url("/customer/1/current"), function(error, response, body) {
        expect(response.headers['content-type']).toContain('application/json')
        done()
      })
    })

    it("should be an array of objects", function(done) {
      request.get(url("/customer/1/current"), function(error, response, body) {
        var data = JSON.parse(body)
        expect(typeof data).toEqual('object')

        for (var record of data) {
          expect(Object.keys(record)).toEqual(['id'])
        }
        done()
      })
    })
  })

  describe("#getRentalHistory", function(done) {
    it("returns a Success response", function(done) {
      request.get(url("/customer/1/history"), function(error, response, body) {
        expect(response.statusCode).toBe(200)
        done()
      })
    })

    it("returns JSON", function(done) {
      request.get(url("/customer/1/history"), function(error, response, body) {
        expect(response.headers['content-type']).toContain('application/json')
        done()
      })
    })

    it("should be an array of objects", function(done) {
      request.get(url("/customer/1/history"), function(error, response, body) {
        var data = JSON.parse(body)
        expect(typeof data).toEqual('object')

        for (var record of data) {
          expect(Object.keys(record)).toEqual([ 'id', 'customer_id', 'video_id', 'checkout_date', 'due_date', 'checkin_date', 'charge' ])
        }
        done()
      })
    })
  })

  describe("#getVideoCurrent", function(done) {
    it("returns a Success response", function(done) {
      request.get(url("/Jaws/current"), function(error, response, body) {
        expect(response.statusCode).toBe(200)
        done()
      })
    })

    it("returns JSON", function(done) {
      request.get(url("/customer/1/history"), function(error, response, body) {
        expect(response.headers['content-type']).toContain('application/json')
        done()
      })
    })

    it("should be an array of objects", function(done) {
      request.get(url("/customer/1/history"), function(error, response, body) {
        var data = JSON.parse(body)
        expect(typeof data).toEqual('object')

        for (var record of data) {
          expect(Object.keys(record)).toEqual([ 'id', 'customer_id', 'video_id', 'checkout_date', 'due_date', 'checkin_date', 'charge' ])
        }
        done()
      })
    })
  })

  describe("#getVideoHistory", function(done) {
    it("returns a Success response", function(done) {
      request.get(url("/Jaws/history/sort/account_credit"), function(error, response, body) {
        expect(response.statusCode).toBe(200)
        done()
      })
    })

    it("returns JSON", function(done) {
      request.get(url("/Jaws/history/sort/account_credit"), function(error, response, body) {
        expect(response.headers['content-type']).toContain('application/json')
        done()
      })
    })

    it("should be an array of objects", function(done) {
      request.get(url("/Jaws/history/sort/account_credit"), function(error, response, body) {
        var data = JSON.parse(body)
        expect(typeof data).toEqual('object')

        for (var record of data) {
          expect(Object.keys(record)).toEqual([ 'id', 'name', 'registered_at', 'address', 'city', 'state', 'postal_code', 'phone', 'account_credit' ])
        }
        done()
      })
    })
  })

  describe("#getOverdue", function(done) {
    it("returns a Success response", function(done) {
      request.get(url("/overdue"), function(error, response, body) {
        expect(response.statusCode).toBe(200)
        done()
      })
    })

    it("returns JSON", function(done) {
      request.get(url("/overdue"), function(error, response, body) {
        expect(response.headers['content-type']).toContain('application/json')
        done()
      })
    })

    it("should be an array of objects", function(done) {
      request.get(url("/overdue"), function(error, response, body) {
        var data = JSON.parse(body)
        expect(typeof data).toEqual('object')

        for (var record of data) {
          expect(Object.keys(record)).toEqual([ 'customer', 'video', 'checkout_date', 'due_date'])
        }
        done()
      })
    })
  })
})
// this junk does not work yet

  // describe("#postCheckout", function(done) {
  //   it("returns a Success checkout response", function(done) {
  //     request.post(url("/video/Vertigo/checkout/3/"), function(error, response, body) {
  //       expect(response.statusCode).toBe(200)
  //       done()
  //     })
  //   })

  //   it("returns JSON", function(done) {
  //     request.post(url("/video/Vertigo/checkout/3/"), function(error, response, body) {
  //       expect(response.headers['content-type']).toContain('application/json')
  //       done()
  //     })
  //   })

  //   it("should be an array of objects", function(done) {
  //     request.post(url("/video/Vertigo/checkout/3/"), function(error, response, body) {
  //       var data = JSON.parse(body)
  //       expect(typeof data).toEqual('object')

  //       for (var record of data) {
  //         expect(Object.keys(record)).toEqual([ 'id', 'customer_id', 'video_id', 'checkout_date', 'due_date', 'checkin_date', 'charge'])
  //       }
  //       done()
  //     })
  //   })
  // })
