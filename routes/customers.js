var express = require('express');
var router = express.Router();
var CustomersController = require('../controllers/customers')

router.get('/', CustomersController.index) // nothing here, probably omit
router.get('/sort/:query', CustomersController.sortBy)
// router.get('/:id/current', CustomersController.current)
// router.get('/:id/history', CustomersController.history)

module.exports = router;
