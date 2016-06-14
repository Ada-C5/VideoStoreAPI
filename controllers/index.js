var HomePage = {
  zomg: function(req,response) {
    var hi= {"hi": "ZOMG"}
    response.json({cow: 'ZOMG!'})
  },

  nothing: function(req, response) {
    response.render('index', {title: 'Express'});
  }
};

module.exports = HomePage;
