var Movie = require("../models/movie");

var MoviesController = {
  index: function(req, res, next) {
    // giving a callback function to handle error or render view
    Movie.all(function(error, movies) {
      if(error) {
        var err = new Error("Error retrieving movie list:\n" + error.message);
        err.status = 500;
        next(err);
      } else {
        res.json(movies)
        // var locals = { movies: movies }
        // res.render("movies/index", locals);
      }
    });
  }
}

  module.exports = MoviesController;
