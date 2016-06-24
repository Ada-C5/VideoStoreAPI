var express = require('express')
var router = express.Router()
var movies_controller = require('../controllers/movies_controller')
var customers_controller = require('../controllers/customers_controller')
var rentals_controller = require('../controllers/rentals_controller')

router.get('/', function(req, res, next) {
  res.status(200).json({whatevs: 'whatevs!!!'})
})

router.get('/movies', function(req, res, next) {
  movies_controller.index(req, res, next)
})

router.get('/movies/sort/:column_name', function(req, res, next) {
  movies_controller.sort(req, res, next)
})

router.get('/movies/:title/current',
function(req, res, next) {
  movies_controller.current(req, res, next)
})

router.get('/movies/:title/history/sort/:column_name',function(req, res, next){
  movies_controller.history(req, res, next)
})

router.get('/customers', function(req, res, next){
  customers_controller.index(req, res, next)
})

router.get('/customers/sort/:column_name', function(req, res, next) {
  customers_controller.sort(req, res, next)
})

router.get('/customers/:id/current', function(req, res, next){
  customers_controller.current(req, res, next)
})

router.get('/customers/:id/history',
function(req, res, next) {
  customers_controller.history(req, res, next)
})

//TO DO
router.get('/rentals/:title',
function(req, res, next) {
  rentals_controller.view(req, res, next)
})

router.get('/rentals/:title/customers',
function(req, res, next) {
  rentals_controller.customers(req, res, next)
})

router.get('/rentals/:title/check-out/:customer_id',
function(req, res, next) {
  rentals_controller.check_out(req, res, next)
})

router.post('/rentals/:title/return/:customer_id',
function(req, res, next) {
  rentals_controller.return_rental(req, res, next)
})

router.get('/rentals/overdue',
function(req, res, next) {
  rentals_controller.overdue(req, res, next)
})

router.get('/api/docs',
function(req, res, next) {
  res.render('docs', { title: 'API Docs - HTML'})
})

router.get('/api/docs.json',
function(req,res) {
  res.render('docs_json')
})

module.exports = router
