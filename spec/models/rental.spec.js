var Rental = require('../../models/rental')

describe('rental', function(){
  afterEach(function() {
    Rental.end()
  })
  describe('.deets', function() {
    it('returns one object from the databse', function(done){
      Rental.deets("Jaws", function(error, result){
        expect(error).toBe(null)
        expect(result).toNotBe(null)
        done()
      })
    })

    it('returns an object in the right format', function(done){
      Rental.deets('Jaws', function(error, result){
        expect(Object.keys(result[0])).toEqual(["id", 'title', 'overview', "release_date", "inventory", 'stock'])
        done()
      })
    })

    it("returns empty array when it can't find a movie", function(done){
      Rental.deets('lksjdfkj', function(error, result) {
        expect(error).toBe(null)
        expect(result).toNotBe(undefined)
        done()
      })
    })
  })

  describe('.whoRentedThis', function() {
    it('returns an array of customers who have rented the movie', function(done){
      Rental.whoRentedThis("Jaws", function(error, result){
        expect(error).toBe(null)
        expect(result).toNotBe(null)
        expect(Object.keys(result[0])).toEqual(['name', 'phone', 'account_credit'])
        done()
      })
    })

    it('returns empty array when no one has rented the film', function(done){
      Rental.whoRentedThis("Turkey face", function(error, result){
        expect(error).toBe(null)
        expect(result).toNotBe(null)
        expect(result).toEqual([])
        done()
      })
    })
  })

  describe(".checkin", function(){
    it('updates rental to include returned date', function(done){
      console.log('ha')
      Rental.checkout("Chinatown", 9, function(error, result2){
      })
      Rental.checkin("Chinatown", 9, function(error, result2){
        expect(error).toBe(null)
        expect(result2).toNotBe(null)
        expect(result2.returned_date).toNotBe(null)

        done()
      })
    })
  })

  describe(".overdue", function(){
    it('returns a list of overdue rentals and who owes them', function(done){
      Rental.overdue(function(error, result){
        expect(Object.keys(result[0])).toEqual(['name','title', 'checkout_date', 'due_date'])
        done()
      })
    })
  })
  
  describe('.checkout', function() {
    it('creates a rental instance in the database if successful', function(done){
      Rental.checkout("King Kong", '30', function(error, result){
        expect(error).toBe(null)
        expect(result).toNotBe(null)
        expect(Object.keys(result)).toEqual(['id', 'customer_id', 'title', 'movie_id', 'due_date', 'checkout_date', 'returned_date'])
        done()
      })
    })

    it("won't checkout movies that aren't in the database", function(done){
      Rental.checkout("Beep Boop", '20', function(error, result){
        expect(error).toBe(null)
        expect(result).toNotBe(null)
        expect(result).toBe('No can has movie')
        done()
      })
    })

    it("won't check out movie if its out of stock", function(done){
      Rental.checkout("Jaws", 8, function(error, result){
        expect(error).toBe(null)
        expect(result).toNotBe(null)
        expect(result).toBe("That movie is out of stock.")
        done()
      })
    })

    it("won't checkout movie if it can't find customer", function(done){
      Rental.checkout("King Kong", 78787887 , function(error, result){
        expect(error).toBe(null)
        expect(result).toNotBe(null)
        expect(result).toBe("Who is that? They don't patronize our fabulous video store.")
        done()
      })
    })

    it("lowers stock of movie after successful checkout", function(done){
      var pre_stock;
      Rental.deets('King Kong', function(error, result) {
        pre_stock = result[0].stock
      })
      Rental.checkout("King Kong", 9, function(error, result){
      })
      Rental.deets('King Kong', function(error, result) {
        var post_stock = result[0].stock
        expect(post_stock).toEqual(pre_stock - 1)
      })
      done()
    })
  });


})
