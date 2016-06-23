var app = require('../../app')
var db = app.get('db')
var Rental = require('../../models/rentals')

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
      it('returns instances with correct keys', function(done) {
        Rental.find_current(2, function(error, result) {
          expect(error).toBe(null)
          expect(Object.keys(result[0])).toEqual(['id', 'customer_id', 'video_id', 'checkout_date', 'due_date', 'checkin_date', 'charge'])
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
      it('returns instances with correct keys', function(done) {
        Rental.find_history(1, function(error, result) {
          expect(error).toBe(null)
          expect(Object.keys(result[0])).toEqual(['id', 'customer_id', 'video_id', 'checkout_date', 'due_date', 'checkin_date', 'charge'])
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

  // testing .overdue
  describe('Rental', function () {
    describe('overdue', function () {
      it('returns an array', function(done) {
        Rental.overdue(function (error, result) {
          expect(error).toBe(null)
          expect(result).toEqual(jasmine.any(Array))
          done()
        })
      })
    })
  })

  describe('Rental', function() {
    describe('overdue', function () {
      it('returns instances with correct keys', function(done) {
        Rental.overdue(function(error, result) {
          expect(error).toBe(null)
          for (var instance of result) {
            expect(Object.keys(instance)).toEqual(['customer', 'video', 'checkout_date', 'due_date'])
          }
          done()
        })
      })
    })
  })

  describe('Rental', function() {
    describe('overdue', function () {
      it('returns instances where the checkin_date is not null', function(done) {
        Rental.overdue(function(error, result) {
          expect(error).toBe(null)
          for (var instance of result) {
            expect(instance['checkin_date']).not.toBe(null)
          }
          done()
        })
      })
    })
  })

  // testing .video_current
  describe('Rental', function () {
    describe('video_current', function () {
      it('returns an array', function(done) {
        Rental.video_current('Psycho', function (error, result) {
          expect(error).toBe(null)
          expect(result).toEqual(jasmine.any(Array))
          done()
        })
      })
    })
  })

  describe('Rental', function() {
    describe('video_current', function () {
      it('returns instances with correct keys', function(done) {
        Rental.video_current('Psycho', function(error, result) {
          expect(error).toBe(null)
          for (var instance of result) {
            expect(Object.keys(instance)).toEqual(['id', 'name', 'registered_at', 'address', 'city', 'state', 'postal_code', 'phone', 'account_credit'])
          }
          done()
        })
      })
    })
  })

  describe('Rental', function() {
    describe('video_current', function () {
      it('returns correct customer', function(done) {
        Rental.video_current('Psycho', function(error, result) {
          expect(error).toBe(null)
          for (var instance of result) {
            expect(instance['id']).toBe(8)
            expect(instance['name']).toBe('Amanda Curtis')
          }
          done()
        })
      })
    })
  })

  // testing .find_video_history
  describe('Rental', function () {
    describe('find_video_history', function () {
      it('returns an array', function(done) {
        Rental.find_video_history('Psycho', 'name', function (error, result) {
          expect(error).toBe(null)
          expect(result).toEqual(jasmine.any(Array))
          done()
        })
      })
    })
  })

  describe('Rental', function() {
    describe('find_video_history', function () {
      it('returns instances with correct keys', function(done) {
        Rental.find_video_history('Psycho', 'name', function(error, result) {
          expect(error).toBe(null)
          for (var instance of result) {
            expect(Object.keys(instance)).toEqual(['id', 'name', 'registered_at', 'address', 'city', 'state', 'postal_code', 'phone', 'account_credit'])
          }
          done()
        })
      })
    })
  })

  describe('Rental', function() {
    describe('find_video_history', function () {
      it('returns correct number of records', function(done) {
        Rental.find_video_history('Psycho', 'name', function(error, result) {
          expect(error).toBe(null)
          var iteration = 0
          for (var instance of result) {
            iteration++
          }
          expect(iteration).toEqual(3)
          done()
        })
      })
    })
  })

  describe('Rental', function() {
    describe('find_video_history', function () {
      it('orders by name', function(done) {
        Rental.find_video_history('Psycho', 'name', function(error, result) {
          expect(error).toBe(null)
          expect(result[0]['name']).toBe('Carolyn Chandler')
          done()
        })
      })
    })
  })

  describe('Rental', function() {
    describe('find_video_history', function () {
      it('orders by checkout_date', function(done) {
        Rental.find_video_history('Psycho', 'checkout_date', function(error, result) {
          expect(error).toBe(null)
          expect(result[0]['name']).toBe('Shelley Rocha')
          done()
        })
      })
    })
  })
})

// TESTS STILL NEEDED FOR CHECKIN AND CHECKOUT, AND ERROR TESTING FOR EACH ABOVE.
