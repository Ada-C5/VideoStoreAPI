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
					// get checkout int and minus from inventory (from movie instance)
					console.log(checked_out)
					res.json(checked_out)
				})
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

	getRentalsCheckOut: function(req, res, next) {
		Rental.getCheckout(req.params.title, req.params.customerid, function(error, checked_out) {
			if(error) {
				var err = new Error("No one has that movie checked out");
				err.status = 404;
			} else {
				res.json(checked_out)
			}
		});
	},

	getRentalsReturn: function(req, res) {
		Rental.getReturn(req.params.id, function(error, returned) {
			if(error) {
				var err = new Error("No one has that movie checked out");
				err.status = 404;
			} else {
				res.json(returned)
			}
		});		

	},

	getRentalsOverdue: function(req, res) {
		console.log("AAAALLLOOO????")
		Rental.getOverdue(function(error, over_due) {
			if(error) {
				var err = new Error("Ooops");
				err.status = 404;
			} else {
				res.json(over_due)
			}
		})
	}
}

module.exports = RentalsController
