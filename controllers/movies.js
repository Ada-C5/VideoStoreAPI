var Movie = require('../models/movie')
var Rental = require('../models/rental')

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

  getMoviesShow: function(req, res, next) {
    Movie.find(req.params.title, function(error, movie) {
      if(error) {
        var err = new Error("No such movies");
        err.status = 404;
        next(err);
      } else {
        res.json(movie)
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
  },

  getMoviesCurrent: function (req, res, next) {
    Rental.findCurrentMovies(req.params.title, function (error, customer) {
      if (error) {
        var err = new Error("Error retrieving current customers:\n" + error.message);
        err.status = 500;
        next(err);
      } else {
        res.json(customer)
      }
    })
  },

  getMoviesHistory: function (req, res, next) {
    Rental.findHistoryMovies(req.params.title, function (error, customers) {
      if (error) {
        var err = new Error("Error retrieving rental history:\n" + error.message);
        err.status = 500;
        next(err);
      } else {
        res.json(customers)
      }
    })
  }
}

module.exports = MoviesController
