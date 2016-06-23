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
        expect(rentals.length).toEqual(2)
        done()
      })
    })
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
        expect(rentals.length).toEqual(2)
        done()
      })
    })
  })
})
