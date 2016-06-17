var Customer = require("../models/customers_model");
var Rental = require("../models/rentals_model");


var CustomersController = {
	getCustomers: function(req, res) {
		Customer.all(function(error, customers) {
			if(error) {
				var err = new Error("Error retrieving account list;\n" + error.message);
				err.status = 500;
			} else {
				res.json(customers)
			}
		})

	},
	// customer id, sort column, offest ?????
	subsetCustomers: function(req, res) {
		Customer.sort(req.params.column, req.query.p, req.query.n, function(error, data) {
			if(error) {
				var err = new Error("No such data");
				err.status = 404;
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

	}
}

module.exports = CustomersController
