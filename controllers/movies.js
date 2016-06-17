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
		Movie.sort(req.params.column, req.query.p, req.query.n, function(error, data) {
			if(error) {
				var err = new Error("No such data");
				err.status = 404;
			} else {
				res.json(data)
			}

		})
	},

	getMoviesCurrent: function(req, res) {

	},

	getMoviesHistory: function(req, res) {

	}
}

module.exports = MoviesController
