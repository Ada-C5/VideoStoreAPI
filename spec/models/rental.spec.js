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
      })
      done()
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
      })
    done()
    })
  })

  // describe('#sort', function () {
  //   it('should sort customer by name', function(done) {
  //     Rental.sort("name", 1, 3, function(error, customer_array) {
  //       expect(customer_array.length).toEqual(1)
  //       expect(customer_array[0].name).toEqual(customer1)
  //       expect(customer_array[0].registered_at).toEqual(registered_at1)
  //       expect(customer_array[0].address).toEqual(address1)
  //       expect(customer_array[0].city).toEqual(city1)
  //       expect(customer_array[0].state).toEqual(state1)
  //       expect(customer_array[0].postal_code).toEqual(postal_code1)
  //       expect(customer_array[0].phone).toEqual(phone1)
  //       expect(customer_array[0].account_credit).toEqual(account_credit1)
  //       expect(error).toBeNull
  //     })
  //     done()
  //   })
  //
  //   it('should throw an error if the customer DNE', function (done) {
  //     Rental.sort("abcd", 1, 3, function(error, customer_array2) {
  //       expect(error.message).toEqual("Could not retrieve customers")
  //     })
  //   done()
  //   })
  // })
})
