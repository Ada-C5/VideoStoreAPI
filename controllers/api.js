var docs = require('../docs.json')

var ApiController = {
  docs: function(req, res, next) {
    res.render('jadedocs')
  },

  jsonDocs: function(req, res, next) {
    res.json(docs)
  }
}

module.exports = ApiController
