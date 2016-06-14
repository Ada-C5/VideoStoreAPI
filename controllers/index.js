var HomePage = {
  zomg: function(req,response) {
    response.render('index', {cow: 'ZOMG!'})
  }
};

module.exports = HomePage;
