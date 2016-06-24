var app = require('../../app')
var db = app.get('db')
var Customer = require('../../models/customers')

describe('Customer', function () {
  afterEach(function () {
    db.end()
  })

// testing .all
  describe('all', function () {
    it('should return all customers', function (done) {
      Customer.all(function (error, customers) {
        expect(customers.length).toEqual(200)
        done()
      })
    })
  })

// testing .sort
  describe('sort', function () {
    it('should return customers sorted by specifications', function (done) {
      Customer.sort('name', 1, 1, function (error, customers) {
        expect(customers.length).toEqual(1)
        done()
      })
    })
  })

  describe('sort', function () {
    it('Errors when fed bad info', function(done) {
      Customer.sort('Fake Fake Fake', 1, 1, function(error, result) {
        expect(error.message).toBe("Could not retrieve customers")
        expect(result).toEqual(null)
        done()
      })
    })
  })

  describe('sort', function () {
    it('Errors when fed bad info', function(done) {
      Customer.sort('name', -1, -1, function(error, result) {
        expect(error.message).toBe("Could not retrieve customers")
        expect(result).toEqual(null)
        done()
      })
    })
  })
})
