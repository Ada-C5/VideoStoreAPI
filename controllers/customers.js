var Cust = require("../models/customer");

var CustController = {
  index: function(req, res, next) {
    Cust.all(function(error, custs) {
        if(error) {
        var err = new Error("Error retrieving customer list:\n" + error.message);
        err.status = 500;
        next(err);
      } else {
        res.json(custs)
      }
    });
  },

  subset: function(req, res, next) {
    console.log(req.query)
    console.log("req params query: ", req.params.query)

    Cust.sort(req.params.query, req.query.n , req.query.p, function(error, custs) {
        // var n = req.params.n
        // var p = req.params.p
        if(error) {
        var err = new Error("Error retrieving customer list:\n" + error.message);
        err.status = 500;
        next(err);
      } else {
        res.json(custs)
      }
    });
  },

// /customers/:id/current
  current: function(req, res, next) {
    Cust.find([req.params.id, 'true'], function(error, rentals) {
        if(error) {
        var err = new Error("Error retrieving customer's current movie list:\n" + error.message);
        err.status = 500;
        next(err);
      } else {
        res.json(rentals)
      }
    });
  },

  history: function(req, res, next) {
    Cust.history([req.params.id, 'false'], "rentals.rental_date", function(error, rentals) {
        if(error) {
        var err = new Error("Error retrieving customer list:\n" + error.message);
        err.status = 500;
        next(err);
      } else {
        res.json(rentals)
      }
    });
  }
}

module.exports = CustController;
