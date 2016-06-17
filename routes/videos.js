var express = require('express');
var router = express.Router();
var Controllers = require('../controllers/videos')

router.get('/', Controllers.getVideos);
router.get('/sort/:column', Controllers.getVideosSorted); 

module.exports = router;
