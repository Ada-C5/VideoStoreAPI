var express = require('express')
var router = express.Router()
var Controller = require('../controllers/movies')

/* GET home page. */
router.get('/', Controller.allMovies)
router.get('/sort/title', Controller.sortTitle)
router.get('/sort/release', Controller.sortRelease)

router.get('/:id/current', Controller.current)
router.get('/:id/history', Controller.history)

router.get('/rentals/overdue', Controller.overdue)
router.get('/rentals/:id', Controller.rentalsTitle)
router.get('/rentals/:id/customers', Controller.rentalsCustomers)
router.get('/rentals/:id/checkout/:customer', Controller.checkout)
router.get('/rentals/:id/return/:customer', Controller.return)
module.exports = router;
