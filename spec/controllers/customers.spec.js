var request = require("request")

var baseUrl = "http://localhost:3000"


describe("CustomersController", function() {
  var url = function(endpoint) {
    return baseUrl + "/customers" + endpoint
  }

  describe("#getCustomers", function(done) {
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
          expect(Object.keys(record)).toEqual([ 'id', 'name', 'registered_at', 'address', 'city', 'state', 'postal_code', 'phone', 'account_credit' ])
        }
        done()
      })
    })
  })

  describe('#getCustomersShow', function(done) {
    it('returns a success response', function(done) {
      request.get(url("/Curran Stout"), function(error, response, body) {
        expect(response.statusCode).toBe(200)
        done()
      })
    })

    it("returns JSON", function(done) {
      request.get(url("/Curran Stout"), function(error, response, body) {
        expect(response.headers['content-type']).toContain('application/json')
        done()
      })
    })

    it("should be an array of objects", function(done) {
      request.get(url("/Curran Stout"), function(error, response, body) {
        var data = JSON.parse(body)
        expect(typeof data).toEqual('object')

          expect(Object.keys(data)).toEqual([ 'id', 'name', 'registered_at', 'address', 'city', 'state', 'postal_code', 'phone', 'account_credit' ])
        done()
      })
    })
  })

  describe('#getCustomersSort', function(done) {
    it('returns a success response', function(done) {
      request.get(url("/sort/name?n=1&p=2"), function(error, response, body) {
        expect(response.statusCode).toBe(200)
        done()
      })
    })

    it("returns JSON", function(done) {
      request.get(url("/sort/name?n=1&p=2"), function(error, response, body) {
        expect(response.headers['content-type']).toContain('application/json')
        done()
      })
    })

    it("should be an array of objects", function(done) {
      request.get(url("/sort/name?n=1&p=2"), function(error, response, body) {
        var data = JSON.parse(body)
        expect(typeof data).toEqual('object')

        for (var record of data) {
          expect(Object.keys(record)).toEqual([ 'id', 'name', 'registered_at', 'address', 'city', 'state', 'postal_code', 'phone', 'account_credit' ])
        }
        done()
      })
    })
  })
})
