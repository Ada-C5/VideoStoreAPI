var Movie = require('../models/movie')

var MoviesController = {
  index: function (req, res) {
    res.render('index', {title: ''})
  },

  // Retrieve a list of all movies (/movies)
  listAllMovies:  function(req, res, next){
    Movie.all(function(error, movies) {
      if(error) {
        var err = new Error("Error retrieving movies:\n" + error.message);
        err.status = 500;
        next(err);
      } else {
        res.json(movies)
      }
    })
  },

  // Retrieve a subset of movies (/movies/sort/release-date?n=5&p=1)
  // Given a sort column, return n movie records, offset by p records (this will be used to create 'pages' of movies)
  moviesByTitle: function (req, res, next) {
    var num = Number(req.query.n)
    var p = Number(req.query.p)

    Movie.byTitle(num, p, function(error, movies){
      if(error) {
        var err = new Error("Error retrieving movies:\n" + error.message);
        err.status = 500;
        next(err);
      } else {
        res.json(movies)
      }
    })
  },

  moviesByRelease: function (req, res) {
    var num = Number(req.query.n)
    var p = Number(req.query.n)

    Movie.byRelease(num, p, function(error, movies){
      if(error) {
        var err = new Error("Error retrieving movies:\n" + error.message);
        err.status = 500;
        next(err);
      } else {
        res.json(movies)
      }
    })
  },

  seeMovieDetails: function (req, res) {
    var title = req.params.title

    Movie.deets(title, function(error, movies){
      if(error) {
        var err = new Error("Error retrieving movie:\n" + error.message);
        err.status = 500;
        next(err);
      } else {
        res.json(movies)
      }
    })
  },

  // Given a movie's title...
  // Get a list of customers that have currently checked out a copy of the film (/movies/Jaws/current)
  customersRentingThisFilm: function (req, res) {
    var title = req.params.title

    Movie.currentCustomers(title, function(error, movies){
      if(error) {
        var err = new Error("Error retrieving customers:\n" + error.message);
        err.status = 500;
        next(err);
      } else {
        res.json(movies)
      }
    })
  },

  filmRentalHistoryByCustName: function (req, res) {
    var title = req.params.title

    Movie.historyByCust(title, function(error, movies){
      if(error) {
        var err = new Error("Error retrieving customers:\n" + error.message);
        err.status = 500;
        next(err);
      } else {
        res.json(movies)
      }
    })
  },

  filmRentalHistoryByCODate: function (req, res) {
    var title = req.params.title

    Movie.historyByCODate(title, function(error, movies){
      if(error) {
        var err = new Error("Error retrieving customers:\n" + error.message);
        err.status = 500;
        next(err);
      } else {
        res.json(movies)
      }
    })
  }
}

module.exports = MoviesController
