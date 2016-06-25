var express = require('express')
var router = express.Router()
var rental_controller = require('../controllers/rental_controller')

router.get ('/overdue' , rental_controller.overdue)
router.get ('/:title', rental_controller.rentalInfo)
router.get ('/:title/customers' , rental_controller.customersRentingThisFilm)

router.post ('/:title/checkout' , rental_controller.checkoutFilmToCust)
router.post ('/:title/return' , rental_controller.checkInFilmToCust)

module.exports = router
