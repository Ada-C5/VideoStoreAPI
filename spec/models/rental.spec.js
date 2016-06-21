var app = require('../../app')
var db = app.get('db')

var Rental = require('../../models/rental')

describe('Rental', function () {
  var title1 = "Alien"
  var overview1 = 'During its return to the earth, commercial spaceship Nostromo intercepts a distress signal from a distant planet. When a three-member team of the crew discovers a chamber containing thousands of eggs on the planet, a creature inside one of the eggs attacks an explorer. The entire crew is unaware of the impending nightmare set to descend upon them when the alien parasite planted inside its unfortunate host is birthed.'
  var release_date1 = '1979-05-25'
  var inventory1 = 4

  afterEach(function () {
    db.end()
  })

  describe('#all', function () {
    it('should return all movies', function (done) {
      Rental.all(function (error, movies) {
        expect(movies.length).toEqual(100)
        done()
      })
    })
  })

  describe('#find', function () {
    it('should return correct movie', function (done) {
       Rental.find(title1, function (error, movie) {
        expect(movie[0].title).toEqual(title1)
        expect(movie[0].overview).toEqual(overview1)
        expect(movie[0].release_date).toEqual(release_date1)
        expect(movie[0].inventory).toEqual(inventory1)
        expect(error).toBeNull
        done()
      })
    })

    it('should throw an error if the movie DNE', function (done) {
      Rental.find("bad title", function(error, movie) {
        expect(error.message).toEqual("Could not retrieve movies")
        done()
      })
    })
  })

  describe("#findHistory", function () {
    it("should return history rentals for a customer", function (done) {
      Rental.findHistory(1, function (error, customer) {
        expect(customer[0].customer_id).toEqual(1)
        expect(customer[0].movie_id).toEqual(29)
        expect(customer[0].status).toEqual(true)
        expect(customer[0].return_date).toEqual('Sun Jun 19 2016 22:19:53 GMT-0700 (PDT)')
        done()
      })
    })

    it('should throw an error if no rentals found', function (done) {
      Rental.findHistory(300, function(error, movie) {
        expect(error).toEqual(null)
        done()
      })
    })

    it('if customer has no rentals', function (done) {
      Rental.findHistory(200, function(error, movie) {
        expect(error).toEqual(null)
        done()
      })
    })
  })

  describe("#findCurrent", function () {
    it("should return current rentals for a customer", function (done) {
      Rental.findCurrent(29, function (error, customer) {
        expect(customer.length).toEqual(3)
        expect(customer[0].customer_id).toEqual(29)
        done()
      })
    })

    it('should throw an error if no rentals found', function (done) {
      Rental.findCurrent(300, function(error, movie) {
        expect(error).toEqual(null)
        done()
      })
    })

    it('if customer has no rentals', function (done) {
      Rental.findCurrent(200, function(error, movie) {
        expect(error).toEqual(null)
        done()
      })
    })
  })

  describe("#findCurrentMovies", function () {
    it("should return current customers currently renting a movie", function (done) {
      Rental.findCurrentMovies('Die Hard', function (error, customers) {
        expect(customers.length).toEqual(2)
        expect(customers[0].id).toEqual(19)
        done()
      })
    })

    it('should throw an error if no rentals found', function (done) {
      Rental.findCurrentMovies("bad title", function(error, movie) {
        expect(error).toEqual(null)
        done()
      })
    })
  })


})
