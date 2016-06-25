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

  it('returns a body of content', function (done) {
    request.get(base_url, function(error, response, body) {
      expect(body).toNotBe(null)
      done()
    })
  })

  it('returns json', function (done) {
    request.get(base_url, function(error, response, body) {
      expect(response.headers['content-type']).toContain('application/json')
      done()
    })
  })

  describe('/movies/sort/', function () {
    var goodSort = '/sort/release_date?n=5&p=1'
    var badSort = '/sort/year?n=5&p1'

    it('responds with 200 for a good request', function (done) {
      request.get(base_url + goodSort, function(error, response, body) {
        expect(response.statusCode).toEqual(200)
        done()
      })
    })

    it('returns json', function (done) {
      request.get(base_url + goodSort, function(error, response, body) {
        expect(response.headers['content-type']).toContain('application/json')
        done()
      })
    })

    it('responds with 500 for a bad request', function (done) {
      request.get(base_url + badSort, function(error, response, body) {
        expect(response.statusCode).toEqual(500)
        done()
      })
    })

  })

  describe('/movies/:title/current', function () {
    var goodCurrent = '/Psycho/current'
    var badCurrent = '/Young%20Frankenstein/current'

    it('responds with 200 for a good request', function (done) {
      request.get(base_url + goodCurrent, function(error, response, body) {
        expect(response.statusCode).toEqual(200)
        done()
      })
    })

    it('returns json', function (done) {
      request.get(base_url + goodCurrent, function(error, response, body) {
        expect(response.headers['content-type']).toContain('application/json')
        done()
      })
    })

    it('responds with empty array for bad request', function (done) {
      request.get(base_url + badCurrent, function(error, response, body) {
        expect(body).toEqual('[]')
        done()
      })
    })

  })

})
