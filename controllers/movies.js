var Movie = require('../models/movie')

MoviesController = {
  locals: {
    title: 'MOVIES MOVIES MOVIES'
  },

  getMovies: function(req, res) {
    Movie.all (function (error, movies) {
      if (error) {
        var err = new Error("Error retrieving movie list:\n" + error.message);
        err.status = 500;
        next(err);
      } else {
        res.json(movies)
      }
    })
  },

  getMoviesShow: function(req, res) {
    Movie.find(req.params.id, function(error, movie) {
      if(error) {
        var err = new Error("No such movies");
        err.status = 404;
        next(err);
      } else {
        res.json(movie)

        // movie.getBalance(function(error, balance) {
        //   res.render("movies/show", {
        //     movie: {
        //       id: movie.id,
        //       balance: balance
        //     }
        //   });
        // });
      }
    })
  },

  getMoviesSort: function(req, res) {
    Movie.sort(req.params.field, req.query.n, req.query.p, function(error, movie) {
      if (error) {
        var err = new Error("Error retrieving movie list:\n" + error.message);
        err.status = 500;
        next(err);
      } else {
        res.json(movie)
      }
    })
  }
}

module.exports = MoviesController

