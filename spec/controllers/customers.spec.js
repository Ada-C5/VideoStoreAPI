var request = require('request')
var app = require("../../app.js")
var base_url = "http://localhost:3000/customers"

describe("CustomersController", function(){

  describe("#index", function(done){
    it("returns a success response", function(done){
      request.get(base_url, function(error, response, body){
        expect(response.statusCode).toBe(200)
        done()
      })
    })

    it("returns json", function(done){
      request.get(base_url, function(error, response, body){
        expect(response.headers['content-type']).toContain('application/json')
        done()
      })
    })

    it("returns customer information", function(done){
      request.get(base_url, function(error, response, body){
        var data = JSON.parse(body)
        expect(Object.keys(data[4])).toEqual(["id", "name", "registered_at", "postal_code", "phone", "account_credit"])
        done()
      })
    })
  })

  describe("#sortBy", function(done){
    it("returns a success response", function(done){
      request.get(base_url+"/sort/name?n=10&p=2", function(error, response, body){
        expect(response.statusCode).toBe(200)
        done()
      })
    })

    it("returns json", function(done){
      request.get(base_url+"/sort/name?n=10&p=2", function(error, response, body){
        expect(response.headers['content-type']).toContain('application/json')
        done()
      })
    })

    it("returns customer information", function(done){
      request.get(base_url+"/sort/name?n=10&p=2", function(error, response, body){
        var data = JSON.parse(body)
        expect(Object.keys(data[0])).toEqual(["id", "name", "registered_at", "postal_code", "phone", "account_credit"])
        done()
      })
    })

    it("returns the correct number of rows", function(done){
      request.get(base_url+"/sort/name?n=22&p=2", function(error, response, body){
        var data = JSON.parse(body)
        expect(data.length).toEqual(22)
        done()
      })
    })
  })

  describe("#current", function(done){
    it("returns a success response", function(done){
      request.get(base_url+"/1/current", function(error, response, body){
        expect(response.statusCode).toBe(200)
        done()
      })
    })

    it("returns json", function(done){
      request.get(base_url+"/1/current", function(error, response, body){
        expect(response.headers['content-type']).toContain('application/json')
        done()
      })
    })
  })

  describe("#history", function(done){
    it("returns a success response", function(done){
      request.get(base_url+"/33/history", function(error, response, body){
        expect(response.statusCode).toBe(200)
        done()
      })
    })

    it("returns json", function(done){
      request.get(base_url+"/33/history", function(error, response, body){
        expect(response.headers['content-type']).toContain('application/json')
        done()
      })
    })
  })
})
