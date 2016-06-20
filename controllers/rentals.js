var Rental = require("../models/rental.js");

var RentalsController = {
  show: function(req, res, next) {
    Rental.findTitle(req.params.title, function(error, movie) {
      if(error) {
        var err = new Error("No such movie title");
        err.status = 404;
        next(err);
      } else {
          res.json(movie);
        };
    });
  }
};


module.exports = RentalsController;
