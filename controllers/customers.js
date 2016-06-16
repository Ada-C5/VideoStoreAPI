var Customer = require('../models/customer')

CustomersController = {
  locals: {
    title: 'CUSTOMERS CUSTOMERS CUSTOMERS'
  },

  getCustomers: function(req, res) {
    Customer.all (function (error, customers) {
      if (error) {
        var err = new Error("Error retrieving customer list:\n" + error.message);
        err.status = 500;
        next(err);
      } else {
        res.json(customers)
      }
    })
    // var people = new Customers
    // var locals = CustomersController.locals

    // var db = req.app.get('db')
    // // locals.customers = db.customers.find(1)

    // db.customers.find(function(err,results){
    //   //user with ID 1
    //   res.json(results);
    // });
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
