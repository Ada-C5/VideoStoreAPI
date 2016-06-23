var docs = require('../docs.json');

var IndexController = {
  index: function(req, res, next) {
    res.json('It works!!');
  },

  docsJSON: function(req, res, next) {
    res.json(200, docs);
  }
};

module.exports = IndexController;
