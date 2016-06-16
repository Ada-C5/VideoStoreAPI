var Customer = require("../models/customers_model");



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

	},

	// customer id, all rentals attached to customer id within data params
	getCustomersCurrent: function(req, res) {

	},

	getCustomersHistory: function(req, res) {

	}
}

module.exports = CustomersController
