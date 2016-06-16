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
  },

  getCustomersShow: function(req, res) {
    Customer.find(req.params.id, function(error, customer) {

      if(error) {
        var err = new Error("No such customer");
        err.status = 404;
        next(err);
      } else {
        res.json(customer)

        // customer.getBalance(function(error, balance) {
        //   res.render("customers/show", {
        //     customer: {
        //       id: customer.id,
        //       balance: balance
        //     }
        //   });
        // });
      }
    })
  }
}

module.exports = CustomersController
