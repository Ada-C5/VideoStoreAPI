var express = require('express')
var router = express.Router()
var Controller = require('../controllers/movies')

/* GET home page. */
router.get('/sort/title', Controller.sortTitle)
router.get('/sort/release', Controller.sortRelease)

router.get('/:title/current', Controller.current)
router.get('/:title/history', Controller.history)

router.get('/rentals/:title', Controller.rentalsTitle)
router.get('/rentals/:title/customers', Controller.rentalsCustomers)
router.post('/rentals/:title/checkout', Controller.checkout)
router.patch('/rentals/:title/return', Controller.return)
router.get('/rentals/overdue', Controller.overdue)
module.exports = router;
