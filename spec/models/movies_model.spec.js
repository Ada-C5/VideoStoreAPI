var app = require("../../app");
var db = app.get("db");
var Movie = require('../../models/movies_model')

describe('Movie', function () {
	it('find valid movie', function (done) {
		Movie.findMovie("Jaws", function(error, movie) {
			expect(error).toBeNull;
			expect(movie).toBeDefined;
			done();
		})
	})

	it('find invalid movie', function (done) {
		Movie.findMovie("Jawz", function(error, movie) {
			expect(error).toBeDefined;
			expect(movie).toBeUndefined;
			done();
		})
	})

	it('should return an array', function (done) {
	Movie.all(function (error, movies) {
		expect(movies).toEqual(jasmine.any(Array))
		done()
		})
	})

})



describe('return all movies', function () {
	it('should not be null', function (done) {
		 Movie.all(function (error, movies) {
			 expect(movies).toNotBe(null)
		 done()
		 })
	})
})

describe('return sorted movies', function () {
	it('not be null', function (done) {
		Movie.sort("title", 2, 10, function(error, movie) {
			expect(error).toBeNull;
			expect(movie).toBeDefined;
			done();
		})
	})

	it('should contain sorted movie objects', function (done) {
	Movie.sort("title", 2, 10, function (error, movies) {
		expect(movies[0].title).toEqual("A Clockwork Orange")
	done()
	})
	})

	it('should contain all movies', function (done) {
		Movie.sort("title", 2, 100, function (error, movies) {
			expect(movies.length).toEqual(98)
		done()
		})
	})

})
