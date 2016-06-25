var express = require('express')
var router = express.Router()
var moviesController = require('../controllers/movies_controller')

// movies index
router.get('/', moviesController.listAllMovies)

// movies sorted
router.get ('/sort/title', moviesController.moviesByTitle)
router.get ('/sort/release_date', moviesController.moviesByRelease)

// look at individual titles
// this requires a film title which is used in the HTTP request
router.get ('/:title', moviesController.seeMovieDetails)

router.get ('/:title/current', moviesController.customersRentingThisFilm)
router.get ('/:title/history/sort/name', moviesController.filmRentalHistoryByCustName)
router.get ('/:title/history/sort/date', moviesController.filmRentalHistoryByCODate)

module.exports = router
