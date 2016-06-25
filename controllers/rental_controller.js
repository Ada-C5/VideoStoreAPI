var Rental = require('../models/rental')

var RentalController = {

  rentalInfo: function(req, res){
    var title = req.params.title
    Rental.deets(title, function(error, result) {
      if(error) {
        var err = new Error("Error retrieving rental info:\n" + error.message);
        err.status = 500;
        next(err);
      } else if (result[0] == null){
        res.status(404).json({error: "No can has movie."})
      } else {
        res.json(result)
      }
    })
  },

  customersRentingThisFilm: function (req, res) {
    var title = req.params.title
    Rental.whoRentedThis(title, function(error, result) {
      if(error) {
        var err = new Error("Error retrieving customer info:\n" + error.message);
        err.status = 500;
        next(err);
      } else if (result[0] == null){
        res.status(404).json({error: "No can has movie."})
      } else {
        res.json(result)
      }
    })
  },

  checkoutFilmToCust:  function(req, res, next){
    var id = req.body.customer["id"]
    var title = req.params.title

    Rental.checkout(title, id, function(error, result, next){
      if(error) {
        var err = new Error("Error checking out movie:\n" + error.message);
        err.status = 500;
        next(err);
      } else {
        res.json(result)
      }
    })
  },

  checkInFilmToCust:  function(req, res, next) {
    var id = req.body.customer["id"]
    var title = req.params.title
    Rental.checkin(title, id, function(error, result){
      if(error) {
        var err = new Error("Error checking in movie:\n" + error.message);
        err.status = 500;
        next(err);
      } else {
        res.json(result)
      }
    })
  },

  overdue:  function(req, res, next){
    Rental.overdue(function(error, result){
      if(error) {
        var err = new Error("Error finding overdue movies:\n" + error.message);
        err.status = 500;
        next(err);
      } else {
        res.json(result)
      }
    })
  },
}

module.exports = RentalController
