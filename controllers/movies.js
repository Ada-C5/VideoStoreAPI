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
  }
}
module.exports = MovieController;
