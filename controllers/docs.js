// var Customer = require("../models/customers_model");
// var Rental = require("../models/rentals_model");
		var json = require('../public/docs.json');


var DocsController = {
	getDocs: function(req, res) {
		res.render('docs', { 
			title: 'The Docs',
			list: JSON.stringify(json) 
		});
	}
	// getDocs: function(req, res) {
	// 	Movie.all(function(error, docs) {
	// 		if(error) {
	// 			var err = new Error("Error retrieving movie list;\n" + error.message);
	// 			err.status = 500;
	// 		} else {
	// 			res.json(docs)
	// 		}
	// 	})
	// }
}

module.exports = DocsController
