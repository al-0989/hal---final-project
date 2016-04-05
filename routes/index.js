var express = require('express');
var router = express.Router();

var raspicam = require('raspicam');
var cameraOptions = {
  mode        : "video",
  output      : 'images/camera.h264'
};

// Create a new raspicam instance
var camera = new raspicam(cameraOptions);

camera.start()

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
  res.sendFile(__dirname + '/images/camera.h264');
});

module.exports = router;
