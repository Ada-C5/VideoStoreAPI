var request = require("request")

var baseUrl = "http://localhost:3000"

describe("RentalsController", function() {
  var url = function(endpoint) {
    return baseUrl + "/rentals" + endpoint
  }

  describe("/overdue", function() {
    it("returns a Success response", function(done) {
      request.get(url("/overdue"), function(error, response, body) {
        expect(response.statusCode).toBe(200)
        done()
      })
    })

    it("should be json", function(done) {
      request.get(url("/overdue"), function(error, response, body) {
        expect(response.headers['content-type']).toContain('application/json')
        done()
      })
    })

    it("should be an array of objects", function(done) {
      request.get(url("/overdue"), function(error, response, body) {
        var data = JSON.parse(body)
        expect(typeof data).toEqual('object')
        done()
      })
    })
  })

  describe("/:title", function() {
    it("returns a Success response", function(done) {
      request.get(url("/Jaws"), function(error, response, body) {
        expect(response.statusCode).toBe(200)
        done()
      })
    })

    it("should be json", function(done) {
      request.get(url("/Jaws"), function(error, response, body) {
        expect(response.headers['content-type']).toContain('application/json')
        done()
      })
    })

    it("should be an array of objects", function(done) {
      request.get(url("/Jaws"), function(error, response, body) {
        var data = JSON.parse(body)
        expect(typeof data).toEqual('object')
        done()
      })
    })
  })

  describe("/:title/customers", function() {
    it("returns a Success response", function(done) {
      request.get(url("/Jaws/customers"), function(error, response, body) {
        expect(response.statusCode).toBe(200)
        done()
      })
    })

    it("should be json", function(done) {
      request.get(url("/Jaws/customers"), function(error, response, body) {
        expect(response.headers['content-type']).toContain('application/json')
        done()
      })
    })

    it("should be an array of objects", function(done) {
      request.get(url("/Jaws/customers"), function(error, response, body) {
        var data = JSON.parse(body)
        expect(typeof data).toEqual('object')
        done()
      })
    })
  })


})
