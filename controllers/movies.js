var Movie = require("../models/movie.js");


var MoviesController = {
  index: function(req, res, next) {
    Movie.all(function (error, result) {
      if (error) {
        var err = new Error("Error retrieving movies:\n" + error.message);
        err.status = 500;
        next(err);
      } else {
        res.json(result);
      }

    });

  }

};

module.exports = MoviesController;
