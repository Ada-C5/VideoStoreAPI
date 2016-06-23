var app = require('../../app')
var db = app.get('db')
var Rental = require('../../models/rentals')

//mock customer data
describe('Rental', function () {
  afterEach(function () {
    db.end()
  })

// testing .find_current
  describe('Rental', function () {
    describe('find_current', function () {
      it('returns an array', function(done) {
        Rental.find_current(1, function (error, result) {
          expect(error).toBe(null)
          expect(result).toEqual(jasmine.any(Array))
          done()
        })
      })
    })
  })

  describe('Rental', function() {
    describe('find_current', function () {
      it('returns instances where the checkin_date is null', function(done) {
        Rental.find_current(2, function(error, result) {
          expect(error).toBe(null)
          expect(result[0]['checkin_date']).toBe(null)
          done()
        })
      })
    })
  })

  describe('Rental', function() {
    describe('find_current', function () {
      it('returns instances for one customer only', function(done) {
        Rental.find_current(2, function(error, result) {
          expect(error).toBe(null)
          for (var instance of result) {
            expect(instance['customer_id']).toBe(2)
          }
          done()
        })
      })
    })
  })

// testing .find_history
  describe('Rental', function () {
    describe('find_history', function () {
      it('returns an array', function(done) {
        Rental.find_history(1, function (error, result) {
          expect(error).toBe(null)
          expect(result).toEqual(jasmine.any(Array))
          done()
        })
      })
    })
  })

  describe('Rental', function() {
    describe('find_history', function () {
      it('returns instances where the checkin_date is not null', function(done) {
        Rental.find_history(1, function(error, result) {
          expect(error).toBe(null)
          expect(result[0]['checkin_date']).not.toBe(null)
          done()
        })
      })
    })
  })

  describe('Rental', function() {
    describe('find_history', function () {
      it('returns instances for one customer only', function(done) {
        Rental.find_history(1, function(error, result) {
          expect(error).toBe(null)
          for (var instance of result) {
            expect(instance['customer_id']).toBe(1)
          }
          done()
        })
      })
    })
  })
})





//   var customer_id_test = 123
//   var video_id_test = 101
//   var checkout_date = "Mon, 15 Feb 2015 09:00:14 -0700"
//   var due_date = "Tue, 16 Feb 2015 09:00:14 -0700"
//   var checkin_date = "Wed, 17 Feb 2015 09:00:14 -0700"
//   var charge = 1.00
