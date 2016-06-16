var Rental = require("../models/rentals_model");
var Movie = require("../models/movies_model");

RentalsController = {
	getRentals: function(req, res) {
		Movie.findMovie(req.params.title, function(error, movie) {
			if(error) {
				var err = new Error("No such movie");
				err.status = 404;
			} else {
				Rental.getCheckedOut(movie.id, function(error, checked_out) {
					res.json(checked_out)
				})
			}

		})
	},

	getRentalsCustomers: function(req, res) {

	},

	getRentalsCheckOut: function(req, res) {

	},

	getRentalsReturn: function(req, res) {

	},

	getRentalsOverdue: function(req, res) {

	}
}

module.exports = RentalsController
