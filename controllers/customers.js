var Customers = require('../lib/customers')

CustomersController = {
  locals: {
    title: 'CUSTOMERS CUSTOMERS CUSTOMERS'
  },

  getCustomers: function(req, res) {
    // var people = new Customers
    var locals = CustomersController.locals

    var db = req.app.get('db')
    // locals.customers = db.customers.find(1)

    db.customers.find(1, function(err,results){
      //user with ID 1
      res.json(results);
    });

  }
}

module.exports = CustomersController


// chart: function(req, res) {
//   var chart = new Scorer().scoreChart()
//   var locals = ScrabbleController.locals
//
//   locals.chart = chart
//   res.render('chart', locals)
// },
