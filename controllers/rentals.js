var Rental = require("../models/rental.js");

var RentalsController = {
  show: function(req, res, next) {
    Rental.findTitle(req.params.title, function(error, movie) {
      if(error) {
        var err = new Error("No such movie title");
        err.status = 404;
        next(err);
      } else {
          delete movie.id;
          res.json(movie);
        };
    });
  },

  checkOut: function(req, res, next) {
    var customer_id = req.body.customer_id;
    var title = req.params.title;
    Rental.createCheckOut(customer_id, title, function(error, rental) {
      if(error) {
        var err = new Error("Rental checkout failed");
        err.status = 404;
        next(err);
      } else {
        res.json(rental);
      }
    });
  }
};


module.exports = RentalsController;
