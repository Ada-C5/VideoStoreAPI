var request = require("request")
var baseUrl = "http://localhost:3000"

describe("CustomerController", function() {
  var url = function(endpoint) {
    return baseUrl + "/customers" + endpoint
  }

  describe(".index", function(done) {
    it("returns a response", function(done) {
      request.get(url("/"), function(error, response, body) {
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
          expect(Object.keys(record)).toEqual([ 'id' ])
        }
        done()
      })
    })
  })

  describe('.subset', function(done) {
    it('returns a successful response', function(done) {
      request.get(url("/sort/name"), function(error, response, body) {
        expect(response.statusCode).toBe(200)
        done()
      })
    })

    it("returns JSON", function(done) {
      request.get(url("/sort/name"), function(error, response, body) {
        expect(response.headers['content-type']).toContain('application/json')
        done()
      })
    })

    it("should be an array of objects", function(done) {
      request.get(url("/sort/name"), function(error, response, body) {
        var data = JSON.parse(body)
        expect(typeof data).toEqual('object')

        for (var record of data) {
          expect(Object.keys(record)).toEqual([ 'id' ])
        }
        done()
      })
    })
  })

  describe('.current', function(done) {
    it('returns a successful response', function(done) {
      request.get(url("/5/current"), function(error, response, body) {
        expect(response.statusCode).toBe(200)
        done()
      })
    })

    it("returns JSON", function(done) {
      request.get(url("/5/current"), function(error, response, body) {
        expect(response.headers['content-type']).toContain('application/json')
        done()
      })
    })

    it("should be an array of objects", function(done) {
      request.get(url("/5/current"), function(error, response, body) {
        var data = JSON.parse(body)
        expect(typeof data).toEqual('object')

        for (var record of data) {
          expect(Object.keys(record)).toEqual([ 'id', 'title', 'release_date', 'synopsis' ])
        }
        done()
      })
    })
  })

  describe('.history', function(done) {
    it('returns a successful response', function(done) {
      request.get(url("/5/history"), function(error, response, body) {
        expect(response.statusCode).toBe(200)
        done()
      })
    })

    it("returns JSON", function(done) {
      request.get(url("/5/history/"), function(error, response, body) {
        expect(response.headers['content-type']).toContain('application/json')
        done()
      })
    })

    it("should be an array of objects", function(done) {
      request.get(url("/5/history/"), function(error, response, body) {
        var data = JSON.parse(body)
        expect(typeof data).toEqual('object')

        for (var record of data) {
          expect(Object.keys(record)).toEqual([ 'id', 'title', 'search_title', 'overview', 'release_date', 'inventory', 'inventory_total', 'movie_id', 'customer_id', 'checked', 'rental_date', 'due_date', 'return_date' ])
        }
        done()
      })
    })
  })

})
