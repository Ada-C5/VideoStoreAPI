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

  },

  sort: function(req, res, next) {
    console.log(req.query);
    Movie.sort(req.params.sort_param, req.query.n, req.query.p, function (error, result) {
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
