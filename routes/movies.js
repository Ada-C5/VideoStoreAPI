var express = require('express')
var router = express.Router()
var Controller = require('../controllers/movies')

/* GET home page. */
router.get('/sort/title', Controller.sortTitle)
router.get('/sort/release', Controller.sortRelease)

router.get('/:id/current', Controller.current)
router.get('/:id/history', Controller.history)

router.get('/rentals/:id', Controller.rentalsTitle)
router.get('/rentals/:id/customers', Controller.rentalsCustomers)
router.post('/rentals/:id/checkout/:customer', Controller.checkout)
router.patch('/rentals/:id/return/:customer', Controller.return)
router.get('/rentals/overdue', Controller.overdue)
module.exports = router;
