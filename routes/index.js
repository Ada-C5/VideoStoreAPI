var express = require('express');
var router = express.Router();
var Controller = require('../controllers/index')

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.get('/', Controller.nothing)

router.get('/zomg', Controller.zomg)

module.exports = router;
