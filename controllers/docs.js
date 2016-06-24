// var Customer = require("../models/customers_model");
// var Rental = require("../models/rentals_model");
var docs = require('../public/docs.json');


var DocsController = {
	getDocs: function(req, res) {
		res.render('docs', { 
			title: 'The Docs',
			docs: docs
		});
	}
}

module.exports = DocsController
