var VideoController = {

  getCustomers: function (request, response, next) {
    Customers.all(function(error, customers) {
      if(error) {
        var err = new Error("Error retrieving customers list:\n" + error.message);
        err.status = 500;
        next(err);
      } else {
        var locals = { customers: customers }
        res.render("/customers", {
          locals
        });
      }
    });
  },

  getZomg: function (request, response) {
    var locals = {}; 
    locals.zomg = JSON.stringify('It Works!!!!!');  
    response.render('index', locals); 
  },

  getCustomer: function (request, response) {
    response.render('customer'); 
  },

  getVideo: function (request, response) {
    response.render('video'); 
  },

  getRental: function (request, response) {
    response.render('rental'); 
  }
}

module.exports = VideoController; 