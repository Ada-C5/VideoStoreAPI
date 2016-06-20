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

 current: function(req, res, next) {
   var movie = req.params.title;

   Movie.find_customers_by_movie_title(movie, function(error, customers) {
     if(error) {
       var err = new Error("No such movie");
       err.status = 404;
       next(err);
     } else {
       var obj = {};
       if (customers.length === 0) {
         obj["status"] = 204;
       } else {
         obj["status"] = 200;
       }
       obj["customers"] = customers;
       res.json(obj);
     }
   })
 },

  history: function(req, res, next) {
    var movie = req.params.title;
    var field = req.params.field;

    Movie.find_customers_by_movie_title_history([movie, field], function(error, customers) {
      if(error) {
        var err = new Error("No such movie");
        err.status = 404;
        next(err);
      } else {
        var obj = {};
        if (customers.length === 0) {
          obj["status"] = 204;
        } else {
          obj["status"] = 200;
        }
        obj["customers"] = customers;
        res.json(obj);
      }
    })
   }
}
module.exports = MoviesController;
