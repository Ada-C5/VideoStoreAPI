var VideoController = {

  getIndex: function (request, response, next) {
    response.render('index', {title: 'EXTREME VIDEO EXPRESS'});
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