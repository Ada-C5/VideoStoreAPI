var Customers = require('../lib/customers')

CustomersController = {
  locals: {
    title: 'CUSTOMERS CUSTOMERS CUSTOMERS'
  },

  getCustomers: function(req, res) {
    var people = new Customers
    var locals = CustomersController.locals

    var db = req.app.get('db')
    db.customers.find(1)
  }
}

modules.exports = CustomersController


// chart: function(req, res) {
//   var chart = new Scorer().scoreChart()
//   var locals = ScrabbleController.locals
//
//   locals.chart = chart
//   res.render('chart', locals)
// },
