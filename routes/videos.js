var express = require('express');
var router = express.Router();
var Controllers = require('../controllers/videos')

router.get('/videos', Controllers.getVideos);
router.get('/videos/sort/:column', Controllers.getVideosSorted); 

module.exports = router;
