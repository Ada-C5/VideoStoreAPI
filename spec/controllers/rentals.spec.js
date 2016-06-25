var request = require('request')
var app = require("../../app.js")
var base_url = "http://localhost:3000/rentals"

describe("RentalsController", function(){

  describe("#overdue", function(done){
    it("returns a success response", function(done){
      request.get(base_url+"/overdue", function(error, response, body){
        expect(response.statusCode).toBe(200)
        done()
      })
    })

    it("returns json", function(done){
      request.get(base_url+"/overdue", function(error, response, body){
        expect(response.headers['content-type']).toContain('application/json')
        done()
      })
    })
  })

  describe("#lookupMovie", function(done){
    it("returns a success response", function(done){
      request.get(base_url+"/Jaws", function(error, response, body){
        expect(response.statusCode).toBe(200)
        done()
      })
    })

    it("returns json", function(done){
      request.get(base_url+"/Jaws", function(error, response, body){
        expect(response.headers['content-type']).toContain('application/json')
        done()
      })
    })
  })

  describe("#currentlyCheckedOut", function(done){
    it("returns a success response", function(done){
      request.get(base_url+"/Jaws/customers", function(error, response, body){
        expect(response.statusCode).toBe(200)
        done()
      })
    })

    it("returns json", function(done){
      request.get(base_url+"/Psycho/customers", function(error, response, body){
        expect(response.headers['content-type']).toContain('application/json')
        done()
      })
    })
  })

  describe("#checkout", function(done){
    it("returns a success response", function(done){
      request.post(base_url+"/Jaws/check-out", function(error, response, body){
        expect(response.statusCode).toBe(200)
        done()
      })
    })

    it("returns json", function(done){
      request.post(base_url+"/Psycho/check-out", function(error, response, body){
        expect(response.headers['content-type']).toContain('application/json')
        done()
      })
    })
  })

  describe("#return", function(done){
    it("returns a success response", function(done){
      request.put(base_url+"/Jaws/return", function(error, response, body){
        expect(response.statusCode).toBe(200)
        done()
      })
    })

    it("returns json", function(done){
      request.put(base_url+"/Psycho/return", function(error, response, body){
        expect(response.headers['content-type']).toContain('application/json')
        done()
      })
    })
  })
})