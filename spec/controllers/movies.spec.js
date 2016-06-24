var request = require('request')
var app = require("../../app.js")
var base_url = "http://localhost:3000/movies"

describe("RentalsController", function(){

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
  })
})
