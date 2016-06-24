var Customer = require("../models/customers_model");
var Rental = require("../models/rentals_model");


var CustomersController = {
	getCustomers: function(req, res) {
		Customer.all(function(error, customers) {
			if(error="Could not retrieve customers") {
				res.status(404).send(error)
			} else if (error) {
				res.status(500).send(error)
			} else {
				res.json(customers)
			}
		})
	},
	// customer id, sort column, offest ?????
	subsetCustomers: function(req, res) {
		Customer.sort(req.params.column, req.query.p, req.query.n, function(error, data) {
			if(error="Could not retrieve customers") {
				res.status(404).send(error)
			} else if (error) {
				res.status(500).send(error)
			} else {
				res.json(data)
			}
		})
	},

	// customer id, all rentals attached to customer id within data params
	getCustomersCurrent: function(req, res) {
		Rental.getCurrentRentals(req.params.customer_id, function(error, data) {
			if(error) {
				var err = new Error("No such data");
				err.status = 404;
			} else {
				res.json(data)
			}
		})
	},

	getCustomersHistory: function(req, res) {
		Rental.getPastRentals(req.params.customer_id, function(error, data) {
			if(error) {
				var err = new Error("No such data");
				err.status = 404;
			} else {
				res.json(data)
			}
		})
	}
}
module.exports = CustomersController
