// still needs error testing for JSON responses

var request = require("request")
var baseUrl = "http://localhost:3000"

describe("VideosController", function() {
  var url = function(endpoint) {
    return baseUrl + "/videos" + endpoint
  }

  describe("#getVideos", function(done) {
    it("returns a Success response", function(done) {
      request.get(url("/"), function(error, response, body) {
        expect(response.statusCode).toBe(200)
        done()
      })
    })

    it("returns JSON", function(done) {
      request.get(url("/"), function(error, response, body) {
        expect(response.headers['content-type']).toContain('application/json')
        done()
      })
    })

    it("should be an array of objects", function(done) {
      request.get(url("/"), function(error, response, body) {
        var data = JSON.parse(body)
        expect(typeof data).toEqual('object')

        for (var record of data) {
          expect(Object.keys(record)).toEqual(['id'])
        }
        done()
      })
    })
  })

  describe('#getVideosSorted', function(done) {
    it('returns a success response', function(done) {
      request.get(url("/sort/title?n=1&p=2"), function(error, response, body) {
        expect(response.statusCode).toBe(200)
        done()
      })
    })

    it("returns JSON", function(done) {
      request.get(url("/sort/title?n=1&p=2"), function(error, response, body) {
        expect(response.headers['content-type']).toContain('application/json')
        done()
      })
    })

    it("should be an array of objects", function(done) {
      request.get(url("/sort/title?n=1&p=2"), function(error, response, body) {
        var data = JSON.parse(body)
        expect(typeof data).toEqual('object')

        for (var record of data) {
          expect(Object.keys(record)).toEqual([ 'id', 'title', 'overview', 'release_date', 'inventory', 'available_inventory' ])
        }
        done()
      })
    })
  })

  describe('#getVideo', function(done) {
    it('returns a success response', function(done) {
      request.get(url("/Jaws"), function(error, response, body) {
        expect(response.statusCode).toBe(200)
        done()
      })
    })

    it("returns JSON", function(done) {
      request.get(url("/Jaws"), function(error, response, body) {
        expect(response.headers['content-type']).toContain('application/json')
        done()
      })
    })

    it("should be an array of objects", function(done) {
      request.get(url("/Jaws"), function(error, response, body) {
        var data = JSON.parse(body)
        expect(typeof data).toEqual('object')

        for (var record of data) {
          expect(Object.keys(record)).toEqual([ 'id', 'title', 'overview', 'release_date', 'inventory', 'available_inventory' ])
        }
        done()
      })
    })
  })

  describe('#getVideosByCustomer', function(done) {
    it('returns a success response', function(done) {
      request.get(url("/Psycho/customers"), function(error, response, body) {
        expect(response.statusCode).toBe(200)
        done()
      })
    })

    it("returns JSON", function(done) {
      request.get(url("/Psycho/customers"), function(error, response, body) {
        expect(response.headers['content-type']).toContain('application/json')
        done()
      })
    })

    it("should be an array of objects", function(done) {
      request.get(url("/Psycho/customers"), function(error, response, body) {
        var data = JSON.parse(body)
        expect(typeof data).toEqual('object')

        for (var record of data) {
          expect(Object.keys(record)).toEqual(['id', 'name', 'registered_at', 'address', 'city', 'state', 'postal_code', 'phone', 'account_credit'])
        }
        done()
      })
    })
  })
})