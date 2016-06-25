var docs = require('../docs.json');

var IndexController = {
  locals: {
    documentation: docs
  },

  index: function(req, res, next) {
    res.json('It works!!');
  },

  docsHTML: function(req, res, next) {
    // console.log(string_docs);
    res.render('docs', IndexController.locals);
  },

  docsJSON: function(req, res, next) {
    res.json(200, docs);
  }
};

module.exports = IndexController;
