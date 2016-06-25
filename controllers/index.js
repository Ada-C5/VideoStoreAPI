var docs = require('../docs.json');


var Controller = {
  locals: {
    documentation: docs
  },
  
  index: function(req, res, next) {
    res.json('It works!!');
  },

  docsHTML: function(req, res, next) {
    res.render('docs', Controller.locals);
  },

  docsJSON: function(req, res, next) {
    res.json(200, docs);
  }
};

module.exports = Controller;



// var HomePage = {
//   zomg: function(req,response) {
//     var hi= {"hi": "ZOMG"}
//     response.json({cow: 'ZOMG!'})
//   },
//
//   nothing: function(req, response) {
//     response.render('index', {title: 'Express'});
//   }
// };
//
// module.exports = HomePage;
