var request = require('request')
var base_url = "http://localhost:3000/customers"


describe("#index", function() {
    it("returns a Success response", function(done) {
      request.get("http://localhost:3000/customers", function(error, response, body) {
        expect(response.statusCode).toBe(200)
        done()
      })
    })


    it("should be json", function(done) {
        request.get("http://localhost:3000/customers", function(error, response, body) {
          expect(response.headers['content-type']).toContain('application/json')
          done()
        })
      })
      it("should be an array of objects", function(done) {
      request.get("http://localhost:3000/customers", function(error, response, body) {
        var customers = JSON.parse(body)
        expect(typeof customers).toEqual('object')
        done()
      })
    })
})

describe("#sort", function() {
    it("returns a Success response", function(done) {
      request.get("http://localhost:3000/customers/sort/id", function(error, response, body) {
        expect(response.statusCode).toBe(200)
        done()
      })
    })

    it("should be json", function(done) {
        request.get("http://localhost:3000/customers/sort/id", function(error, response, body) {
          expect(response.headers['content-type']).toContain('application/json')
          done()
        })
      })


    it("should be an array of objects", function(done) {
      request.get("http://localhost:3000/customers/sort/id", function(error, response, body) {
        var customers = JSON.parse(body)
        expect(typeof customers).toEqual('object')
        done()
      })
    })

})



describe("#current", function() {
    it("returns a Success response", function(done) {
      request.get("http://localhost:3000/customers/12/current", function(error, response, body) {
        expect(response.statusCode).toBe(200)
        done()
      })
    })

    it("should be json", function(done) {
        request.get("http://localhost:3000/customers/12/current", function(error, response, body) {
          expect(response.headers['content-type']).toContain('application/json')
          done()
        })
      })


    it("should be an array of objects", function(done) {
      request.get("http://localhost:3000/customers/12/current", function(error, response, body) {
        var customers = JSON.parse(body)
        expect(typeof customers).toEqual('object')
        done()
      })
    })

  })


  describe("#history", function() {
      it("returns a Success response", function(done) {
        request.get("http://localhost:3000/customers/47/history", function(error, response, body) {
          expect(response.statusCode).toBe(200)
          done()
        })
      })

      it("should be json", function(done) {
          request.get("http://localhost:3000/customers/47/history", function(error, response, body) {
            expect(response.headers['content-type']).toContain('application/json')
            done()
          })
        })


      it("should be an array of objects", function(done) {
        request.get("http://localhost:3000/customers/47/history", function(error, response, body) {
          var customers = JSON.parse(body)
          expect(typeof customers).toEqual('object')
          done()
        })
      })

    })
