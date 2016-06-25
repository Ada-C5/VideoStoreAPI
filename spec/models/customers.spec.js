var app = require('../../app')
var db = app.get('db')
var Customer = require('../../models/customer')

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
    it('should return customers sorted by name', function (done) {
      Customer.sort('name', 1, 1, function (error, customers) {
        expect(customers.length).toEqual(1)
        done()
      })
    })
  })

  describe('find', function () {
    it('Errors when fed bad info', function(done) {
      Customer.find([10000,'true'], function(error, result) {
        expect(error.message).toBe("Could not retrieve customers rentals")
        expect(result).toEqual(null)
        done()
      })
    })
  })

  describe('find', function () {
    it('should return rentals that customer has checked out', function(done) {
      Customer.find([1,'true'], function(error, customers) {
          expect(customers.length).toEqual(7)
        done()
      })
    })
  })

  describe('history', function () {
    it('select customer history', function(done) {
      Customer.history([1,'false'], "rentals.rental_date",function(error, customers) {
          expect(customers.length).toEqual(5)
        done()
      })
    })
  })

  describe('history', function () {
    it('Errors when fed bad info', function(done) {
      Customer.history([10000,'false'], "rentals.rental_date", function(error, result) {
        expect(error.message).toBe("Could not retrieve customers rentals")
        expect(result).toEqual(null)
        done()
      })
    })
  })

})
