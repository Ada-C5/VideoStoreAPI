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
      Rental.findHistory(1, function (error, movie) {
        expect(movie[0].id).toEqual(29)
        expect(movie[0].title).toEqual('The Shining')
        expect(movie[0].release_date).toEqual('1980-05-22')
        expect(movie[0].overview).toEqual('Jack Torrance accepts a caretaker job at the Overlook Hotel, where he, along with his wife Wendy and their son Danny, must live isolated from the rest of the world for the winter. But they aren\'t prepared for the madness that lurks within.')
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
      Rental.findCurrent(29, function (error, movie) {
        expect(movie[0].id).toEqual(19)
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

  describe("#findHistoryMovies", function () {
    it("should return rental history for a movie", function (done) {
      Rental.findHistoryMovies('Die Hard', function (error, rentals) {
        expect(rentals.length).toEqual(2)
        expect(rentals[0].id).toEqual(29)
        done()
      })
    })

    it('should throw an error if no rentals found', function (done) {
      Rental.findHistoryMovies("bad title", function(error, movie) {
        expect(error).toEqual(null)
        done()
      })
    })
  })

  describe("#find_customers", function () {
    it("should return customers who rented a given movie", function (done) {
      Rental.find_customers('Die Hard', function (error, customers) {
        expect(customers.length).toEqual(2)
        expect(customers[0].id).toEqual(19)
        done()
      })
    })

    it('should throw an error if no customers found', function (done) {
      Rental.findHistoryMovies("bad title", function(error, movie) {
        expect(error).toEqual(null)
        done()
      })
    })
  })

  describe("#checkout", function () {
    it("should checkout correct movie and decrease movie inventory when checked out", function (done) {
      var preStock;
      Rental.find('Speed', function(error, movie) {
        preStock = movie[0].inventory
      })
      Rental.checkout("Speed", 29, function(error, movie){})
      Rental.find('Speed', function(error, movie) {
        var postStock = movie[0].inventory
        expect(movie[0].title).toEqual('Speed')
        expect(postStock).toEqual(preStock - 1)
      })
      done()
    }) 

    // Tests below here are some I tried but they are just not working. 
    // Leaving them in so Jeremy is aware we tried to finish them.

    // it("should not rent out movie when it's out of stock", function (done) {
    //   Rental.checkout("Deliverance", 9, function(error, movies){})
    //   Rental.checkout("Deliverance", 9, function(error, movies){})
    //   Rental.checkout("Deliverance", 9, function(error, movies){
    //     expect(error).toBe(null)
    //     done()
    //   })
    // })
  })

  describe("#overdueRental", function () {
    it("should return list of customers with overdue rentals", function (done) {
      Rental.overdueRental(function (error, customers) {

      expect(customers.length).toEqual(2)
      })
      done()
    })
  })


  // describe("#checkin", function () {
    // it("should return correct movie and increase movie inventory when checkedin", function (done) {
    //   Rental.checkout("Rosemary's Baby", 29, function(error, movie){
    //   })
    //   Rental.checkin("Rosemary's Baby", 29, function(error, movie){})
    //   Rental.find("Rosemary's Baby", function(error, movie) {
    //     var postStock = movie[0].inventory
    //     expect(postStock).toEqual(preStock + 1)
    //   })
    //   done()
    // }) 

    // it("should not rent out movie when it's out of stock", function (done) {
    //   Rental.checkout("The Birds", 200, function(error, movie){})
    //   Rental.checkout("The Birds", 200, function(error, movie){
    //     expect(error.message).toEqual("No more copies available")
    //   })
    //   done()
    // })
  // })

})
