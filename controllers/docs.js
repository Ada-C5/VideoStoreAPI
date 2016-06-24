var docs = require('../public/docs.json');

var DocsController = {
	getDocs: function(req, res) {
		res.render('docs', { 
			title: 'The Docs',
			docs: docs
		});
	},

	getJsonDocs: function(req, res) {
		res.json(docs);
	}
}

module.exports = DocsController
