var Movie = require("../models/movie")

var MoviesController = {
  index: function(req, res, next) {
    Movie.all(function(error, movies) {
      if(error) {
        var err = new Error("Error retrieving customer list:\n" + error.message);
        err.status = 500;
        next(err);
      } else {
        res.json(movies)
      }
    });
  }

  // function sortBy () {

  // },

  // function current () {

  // },

  // function sortedHistory () {

  // }
}

module.exports = MoviesController
