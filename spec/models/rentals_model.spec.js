var app = require("../../app");
var db = app.get("db");
var Rental = require('../../models/rentals_model')


describe('Rental getCheckedOut', function () {
	it('not be null', function (done) {
		Rental.getCheckedOut("Jaws", function(error, rental) {
			expect(error).toBeNull;
			expect(rental).toBeDefined;
			done();
		})
	})

	it('will not find invalid rentals', function (done) {
		Rental.getCheckedOut("Jawz", function(error, rental) {
			expect(error).toBeDefined;
			expect(rental).toBeUndefined;
			done();
		})
	})
})



describe('return current rentals`', function () {
	it('should not be null', function (done) {
		 Rental.getCurrentRentals(5, function (error, rentals) {
			 expect(rentals).toNotBe(null)
		 done()
		 })
	})

	it('will not find invalid customers', function (done) {
		Rental.getCurrentRentals(333, function(error, rental) {
			expect(error).toBeDefined;
			expect(rental).toBeUndefined;
			done();
		})
	})
})

describe('return currently checked out movies', function () {
	it('not be null', function (done) {
		Rental.getCurrentlyCheckedOut("Jaws", function(error, movie) {
			expect(error).toBeNull;
			expect(movie).toBeDefined;
			done();
		})
	})

  it('will not find invalid movies`', function (done) {
    Rental.getCurrentlyCheckedOut("aldkfaslkfj", function(error, rental) {
      expect(error).toBeDefined;
      expect(rental).toBeUndefined;
      done();
    })
  })
})

describe('return previously checked out movies', function () {
	it('not be null', function (done) {
		Rental.getPastRentals("Jaws", function(error, movie) {
			expect(error).toBeNull;
			expect(movie).toBeDefined;
			done();
		})
	})

  it('will not find invalid movies', function (done) {
    Rental.getPastRentals("aldkfaslkfj", function(error, rental) {
      expect(error).toBeDefined;
      expect(rental).toBeUndefined;
      done();
    })
  })
})

describe('return previously checked out movies', function () {
	it('not be null', function (done) {
		Rental.getCustomers("Jaws", function(error, movie) {
			expect(error).toBeNull;
			expect(movie).toBeDefined;
			done();
		})
	})

  it('will not find invalid movies', function (done) {
    Rental.getCustomers("aldkfaslkfj", function(error, rental) {
      expect(error).toBeDefined;
      expect(rental).toBeUndefined;
      done();
    })
  })
})


describe('return overdue rentals', function () {
	it('not be null', function (done) {
		Rental.getOverdue(function(error, movie) {
			expect(error).toBeNull;
			expect(movie).toBeDefined;
			done();
		})
	})

  it('will not find invalid movies', function (done) {
    Rental.getOverdue(function(error, rental) {
      expect(error).toBeDefined;
      expect(rental).toBeUndefined;
      done();
    })
  })

  it('should return an array', function(done) {
  Rental.getOverdue(function(error,rentals){
    expect(rentals).toEqual(jasmine.any(Array))
    done()
  })
  })
})

describe('return rentals', function () {
	it('not be null', function (done) {
		Rental.getReturn(3, function(error, movie) {
			expect(error).toBeNull;
			expect(movie).toBeDefined;
			done();
		})
	})

  it('will not return invalid rentals', function (done) {
    Rental.getReturn(1255, function(error, rental) {
      expect(error).toBeDefined;
      expect(rental).toBeUndefined;
      done();
    })
  })
})


describe('checkout rentals', function () {
	it('not be null', function (done) {
		Rental.getCheckout("Jaws", 5, function(error, movie) {
			expect(error).toBeNull;
			expect(movie).toBeDefined;
			done();
		})
	})

  it('will not checkout invalid movies', function (done) {
    Rental.getCheckout("a;sldfjlaskdf", 5, function(error, rental) {
      expect(error).toBeDefined;
      expect(rental).toBeUndefined;
      done();
    })
  })
})
