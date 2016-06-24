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

  describe('.sortBy', function () {
    // input should be [order, firstrow, lastrow]
    it('should return an array', function(done) {
      Customer.sortBy(['postal_code',1,20],function(error,customers){
        expect(customers).toEqual(jasmine.any(Array))
        done()
      })
    })

    it('be a certain size', function(done) {
      Customer.sortBy(['name',1,20], function(error,customers){
        expect(customers.length).toEqual(20)
        done()
      })
    })

    it('produces an error when it doesnt recognize a column', function(done) {
      Customer.sortBy(['imanerror',1,20], function(error,customers){
        expect(error.message).toEqual('column "imanerror" does not exist')
        done()
      })
    })
  })

  describe('.customersWithMovie', function () {
    // input should be [order, firstrow, lastrow]
    it('should return an array', function(done) {
      Customer.customersWithMovie(['Jaws'],function(error,customers){
        expect(customers).toEqual(jasmine.any(Array))
        done()
      })
    })

    it('be a certain size', function(done) {
      Customer.customersWithMovie(['Psycho'], function(error,customers){
        expect(customers.length).toEqual(1)
        done()
      })
    })

    it('returns an error if no input', function(done) {
      Customer.customersWithMovie([], function(error,customers){
        expect(customers).toEqual(undefined)
        expect(error).toNotEqual(null)
        done()
      })
    })
  })

  describe('.rentedThisMovie', function () {
    // input should be [order, firstrow, lastrow]
    it('should return an array', function(done) {
      Customer.rentedThisMovie(['Jaws', 'checkout_date'], function(error,customers){
        expect(customers).toEqual(jasmine.any(Array))
        done()
      })
    })

    it('be a certain size', function(done) {
      Customer.rentedThisMovie(['Psycho', 'name'], function(error,customers){
        expect(customers.length).toBeGreaterThan(2)
        done()
      })
    })
  })

  describe('.currentlyCheckedOut', function () {
    // input should be [order, firstrow, lastrow]
    it('should return an array', function(done) {
      Customer.currentlyCheckedOut(['Jaws'], function(error,customers){
        expect(customers).toEqual(jasmine.any(Array))
        done()
      })
    })

    it('be a certain size', function(done) {
      Customer.currentlyCheckedOut(['Psycho'], function(error,customers){
        expect(customers.length).toEqual(1)
        done()
      })
    })
  })
})


