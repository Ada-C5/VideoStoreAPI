var Rental = require("../models/rental.js");

var RentalsController = {
  show: function(req, res, next) {
    console.log(req.params.title)
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
  }
};


module.exports = RentalsController;
