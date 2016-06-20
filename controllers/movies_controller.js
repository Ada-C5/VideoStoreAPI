var Movie = require("../models/movie");
// var Customer = require("../models/customer");
// var Rental = require("../models/rental");

var MoviesController = {
  listMovies: function(req, res, next) {
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
  },

  sortBy: function(req, res, next) {
    var options = {
      order: req.params.field,
      limit: req.query.n,
      offset: req.query.p
    }

    Movie.sortBy(options, function(error, movies) {
      if(error) {
        var err = new Error("Error retrieving sorted movie list:\n" + error.message);
        err.status = 500;
        next(err);
      } else {
        res.json(movies)
      }
    });
 },

  // current: function(req, res, next)  {
  //   var movie = req.params.title;
  //
  //   Movie.find(movie, function(error, search_movie)
  //     if(error) {
  //         var err = new Error("No such movie");
  //         err.status = 404;
  //         next(err);
  //       } else {
  //         Rentals.find(function(error, movie) {
  //           res.render("rentals/show", {
  //             movie: {
  //               id: movie.id,
  //             }
  //           });
  //         });
  //       }
  //     });
  // )

  // },
  //
  // sortByHistory: function(req, res, next)  {
  //
  // }
}
module.exports = MoviesController;
