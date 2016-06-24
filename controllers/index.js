var docs = require('../docs.json');
// var docs_view = require('../views/docs.ejs')

var IndexController = {
  index: function(req, res, next) {
    res.json('It works!!');
  },

  docsHTML: function(req, res, next) {
    res.render('docs');
  },

  docsJSON: function(req, res, next) {
    res.json(200, docs);
  }
};

module.exports = IndexController;
