var Movie = require("../models/movie");

var MovieController = {
  index: function(req, res, next) {
    Movie.all(function(error, movies) {
        if(error) {
        var err = new Error("Error retrieving movies list:\n" + error.message);
        err.status = 500;
        next(err);
      } else {
        res.json(movies)
      }
    });
  },

  find: function(req, res, next) {
    Movie.sort(req.params.query, req.query.n , req.query.p, function(error, movies) {
        if(error) {
        var err = new Error("Error retrieving customer list:\n" + error.message);
        err.status = 500;
        next(err);
      } else {
        res.json(movies)
      }
    });
  },

// /movies/:movie/current
  current: function(req, res, next) {
    var movie = req.params.movie
    var movie = movie.toLowerCase().replace(/^./, movie[0].toUpperCase());
    Movie.find(['true', movie], function(error, movies) {
        if(error) {
        var err = new Error("Error retrieving customer list:\n" + error.message);
        err.status = 500;
        next(err);
      } else {
        res.json(movies)
      }
    });
  },

  history: function(req, res, next) {
    var movie = req.params.movie
    var movie = movie.toLowerCase().replace(/^./, movie[0].toUpperCase());

    console.log(req.params.query)
    Movie.history(['false', movie], req.params.query, function(error, movies) {
        if(error) {
        var err = new Error("Error retrieving customer list:\n" + error.message);
        err.status = 500;
        next(err);
      } else {
        res.json(movies)
      }
    });
  }

  // subset: function(req, res, next) {
  //   Movie.subs(function(error, movies) {
  //       var n = req.params.n
  //       var p = req.params.p
  //       if(error) {
  //       var err = new Error("Error retrieving movies list:\n" + error.message);
  //       err.status = 500;
  //       next(err);
  //     } else {
  //       res.json(movies)
  //     }
  //   });


// Retrieve a subset of movies        (/movies/sort/release-date?n=5&p=1)
// Given a sort column, return n movie records, offset by p records (this will be used to create "pages" of movies)
// Sort columns are
// title
// release_date

  // sort: function(req, res, next) {
  //   Movie.sort(function(error, movies) {
  //     if(error) {
  //     var err = new Error("Error retrieving movie info:\n" + error.message);
  //     err.status = 500;
  //     next(err);
  //   } else {
  //     res.json(movies)
  //   }
  //   })
  // }
}
module.exports = MovieController;
