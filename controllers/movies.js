var Movie = require("../models/movies_model");
var Rental = require("../models/rentals_model");


MoviesController = {
	getMovies: function(req, res) {
		Movie.all(function(error, movies) {
			if(error="Could not retrieve movies") {
				res.status(404).send(error)
			} else if (error) {
				var err = "Please try again"
				res.status(500).send(err)
			} else {
				res.json(movies)
			}
		})
	},

	subsetMovies: function(req, res) {
		Movie.sort(req.params.column, req.query.p, req.query.n, function(error, data) {
			if(error="Could not retrieve movies") {
				res.status(404).send(error)
			} else if (error) {
				var err = "Please try again"
				res.status(500).send(err)
			} else {
				res.json(data)
			}

		})
	},

	getRentalsCustomers: function(req, res) {
			Rental.getCustomers(req.params.title, function(error, checked_out) {
			if(error="Could not retrieve movies") {
				res.status(404).send(error)
			} else if (error) {
				var err = "Please try again"
				res.status(500).send(err)
			} else {
					res.json(checked_out)
			}
		})
	},

	getMoviesHistory: function(req, res) {

	}
}

module.exports = MoviesController
