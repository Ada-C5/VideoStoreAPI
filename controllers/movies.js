var Movie = require("../models/movies_model");
var Rental = require("../models/rentals_model");


MoviesController = {
	getMovies: function(req, res) {
		Movie.all(function(error, movies) {
			if(error) {
				var err = new Error("Error retrieving movie list;\n" + error.message);
				err.status = 500;
			} else {
				res.json(movies)
			}
		})
	},

	subsetMovies: function(req, res) {
		Movie.sort(req.params.column, req.query.p, req.query.n, function(error, data) {
			if(error) {
				var err = new Error("No such data");
				err.status = 404;
			} else {
				res.json(data)
			}

		})
	},

	getRentalsCustomers: function(req, res) {
			Rental.getCustomers(req.params.title, function(error, checked_out) {
			if(error) {
				var err = new Error("No one has that movie checked out");
				err.status = 404;
			} else {
					res.json(checked_out)
			}
		})
	},

	getMoviesHistory: function(req, res) {

	}
}

module.exports = MoviesController
