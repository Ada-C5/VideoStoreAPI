var app = require('../../app')
var db = app.get('db')
var Video = require('../../models/videos')

//mock customer data
describe('Video', function () {
  afterEach(function () {
    db.end()
  })

// testing .all
  describe('Video', function () {
    describe('all', function () {
      it('returns an array', function(done) {
        Video.all(function (error, result) {
          expect(error).toBe(null)
          expect(result).toEqual(jasmine.any(Array))
          done()
        })
      })
    })
  })

  describe('Video', function() {
    describe('all', function () {
      it('returns instances with correct keys', function(done) {
        Video.all(function(error, result) {
          expect(error).toBe(null)
          expect(Object.keys(result[0]['id'])).toEqual(['id', 'title', 'overview', 'release_date', 'inventory', 'available_inventory'])
          done()
        })
      })
    })
  })

  describe('Video', function() {
    describe('all', function () {
      it('returns all video records', function(done) {
        Video.all(function(error, result) {
          expect(error).toBe(null)
          expect(result.length).toEqual(100)
          done()
        })
      })
    })
  })

  // testing .find
  describe('Video', function () {
    describe('find', function () {
      it('returns an array', function(done) {
        Video.find('Psycho', function (error, result) {
          expect(error).toBe(null)
          expect(result).toEqual(jasmine.any(Array))
          done()
        })
      })
    })
  })

  describe('Video', function() {
    describe('find', function () {
      it('returns instances with correct keys', function(done) {
        Video.find('Psycho', function(error, result) {
          expect(error).toBe(null)
          expect(Object.keys(result[0])).toEqual(['id', 'title', 'overview', 'release_date', 'inventory', 'available_inventory'])
          done()
        })
      })
    })
  })

  describe('Video', function() {
    describe('find', function () {
      it('returns only one record', function(done) {
        Video.find('Psycho', function(error, result) {
          expect(error).toBe(null)
          expect(result.length).toEqual(1)
          done()
        })
      })
    })
  })

  describe('Video', function() {
    describe('find', function () {
      it('returns the correct video', function(done) {
        Video.find('Psycho', function(error, result) {
          expect(error).toBe(null)
          expect(result[0]['title']).toEqual('Psycho')
          done()
        })
      })
    })
  })

  // testing .sort
  // CAN WE TEST NUMBER OF PAGES???
  describe('Video', function () {
    describe('sort', function () {
      it('returns an array', function(done) {
        Video.sort('title', 1, 1, function (error, result) {
          expect(error).toBe(null)
          expect(result).toEqual(jasmine.any(Array))
          done()
        })
      })
    })
  })

  describe('Video', function() {
    describe('sort', function () {
      it('returns instances with correct keys', function(done) {
        Video.sort('title', 1, 1, function(error, result) {
          expect(error).toBe(null)
          expect(Object.keys(result[0])).toEqual(['id', 'title', 'overview', 'release_date', 'inventory', 'available_inventory'])
          done()
        })
      })
    })
  })

  describe('Video', function() {
    describe('sort', function () {
      it('returns requested length', function(done) {
        Video.sort('title', 1, 1, function(error, result) {
          expect(error).toBe(null)
          expect(result.length).toEqual(1)
          done()
        })
      })
    })
  })

  describe('Video', function() {
    describe('sort', function () {
      it('returns requested length that is more than one', function(done) {
        Video.sort('title', 1, 10, function(error, result) {
          expect(error).toBe(null)
          expect(result.length).toEqual(10)
          done()
        })
      })
    })
  })

  describe('Video', function() {
    describe('sort', function () {
      it('returns the correct video when sorted by title', function(done) {
        Video.sort('title', 1, 10, function(error, result) {
          expect(error).toBe(null)
          expect(result[0]['title']).toEqual('2001: A Space Odyssey')
          done()
        })
      })
    })
  })

  describe('Video', function() {
    describe('sort', function () {
      it('returns the correct video when sorted by release_date', function(done) {
        Video.sort('release_date', 1, 10, function(error, result) {
          expect(error).toBe(null)
          expect(result[0]['title']).toEqual('The Phantom of the Opera')
          done()
        })
      })
    })
  })

// testing .customer_current
  describe('Video', function () {
    describe('customer_current', function () {
      it('returns an array', function(done) {
        Video.customer_current('Psycho', function (error, result) {
          expect(error).toBe(null)
          expect(result).toEqual(jasmine.any(Array))
          done()
        })
      })
    })
  })

  describe('Video', function() {
    describe('customer_current', function () {
      it('returns instances with correct keys', function(done) {
        Video.customer_current('Psycho', function(error, result) {
          expect(error).toBe(null)
          expect(Object.keys(result[0])).toEqual(['id', 'name', 'registered_at', 'address', 'city', 'state', 'postal_code', 'phone', 'account_credit'])
          done()
        })
      })
    })
  })

  describe('Video', function() {
    describe('customer_current', function () {
      it('returns the correct number of results', function(done) {
        Video.customer_current('Psycho', function(error, result) {
          expect(error).toBe(null)
          expect(result.length).toEqual(1)
          done()
        })
      })
    })
  })

  describe('Video', function() {
    describe('customer_current', function () {
      it('returns the correct customer', function(done) {
        Video.customer_current('Psycho', function(error, result) {
          expect(error).toBe(null)
          expect(result[0]['name']).toEqual('Amanda Curtis')
          done()
        })
      })
    })
  })
})
