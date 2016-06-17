var Movie = require("../models/movie")
var Customer = require("../models/customer")

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
  },

  sortBy: function(req, res, next) {
  var type = req.params.query
  var n = req.query.n
  var p = req.query.p
  var firstrow = n*(p-1)+1
  var lastrow = n*p
  console.log("bla",type,firstrow,lastrow)
  Movie.sortBy([type,firstrow,lastrow],function(error, movies) {
    if(error) {
      var err = new Error("Error retrieving customer list:\n" + error.message);
      err.status = 500;
      next(err);
    } else {
      res.json(movies)
    }
  })},

  current: function (req, res, next) {
    var title = req.params.movie
    Customer.customersWithMovie([title], function(error, movies) {
      if(error) {
        var err = new Error("Error retrieving customer list:\n" + error.message);
        err.status = 500;
        next(err);
      } else {
        res.json(movies)
      }
    })},

  sortedHistory: function (req, res, next) {
    var title = req.params.movie
    var sort = req.params.by
    Customer.rentedThisMovie([title, sort], function(error, movies) {
      if(error) {
        var err = new Error("Error retrieving customer list:\n" + error.message);
        err.status = 500;
        next(err);
      } else {
        res.json(movies)
      }
    })}


}

module.exports = MoviesController
