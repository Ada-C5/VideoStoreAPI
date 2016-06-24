var app = require('../../app')
var db = app.get('db')

var Rental = require('../../models/rental')

describe('Rental', function () {

  afterEach(function () {
    db.end()
  })

  describe('.currentCheckedOut', function () {
    // input should be [order, firstrow, lastrow]
    it('should return an array', function(done) {
      Rental.currentCheckedOut([55,'checked_out'], function(error,rentals){
        expect(rentals).toEqual(jasmine.any(Array))
        done()
      })
    })

    it('be a certain size', function(done) {
      Rental.currentCheckedOut([4,'checked_out'], function(error,rentals){
        expect(rentals.length).toBeGreaterThan(1)
        done()
      })
    })
  })

  describe('.all', function () {
    // input should be [order, firstrow, lastrow]
    it('should return an array', function(done) {
      Rental.all([55], function(error,rentals){
        expect(rentals).toEqual(jasmine.any(Array))
        done()
      })
    })

    it('be a certain size', function(done) {
      Rental.all([4], function(error,rentals){
        expect(rentals.length).toBeGreaterThan(3)
        done()
      })
    })

    it('returns an error if no input', function(done) {
      Rental.all([], function(error,rentals){
        // console.log(error, rentals)
        expect(rentals).toEqual(undefined)
        expect(error).toNotEqual(null)
        done()
      })
    })
  })

  describe('.overdueList', function () {
    // input should be [order, firstrow, lastrow]
    it('should return an array', function(done) {
      Rental.overdueList(function(error,rentals){
        expect(rentals).toEqual(jasmine.any(Array))
        done()
      })
    })

    it('be a certain size', function(done) {
      Rental.overdueList(function(error,rentals){
        expect(rentals.length).toEqual(1)
        done()
      })
    })
  })

  describe('.checkOut', function () {
    // input should be [order, firstrow, lastrow]
    it('should return an array', function(done) {
      Rental.checkOut(['Jaws', 4], function(error,rentals){
        expect(rentals).toEqual(jasmine.any(Array))
        done()
      })
    })
  })

  describe('.return', function () {
    // input should be [order, firstrow, lastrow]
    it('should return an array', function(done) {
      Rental.return(['Jaws', 4], function(error,rentals){
        expect(rentals).toEqual(jasmine.any(Array))
        done()
      })
    })
  })
})
