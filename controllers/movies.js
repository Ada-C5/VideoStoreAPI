var Movie = require("../models/movie.js");


var MoviesController = {
  index: function(req, res, next) {
    Movie.all(function (error, result){

      

      return result;
    };

  }

};

module.exports = MoviesController;
