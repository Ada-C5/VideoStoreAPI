var app = require('../../app')
var db = app.get('db')

var Customer = require('../../models/customer')

describe('Customer', function () {
  beforeEach(function(){

  })

  afterEach(function () {
    db.end()
  })

  describe('.all', function () {
    it('should return an array', function(done) {
      Customer.all(function(error,customers){
        expect(customers).toEqual(jasmine.any(Array))
        done()
      })

    })

    it('be at least certain size', function(done) {
      Customer.all(function(error,customers){
        expect(customers.length).toBeGreaterThan(199)
        done()
      })

    })

  })
})


