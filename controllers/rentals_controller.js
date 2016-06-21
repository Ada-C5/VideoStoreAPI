var Movie = require("../models/movie");
var Customer = require("../models/customer");
var Rental = require("../models/rental");

var RentalsController = {

  findMovie: function(req, res, next) {
  var title = req.params.title;

    Rental.all([title], function (error, rentals) {
      if(error) {
        var err = new Error("Error retrieving movie info:\n" + error.message);
          err.status = 500;
          next(err);
      } else {
        res.json(rentals)
      }
    })
  }


}
module.exports = RentalsController;
