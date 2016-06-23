var Rental = require('../models/rental')

RentalsController = {
  locals: {
    title: 'RENTALS RENTALS RENTALS'
  },

 getRentals: function(req, res, next) {
    Rental.all (function (error, movies) {
      if (error) {
        var err = new Error("Error retrieving rental list:\n" + error.message);
        err.status = 500;
        next(err);
      } else {
        res.json(movies)
      }
    })
  },

  getRentalsShow: function(req, res, next) {
    Rental.find (req.params.title, function(error, rental) {
      if (error) {
        var err = new Error("No such rentals");
        err.status = 404;
        next(err);
      } else {
        res.json(rental)
      }
    })
  },

  getRentalsCustomers:function(req, res, next) {
    Rental.find_customers (req.params.title, function(error, customer) {
      if (error) {
        var err = new Error("No such customers");
        err.status = 404;
        next(err);
      } else {
        res.json(customer)
      }
    })
  },

  postCheckout:function(req, res, next) {
    Rental.checkout (req.params.title, req.body.customer_id, function(error, movie) {
      if (error) {
        var err = new Error("Can't rent out");
        err.status = 404;
        next(error);
        res.json({})
      } else {
        res.json({checkout: "Success, you checked out, you fancy!"})
      }
    })
  },

  putCheckin:function(req, res, next) {
    Rental.checkin (req.params.title, req.body.customer_id, function(error, movie) {
      if (error) {
        var err = new Error("Can't return, try again later");
        err.status = 404;
        next(err);
      } else {
        res.json({checkin: "Success, you checked that movie in, yo!"})
      }
    })
  }

}

module.exports = RentalsController
