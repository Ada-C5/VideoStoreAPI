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
})
