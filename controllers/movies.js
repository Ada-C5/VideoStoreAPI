var Movie = require("../models/movies_model");


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

	},

	getMoviesCurrent: function(req, res) {

	},

	getMoviesHistory: function(req, res) {

	}
}

module.exports = MoviesController
