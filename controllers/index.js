var IndexController = {
// Baseline project requirement, left for completion purposes:
  // getZomg: function (request, response) {
  //   var locals = {};
  //   locals.zomg = JSON.stringify('It Works!!!!!');
  //   response.render('index', locals);
  // },

  getApiDocs: function (request, response) {
    var locals = {}
    locals.weneedthisiguess = JSON.stringify()
    response.render('index', locals)
  }
}

module.exports = IndexController;
