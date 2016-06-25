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
    Movie.sort(req.params.sort_param, req.query.n, req.query.p, function (error, result) {
      if (error) {
        var err = new Error("Error retrieving movies:\n" + error.message);
        err.status = 500;
        next(err);
      } else {
        res.json(result);
      }
    });
  },

  current: function(req, res, next) {
    Movie.current(req.params.title, function (error, result) {
      if (error) {
        var err = new Error("Error retrieving movies:\n" + error.message);
        err.status = 500;
        next(err);
      } else {
        // if (result.length === 0) {
        //   res.status(204); //not working for some reason, fix later
        // }
        res.json(result);
      }
    });
  }

};

module.exports = MoviesController;
