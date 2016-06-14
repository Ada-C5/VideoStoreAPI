var VideoController = {

  getIndex: function (req, res, next) {
    res.render('index', {title: 'EXTREME VIDEO EXPRESS'})
  },

  getZomg: function (request, response) {
    var locals = {}; 
    var zomg = JSON.stringify('It Works!!!!!'); 
    locals.zomg = zomg; 
    response.render('index', locals); 
  }
}

module.exports = VideoController; 