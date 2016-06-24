var express = require('express');
var router = express.Router();
var Controllers = require('../controllers/videos')

router.get('/', Controllers.getVideos);
router.get('/sort/:column', Controllers.getVideosSorted); 
router.get('/:title', Controllers.getVideo); 
router.get('/:title/customers', Controllers.getVideosByCustomer);

module.exports = router;
